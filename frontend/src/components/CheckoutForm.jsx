import { Label } from "@/shadcn/label";
import { RadioGroup, RadioGroupItem } from "@/shadcn/radio-group";
import { Button } from "../shadcn/button";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import CountrySelector from "./CountrySelector";
import { useEffect, useState } from "react";
import StateSelector from "./StateSelector";
import {
  createAddressThunk,
  getUserAddressThunk,
} from "../features/address/addressSlice";
import API from "../api/axios";
import { Loader2, Plus } from "lucide-react";
import { loadStripe } from "@stripe/stripe-js";
import { createOrderThunk } from "../features/order/orderSlice";
import { Link, useNavigate } from "react-router";
import { logoutThunk } from "../features/auth/authSlice";
import { toast } from "react-toastify";
import CreateAddressDialog from "./CreateAddressDialog";
import Spinner from "./Spinner";

const CheckoutForm = () => {
  const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLIC_KEY);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { user } = useSelector((state) => state.auth);
  const { coupon } = useSelector((state) => state.coupon);
  const { totalAmount, cart } = useSelector((state) => state.cart);
  const { addresses, isCreateAddressLoading, isLoading } = useSelector(
    (state) => state.address
  );
  const { isUserOrdersLoading } = useSelector((state) => state.order);

  const [selectedOption, setSelectedOption] = useState("card");
  const [selectedAddress, setSelectedAddress] = useState(addresses[0]?._id);
  const [country, setCountry] = useState("");
  const [countryCode, setCountryCode] = useState("");
  const [state, setState] = useState("");
  const [addressId, setAddressId] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  useEffect(() => {
    if (addresses.length > 0 && !selectedAddress) {
      setSelectedAddress(addresses[0]._id);
      setAddressId(addresses[0]._id);
    } else if (selectedAddress) {
      setAddressId(selectedAddress);
    }
  }, [addresses, selectedAddress]);

  const onSubmit = async (data) => {
    // let finalAddressId = addressId;
    if (user) {
      setAddressId(selectedAddress);
    } else {
      const addressData = {
        ...data,
        country: country,
        state: state,
      };
      const resultAction = await dispatch(createAddressThunk(addressData));

      if (createAddressThunk.fulfilled.match(resultAction)) {
        setAddressId(resultAction.payload._id);
      }
    }

    if (addressId) {
      const items = cart.map((product) => {
        // Priority: Event Price > Discount Price > Original Price
        let itemPrice = product.price; // Original price as fallback

        if (product.eventId && product.eventId.eventPrice) {
          itemPrice = product.eventId.eventPrice; // Event price takes highest priority
        } else if (product.discountPrice) {
          itemPrice = product.discountPrice; // Discount price takes second priority
        }

        return {
          productId: product._id,
          shopId:
            typeof product.shopId === "object"
              ? product.shopId._id
              : product.shopId,
          quantity: product.quantity || 1,
          price: itemPrice,
        };
      });

      const orderData = {
        items,
        paymentMethod: selectedOption,
        totalAmount: coupon
          ? Math.round(coupon?.newTotal)
          : Math.round(totalAmount),
        shippingAddress: addressId,
        paymentStatus: "pending",
        discountPercentage: coupon?.discountPercentage || 0,
      };

      const resultAction2 = await dispatch(createOrderThunk(orderData));

      if (createOrderThunk.fulfilled.match(resultAction2)) {
        if (selectedOption === "card") {
          const res = await API.post("/payments/create-checkout-session", {
            productsData: cart,
            discountPercentage: coupon?.discountPercentage || 0,
            orderId: resultAction2.payload.parentOrder._id,
          });

          const stripe = await stripePromise;
          if (!stripe) {
            return;
          }

          await stripe.redirectToCheckout({ sessionId: res.data.id });
        } else {
          navigate("/checkout/success");
        }
      }
    }
  };

  const logoutHandler = async () => {
    const resultAction = await dispatch(logoutThunk());
    if (logoutThunk.fulfilled.match(resultAction)) {
      toast.success("Logged Out Successfully");
    } else {
      toast.error("Error in logging out");
    }
  };

  return (
    <form
      className="p-3 sm:p-5 xl:border-r-2  w-11/12 lg:w-4/5 xl:w-3/5 mx-auto md:mx-0 md:ml-auto"
      onSubmit={handleSubmit(onSubmit)}
    >
      <div className="contact border-b-2 border-dark py-3 sm:py-5 flex flex-col gap-2">
        {user ? (
          <div className="flex flex-col gap-2">
            <div className="flex items-center justify-between">
              <p className="font-medium text-sm text-dark">Account</p>
              <Button
                className={
                  " bg-white text-danger text-sm p-1 px-2 rounded-sm font-medium hover:underline hover:bg-white cursor-pointer"
                }
                size={"xs"}
                onClick={logoutHandler}
              >
                Logout
              </Button>
            </div>
            <p className="text-sm">ehteshamzahid313@gmail.com</p>
          </div>
        ) : (
          <>
            <div className="flex justify-between items-center">
              <p className="text-xl sm:text-2xl font-bold">Contact</p>
              <Link
                to="/auth/login"
                className="hover:underline"
                onClick={() => {
                  sessionStorage.setItem("redirectAfterLogin", "checkout");
                }}
              >
                Login
              </Link>
            </div>
            <input
              type="text"
              className="p-2   rounded-md border-2 border-zinc-400 outline-primary w-full"
              placeholder="Email"
              {...register("email", { required: true })}
            />
          </>
        )}
      </div>
      <div className="delivery border-b-2 border-dark py-3 sm:py-5 gap-3 sm:gap-5 flex flex-col">
        <p className="text-xl sm:text-2xl font-bold">Shipping Address</p>
        {user ? (
          isLoading || isCreateAddressLoading ? (
            <Spinner />
          ) : addresses?.length > 0 ? (
            <RadioGroup
              value={selectedAddress}
              onValueChange={setSelectedAddress}
            >
              {addresses.map((address) => (
                <div
                  key={address._id}
                  className="flex items-center space-x-2 border-b py-2 "
                >
                  <RadioGroupItem value={address._id} id={address._id} />
                  <Label htmlFor={address._id}>
                    <div>
                      <p>
                        {address.fullName} - {address.phoneNumber}
                      </p>
                      <p className="text-sm text-gray-500 font-normal">
                        {address.addressDetails}, {address.city},{" "}
                        {address.state}, {address.country}
                      </p>
                    </div>
                  </Label>
                </div>
              ))}
              <CreateAddressDialog page="checkout" />
            </RadioGroup>
          ) : (
            <div className="flex flex-col gap-2">
              <div className=" border-b py-2">No addresses found</div>
              <CreateAddressDialog page="checkout" />
            </div>
          )
        ) : (
          <>
            <input
              type="text"
              className="p-2   rounded-md border-2 border-zinc-400 outline-primary w-full"
              placeholder="Fullname"
              {...register("fullName", { required: true })}
            />
            <input
              type="text"
              className="p-2   rounded-md border-2 border-zinc-400 outline-primary w-full"
              placeholder="Phone Number"
              {...register("phoneNumber", { required: true })}
            />
            <input
              type="text"
              className="p-2   rounded-md border-2 border-zinc-400 outline-primary w-full"
              placeholder="Address"
              {...register("addressDetails", { required: true })}
            />
            <input
              type="text"
              className="p-2   rounded-md border-2 border-zinc-400 outline-primary w-full"
              placeholder="Apartment, Suite Otional e.t.c"
            />
            <div className="flex gap-2">
              <CountrySelector
                setCountry={setCountry}
                setCountryCode={setCountryCode}
              />
              <StateSelector
                countryName={country}
                countryCode={countryCode}
                setState={setState}
              />
            </div>
            <div className="flex gap-2">
              <input
                type="text"
                className="p-2   rounded-md border-2 border-zinc-400 outline-primary w-full"
                placeholder="City"
                {...register("city", { required: true })}
              />{" "}
              <input
                type="text"
                className="p-2   rounded-md border-2 border-zinc-400 outline-primary w-full"
                placeholder="Zip Code"
                {...register("zipCode", { required: true })}
              />
            </div>{" "}
          </>
        )}
      </div>
      <div className="payment py-3 sm:py-5 flex flex-col gap-3 sm:gap-5">
        <div className="flex flex-col">
          <p className="text-xl sm:text-2xl font-bold">Payment</p>
          <p className="text-sm text-gray-500">
            All transactions are secure and encrypted.
          </p>
        </div>
        <RadioGroup defaultValue="card" onValueChange={setSelectedOption}>
          <div className="flex items-center space-x-2 border-b py-2 ">
            <RadioGroupItem value="card" id="card" />
            <Label htmlFor="card" className="text-xl font-normal">
              Credit - Debit Card
            </Label>
          </div>
          <div className="flex items-center space-x-2 border-b py-2 ">
            <RadioGroupItem value="cod" id="cod" />
            <Label htmlFor="cod" className="text-xl font-normal">
              Cash on delivery
            </Label>
          </div>
        </RadioGroup>
      </div>
      <Button
        disabled={isUserOrdersLoading || isCreateAddressLoading}
        type="submit"
        className="w-full text-white mt-5 uppercase cursor-pointer"
      >
        {isUserOrdersLoading || isCreateAddressLoading ? (
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
        ) : (
          <p>Pay Now</p>
        )}
      </Button>
    </form>
  );
};

export default CheckoutForm;
