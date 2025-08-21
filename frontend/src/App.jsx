import { Outlet } from "react-router";
import { Header, Footer } from "./components";
import { useSelector } from "react-redux";
import { ToastContainer } from "react-toastify";
import SearchDetails from "./components/SearchDetails";

const App = () => {
  const { searchTerm } = useSelector((state) => state.product);

  return (
    <div className="bg-background w-full min-h-screen flex flex-col ">
      <Header />
      <ToastContainer />
      <main className="flex-grow">
        {searchTerm && <SearchDetails />}
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default App;
