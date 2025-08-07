import { useDispatch } from "react-redux";
import { deleteAddressThunk } from "../features/address/addressSlice";
import { Button } from "../shadcn/button";
import { toast } from "react-toastify";
import UpdateAddressDialog from "./UpdateAddressDialog";

const AddressCard = ({ address, index }) => {
  const dispatch = useDispatch();
  const handleDeleteAddress = async (addressId) => {
    // Dispatch the delete address thunk action
    const resultAction = await dispatch(deleteAddressThunk(addressId));
    console.log("Delete Address ID:", addressId);
    if (deleteAddressThunk.fulfilled.match(resultAction)) {
      toast.success("Address deleted successfully!");
    }
  };
  return (
    <div>
      <p className="font-bold py-3 border-b border-primary w-60">
        {index === 0 ? "Primary Address" : `Address ${index + 1}`}
      </p>
      <div className="flex flex-col gap-1 py-3 border-b border-primary">
        <p className="text-sm">{address?.fullName}</p>
        <p className="text-sm">{address?.address}</p>
        <p className="text-sm">{address?.city}</p>
        <p className="text-sm">
          {address?.state} {address?.zipCode}
        </p>
      </div>
      <div className="flex gap-2 py-2 justify-between">
        <UpdateAddressDialog address={address} />
        <Button
          variant="outline"
          className={
            "border-none hover:text-danger cursor-pointer hover:underline"
          }
          onClick={() => handleDeleteAddress(address._id)}
        >
          Delete
        </Button>
      </div>
    </div>
  );
};

export default AddressCard;
