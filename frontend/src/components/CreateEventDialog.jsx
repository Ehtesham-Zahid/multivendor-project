import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/shadcn/dialog";
import { Button } from "../shadcn/button";
import { CircleUserRound, Plus } from "lucide-react";
import CategorySelector from "./CategorySelector";
import EventDateSelector from "./EventDateSelector";
import ProductSelector from "./ProductSelector";

const CreateEventDialog = () => {
  return (
    <Dialog className="w-fit">
      <DialogTrigger>
        <Button className="bg-primary text-white text-md" size="lg">
          Create Event <Plus />
        </Button>
      </DialogTrigger>
      <DialogContent className="w-fit">
        <DialogHeader>
          <DialogTitle className="mb-5 font-bold">Create Event</DialogTitle>
          <form className="flex flex-col gap-5">
            <ProductSelector />
            <EventDateSelector title={"Event Start Date"} />
            <EventDateSelector title={"Event End Date"} />
            <div className="flex flex-col">
              <label className="text-sm font-bold text-zinc-600">
                Original Price
              </label>
              <input
                readOnly
                value={5000}
                type="text"
                className="p-1.5 px-2   rounded-md border-2 border-zinc-300 outline-primary w-md font-bold"
                placeholder="Enter product name"
              />
            </div>
            <div className="flex flex-col">
              <label className="text-sm font-bold text-zinc-600">
                Event price
              </label>
              <input
                type="text"
                className="p-1.5 px-2   rounded-md border-2 border-zinc-300 outline-primary w-md"
                placeholder="Enter event price"
              />
            </div>
            <Button className={"text-white text-md mt-3"}>Create</Button>
          </form>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};

export default CreateEventDialog;
