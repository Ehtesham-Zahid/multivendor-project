import { Label } from "@/shadcn/label";
import { RadioGroup, RadioGroupItem } from "@/shadcn/radio-group";
import { Button } from "../shadcn/button";

const CheckoutForm = () => {
  return (
    <form className="p-5 border-r-2 w-2/3 ml-auto">
      <div className="contact border-b-2 border-dark py-5 flex flex-col gap-2">
        <div className="flex justify-between items-center">
          <p className="text-2xl font-bold">Contact</p>
          <p>Login</p>
        </div>
        <input
          type="text"
          className="p-2   rounded-md border-2 border-zinc-400 outline-primary w-full"
          placeholder="Email"
        />
      </div>
      <div className="delivery border-b-2 border-dark py-5 gap-5 flex flex-col">
        <p className="text-2xl font-bold">Shipping Address</p>
        <input
          type="text"
          className="p-2   rounded-md border-2 border-zinc-400 outline-primary w-full"
          placeholder="Fullname"
        />
        <input
          type="text"
          className="p-2   rounded-md border-2 border-zinc-400 outline-primary w-full"
          placeholder="Address"
        />
        <input
          type="text"
          className="p-2   rounded-md border-2 border-zinc-400 outline-primary w-full"
          placeholder="Apartment, Suite Otional e.t.c"
        />
        <div className="flex gap-2">
          <input
            type="text"
            className="p-2   rounded-md border-2 border-zinc-400 outline-primary w-full"
            placeholder="City"
          />{" "}
          <input
            type="text"
            className="p-2   rounded-md border-2 border-zinc-400 outline-primary w-full"
            placeholder="Zip Code"
          />
        </div>
        <input
          type="text"
          className="p-2   rounded-md border-2 border-zinc-400 outline-primary w-full"
          placeholder="Phone Number"
        />
      </div>
      <div className="payment   py-5 flex flex-col gap-5">
        <div className="flex flex-col">
          <p className="text-2xl font-bold">Payment</p>
          <p className="text-sm text-gray-500">
            All transactions are secure and encrypted.
          </p>
        </div>
        <RadioGroup defaultValue="option-one">
          <div className="flex items-center space-x-2 border-b py-2 ">
            <RadioGroupItem value="option-one" id="option-one" />
            <Label htmlFor="option-one" className="text-xl font-normal">
              Credit- Debit Card
            </Label>
          </div>
          <div className="flex items-center space-x-2 border-b py-2 ">
            <RadioGroupItem value="option-two" id="option-two" />
            <Label htmlFor="option-two" className="text-xl font-normal">
              Paypal
            </Label>
          </div>
          <div className="flex items-center space-x-2 border-b py-2 ">
            <RadioGroupItem value="option-three" id="option-three" />
            <Label htmlFor="option-three" className="text-xl font-normal">
              Cash on delivery
            </Label>
          </div>
        </RadioGroup>
      </div>
      <Button className="w-full text-white mt-5">Pay Now</Button>
    </form>
  );
};

export default CheckoutForm;
