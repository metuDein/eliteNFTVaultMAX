"use client";
import { useState, useEffect } from "react";
import { useDataContext } from "../context/DataProvider";
import SellerCard from "../NFtcards/SellerCard";
import Loading from "../loading/Loading";

const SellerSection = () => {
  const { appData } = useDataContext();
  const { users } = appData;
  const [topSellers, setTopSellers] = useState([]);

  useEffect(() => {
    if (users) {
      const topSeller = users.filter((item) => item?.balance > 5);
      setTopSellers(topSeller);
    }
  }, [appData]);

  if (!topSellers) return <Loading otherStyles={"mx-auto"} />;

  return (
    <div className="w-full grid grid-cols-1 sm:grid-cols-3 gap-16 justify-items-center">
      {topSellers.map((item, i) => (
        <SellerCard data={item} key={i} index={i} />
      ))}
    </div>
  );
};
export default SellerSection;
