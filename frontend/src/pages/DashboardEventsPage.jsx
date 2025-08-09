import { DashboardEventsSection, CreateEventDialog } from "../components";

const DashboardEventsPage = () => {
  return (
    <div className="p-5 md:p-10 flex flex-col gap-3">
      <div className="flex justify-between">
        <p className="text-3xl font-bold mb-3">All Events</p>
        <CreateEventDialog />
      </div>
      <DashboardEventsSection />
    </div>
  );
};

export default DashboardEventsPage;
