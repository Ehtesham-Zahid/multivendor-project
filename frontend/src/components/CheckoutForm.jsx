import { Label } from "@/shadcn/label";
import { RadioGroup, RadioGroupItem } from "@/shadcn/radio-group";
import { Button } from "../shadcn/button";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import CountrySelector from "./CountrySelector";
import { useEffect, useState } from "react";
import StateSelector from "./StateSelector";
import { createAddressThunk } from "../features/address/addressSlice";
import API from "../api/axios";
import { Loader2 } from "lucide-react";
import { loadStripe } from "@stripe/stripe-js";

const CheckoutForm = () => {
  const stripePromise = loadStripe(
    "pk_test_51RtPHKBTJUPkctEDjF0z9JDkW96NEMYHHUx1rXTX6AjvGywa9yUEZVW7hoD48BYw3IEiPaCh5BfboCJr6WfRwbd400TQjxpmSE"
  );

  const dispatch = useDispatch();
  const [selectedOption, setSelectedOption] = useState("card");
  const [country, setCountry] = useState("");
  const [countryCode, setCountryCode] = useState("");
  const [state, setState] = useState("");
  const { user } = useSelector((state) => state.auth);
  const { isLoading } = useSelector((state) => state.address);
  const [cart, setCart] = useState([]);
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();
  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem("cart")) || [];
    setCart(storedCart);
  }, []);

  const onSubmit = async (data) => {
    const addressData = {
      ...data,
      country: country,
      state: state,
    };
    const resultAction = await dispatch(createAddressThunk(addressData));

    if (createAddressThunk.fulfilled.match(resultAction)) {
      console.log(selectedOption);
      if (selectedOption === "card") {
        console.log(cart);
        console.log("HELO");
        const res = await API.post("/payments/create-checkout-session", {
          productsData: cart,
        });

        // const data = await res.json();
        const stripe = await stripePromise;
        if (!stripe) {
          console.error("Stripe failed to load");
          return;
        }

        await stripe.redirectToCheckout({ sessionId: res.data.id });
      } else if (selectedOption === "paypal") {
      } else if (selectedOption === "cod") {
      }
    }
  };
  return (
    <form
      className="p-5 border-r-2 w-2/3 ml-auto"
      onSubmit={handleSubmit(onSubmit)}
    >
      <div className="contact border-b-2 border-dark py-5 flex flex-col gap-2">
        {user ? (
          <div className="flex flex-col gap-2">
            <div className="flex items-center justify-between">
              <p className="font-medium text-sm text-dark">Account</p>
              <Button
                className={
                  " bg-white text-danger text-sm p-1 px-2 rounded-sm font-medium hover:underline hover:bg-white cursor-pointer"
                }
                size={"xs"}
              >
                Logout
              </Button>
            </div>
            <p className="text-sm">ehteshamzahid313@gmail.com</p>
          </div>
        ) : (
          <>
            <div className="flex justify-between items-center">
              <p className="text-2xl font-bold">Contact</p>
              <p>Login</p>
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
      <div className="delivery border-b-2 border-dark py-5 gap-5 flex flex-col">
        <p className="text-2xl font-bold">Shipping Address</p>
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
        </div>
      </div>
      <div className="payment   py-5 flex flex-col gap-5">
        <div className="flex flex-col">
          <p className="text-2xl font-bold">Payment</p>
          <p className="text-sm text-gray-500">
            All transactions are secure and encrypted.
          </p>
        </div>
        <RadioGroup defaultValue="card" onValueChange={setSelectedOption}>
          <div className="flex items-center space-x-2 border-b py-2 ">
            <RadioGroupItem value="card" id="card" />
            <Label htmlFor="card" className="text-xl font-normal">
              Credit- Debit Card
            </Label>
          </div>
          <div className="flex items-center space-x-2 border-b py-2 ">
            <RadioGroupItem value="paypal" id="paypal" />
            <Label htmlFor="paypal" className="text-xl font-normal">
              Paypal
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
        disabled={isLoading}
        type="submit"
        className="w-full text-white mt-5 uppercase"
      >
        {isLoading ? (
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
        ) : (
          <p>Pay Now</p>
        )}
      </Button>
    </form>
  );
};

export default CheckoutForm;
