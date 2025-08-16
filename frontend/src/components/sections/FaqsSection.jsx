import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/shadcn/accordion";

const FaqsSection = () => {
  return (
    <div className="w-custom m-auto ">
      <p className="text-start text-4xl font-black tracking-wide mt-20 mb-10">
        FAQs
      </p>
      <Accordion
        type="single"
        collapsible
        className="w-full"
        defaultValue="item-1"
      >
        <AccordionItem
          value="item-1"
          className=" py-2 sm:py-3 rounded-md rounded-b-none"
        >
          <AccordionTrigger className="text-lg sm:text-xl font-bold cursor-pointer">
            What is your return policy?
          </AccordionTrigger>
          <AccordionContent className="flex flex-col gap-4 text-balance  text-zinc-700 sm:text-[15px]">
            <p>
              If you're not satisfied with your purchase, we accept returns
              within 30 days of delivery. To initiate a return, please email us
              at support@myecommercestore.com with your order number and a brief
              explanation of why you're returning the item.
            </p>
          </AccordionContent>
        </AccordionItem>
        <AccordionItem
          value="item-2"
          className=" py-2 sm:py-3 rounded-md rounded-b-none"
        >
          <AccordionTrigger className="text-lg sm:text-xl font-bold cursor-pointer">
            How do I contact customer support?
          </AccordionTrigger>
          <AccordionContent className="flex flex-col gap-4 text-balance  text-zinc-700 sm:text-[15px]">
            <p>
              You can contact our customer support team by emailing us at
              support@myecommercestore.com, or by calling us at (555) 123-4567
              between the hours of 9am and 5pm EST, Monday through Friday.
            </p>
          </AccordionContent>
        </AccordionItem>
        <AccordionItem
          value="item-3"
          className=" py-2 sm:py-3 rounded-md rounded-b-none"
        >
          <AccordionTrigger className="text-lg sm:text-xl font-bold cursor-pointer">
            Can I change or cancel my order?
          </AccordionTrigger>
          <AccordionContent className="flex flex-col gap-4 text-balance  text-zinc-700 sm:text-[15px]">
            <p>
              Unfortunately, once an order has been placed, we are not able to
              make changes or cancellations. If you no longer want the items
              you've ordered, you can return them for a refund within 30 days of
              delivery.
            </p>
          </AccordionContent>
        </AccordionItem>
        <AccordionItem
          value="item-4"
          className=" py-2 sm:py-3 rounded-md rounded-b-none"
        >
          <AccordionTrigger className="text-lg sm:text-xl font-bold cursor-pointer">
            Do you offer international shipping?
          </AccordionTrigger>
          <AccordionContent className="flex flex-col gap-4 text-balance  text-zinc-700 sm:text-[15px]">
            <p>Currently, we only offer shipping within the United States.</p>
          </AccordionContent>
        </AccordionItem>
        <AccordionItem
          value="item-5"
          className=" py-2 sm:py-3 rounded-md rounded-b-none"
        >
          <AccordionTrigger className="text-lg sm:text-xl font-bold cursor-pointer">
            What payment methods do you accept?
          </AccordionTrigger>
          <AccordionContent className="flex flex-col gap-4 text-balance  text-zinc-700 sm:text-[15px]   ">
            <p>
              We accept visa, mastercard payment methods also we have cash on
              delivery system.
            </p>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
};

export default FaqsSection;
