"use client";

import { useEffect, useState } from "react";
import { useDataContext } from "../context/DataProvider";
import ShoppingCard from "../NFtcards/ShoppingCard";
import CollectionCard from "../NFtcards/CollectionCard";

const Tabs = ({}) => {
  const { appData, searchResultCollections, searchResultAssets } =
    useDataContext();
  const { assets, collections } = appData;
  const [highest, setHighest] = useState(null);
  const [lowest, setLowest] = useState(null);

  const onSale = ["10", "20", "30"];
  const activity = ["10", "20", "30"];
  const [activeTab, setActiveTab] = useState(0);

  function handleTabClicked(index) {
    setActiveTab(index);
  }
  useEffect(() => {
    if (assets) {
      const highestPrice = [...assets].sort((a, b) => b.price - a.price);
      const lowestPrice = [...assets].sort((a, b) => a.price - b.price);
      setHighest([...highestPrice]);
      setLowest([...lowestPrice]);
    }
  }, [appData]);

  return (
    <div className="w-full sm:w-[1200px] min-h-screen p-3 pt-[75px] pb-6">
      <div className="flex flex-col items-start w-full">
        <div className="flex items-start justify-between w-full">
          <h2 className="text-2xl font-bold text-[#ffffff] basis-2/5 text-center hidden sm:flex">
            {activeTab === 0 && "Assets"}
            {activeTab === 1 && "Collections"}
            {activeTab === 2 && "Highest"}
            {activeTab === 3 && "Lowest"}
          </h2>
          <div className="flex items-center justify-end flex-1 space-x-1 sm:space-x-3">
            <button
              className={`${
                activeTab === 0 ? "bg-[#ef8bf7]" : "bg-transparent"
              }  border-solid border-[2px] border-[#ef7bf7] rounded-[38px] px-3 py-2 text-white`}
              onClick={() => handleTabClicked(0)}
            >
              {" "}
              assets
            </button>
            <button
              className={`${
                activeTab === 1 ? "bg-[#ef8bf7]" : "bg-transparent"
              }  border-solid border-[2px] border-[#ef7bf7] rounded-[38px] px-3 py-2 text-white`}
              onClick={() => handleTabClicked(1)}
            >
              {" "}
              Collections
            </button>
            <button
              className={`${
                activeTab === 2 ? "bg-[#ef8bf7]" : "bg-transparent"
              }  border-solid border-[2px] border-[#ef7bf7] rounded-[38px] px-3 py-2 text-white hidden sm:flex`}
              onClick={() => handleTabClicked(2)}
            >
              {" "}
              highest
            </button>
            <button
              className={`${
                activeTab === 3 ? "bg-[#ef8bf7]" : "bg-transparent"
              }  border-solid border-[2px] border-[#ef7bf7] rounded-[38px] px-3 py-2 text-white hidden sm:flex`}
              onClick={() => handleTabClicked(3)}
            >
              {" "}
              lowest
            </button>
          </div>
        </div>
        {/* Tabs display */}
        <div className="w-full p-1 min-h-screen mt-5 grid grid-cols-1 sm:grid-cols-3 gap-1 sm:gap-5 justify-items-center">
          {activeTab === 0 &&
            [...searchResultAssets]
              .reverse()
              .map((item, index) => (
                <ShoppingCard key={item?._id} data={item} />
              ))}
          {activeTab === 0 && !searchResultAssets && (
            <p className="text-white font-bold text-xl text-center">
              {" "}
              No Assets found{" "}
            </p>
          )}
          {activeTab === 1 &&
            [...searchResultCollections]
              .reverse()
              .map((item, i) => <CollectionCard key={i} data={item} />)}
          {activeTab === 1 && !searchResultCollections && (
            <p className="text-white font-bold text-xl text-center">
              {" "}
              No collections found{" "}
            </p>
          )}
          {activeTab === 2 &&
            highest.map((item, i) => (
              <ShoppingCard key={item?._id} data={item} />
            ))}
          {activeTab === 2 && !assets && (
            <p className="text-white font-bold text-xl text-center">
              {" "}
              No assets found{" "}
            </p>
          )}
          {activeTab === 3 &&
            lowest.map((item, i) => (
              <ShoppingCard key={item?._id} data={item} />
            ))}
          {activeTab === 3 && !assets && (
            <p className="text-white font-bold text-xl text-center">
              {" "}
              No assets found{" "}
            </p>
          )}
        </div>
      </div>
    </div>
  );
};
export default Tabs;
