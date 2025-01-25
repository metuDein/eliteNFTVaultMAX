"use client";
import { useEffect, useState } from "react";
import { useDataContext } from "../context/DataProvider";
import Loading from "../loading/Loading";
import SecondSectionCard from "../NFtcards/SecondSectionCard";
const SectionSecond = () => {
  const { appData } = useDataContext();
  const { assets } = appData;

  const [lastThree, setLastThree] = useState([]);

  useEffect(() => {
    if (assets) {
      const lastThreeItems = [...assets].slice(-3);
      setLastThree(lastThreeItems);
    }
  }, [appData]);

  if (!lastThree) return <Loading otherStyles={"mx-auto"} />;
  return (
    <div className="relative">
      {lastThree.map((item, i) => (
        <SecondSectionCard key={item?._id} data={item} index={i} />
      ))}
    </div>
  );
};
export default SectionSecond;
