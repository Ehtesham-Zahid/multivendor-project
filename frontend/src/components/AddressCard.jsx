import { Button } from "../shadcn/button";

const AddressCard = () => {
  return (
    <div>
      <p className="font-bold py-3 border-b border-primary w-60">
        PRIMARY ADDRESS
      </p>
      <div className="flex flex-col gap-1 py-3 border-b border-primary">
        <p className="text-sm">Ehtesham Zahid</p>
        <p className="text-sm">123 Main St</p>
        <p className="text-sm">Apt 4B</p>
        <p className="text-sm">New York, NY 10001</p>
      </div>
      <div className="flex gap-2 py-2 justify-between">
        <Button
          variant="outline"
          className={
            "border-none hover:text-primary cursor-pointer hover:underline"
          }
        >
          Edit
        </Button>
        <Button
          variant="outline"
          className={
            "border-none hover:text-danger cursor-pointer hover:underline"
          }
        >
          Delete
        </Button>
      </div>
    </div>
  );
};

export default AddressCard;
