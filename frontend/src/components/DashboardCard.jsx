const DashboardCard = () => {
  return (
    <div className="flex flex-col gap-5 w-96 bg-white">
      <p className="">Account Balance (with 10% service charge)</p>
      <p className="font-bold">$0.00</p>
      <Link>Withdraw Money</Link>
    </div>
  );
};

export default DashboardCard;
