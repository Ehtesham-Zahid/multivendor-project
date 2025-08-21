import { useEffect } from "react";
import { getShopByIdThunk } from "../../features/shop/shopSlice";
import ShopInfo from "../ShopInfo";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";
import ShopDetails from "../ShopDetails";
import Spinner from "../Spinner";

const ShopSection = () => {
  const { shopId } = useParams();
  const { shop, isLoading } = useSelector((state) => state.shop);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getShopByIdThunk(shopId));
  }, [shopId]);

  return (
    <div className="flex  gap-5 items-center md:items-start     w-custom mx-auto my-10 lg:flex-row flex-col">
      {isLoading ? (
        <div className="flex justify-center items-center h-full w-full">
          <Spinner />
        </div>
      ) : (
        <>
          <ShopInfo shop={shop} />
          <ShopDetails shop={shop} />
        </>
      )}
    </div>
  );
};

export default ShopSection;
