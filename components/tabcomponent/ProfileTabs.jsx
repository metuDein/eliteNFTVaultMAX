"use client";

import { useState } from "react";
import ShoppingCard from "../NFtcards/ShoppingCard";
import CollectionCard from "../NFtcards/CollectionCard";
import MessageCard from "../message/MessageCard";

const ProfileTabs = ({ otherStyles, assets, collections, activity }) => {
  const [activeTab, setActiveTab] = useState(0);

  const onSale = assets.filter((item) => item.supply >= 1);
  function handleTabClicked(index) {
    setActiveTab(index);
  }

  return (
    <div className={`w-full sm:p-3  ${otherStyles}`}>
      <div className="flex flex-col items-center w-full">
        <div className="flex items-start justify-between w-full">
          <div className="flex items-center justify-center flex-1 space-x-1">
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
              }  border-solid border-[2px] border-[#ef7bf7] rounded-[38px] px-2 sm:px-3 py-2 text-white text-nowrap hidden sm:flex`}
              onClick={() => handleTabClicked(2)}
            >
              {" "}
              On sale
            </button>
            <button
              className={`${
                activeTab === 3 ? "bg-[#ef8bf7]" : "bg-transparent"
              }  border-solid border-[2px] border-[#ef7bf7] rounded-[38px] px-3 py-2 text-white`}
              onClick={() => handleTabClicked(3)}
            >
              {" "}
              Activity
            </button>
          </div>
        </div>
        {/* ProfileTabs display */}
        <div className="w-full p-1 min-h-[500px]  mt-5 grid grid-cols-1 sm:grid-cols-3 gap-2 justify-items-center">
          {activeTab === 0 &&
            assets &&
            assets.map((item, i) => <ShoppingCard key={i} data={item} />)}
          {activeTab === 0 && !assets.length && (
            <p className="text-white font-bold text-xl text-center">
              {" "}
              No assets found{" "}
            </p>
          )}
          {activeTab === 1 &&
            collections &&
            collections.map((item, i) => (
              <CollectionCard
                key={i}
                data={item}
                link={`/user/collection/${item?._id}`}
              />
            ))}
          {activeTab === 1 && !collections.length && (
            <p className="text-white font-bold text-xl text-center">
              {" "}
              No collections found{" "}
            </p>
          )}
          {activeTab === 2 &&
            onSale &&
            onSale.map((item, i) => <ShoppingCard key={i} data={item} />)}
          {activeTab === 2 && !onSale.length && (
            <p className="text-white font-bold text-xl text-center">
              {" "}
              No item on sale{" "}
            </p>
          )}
          {activeTab === 3 &&
            activity &&
            activity.map((item, i) => <MessageCard key={i} data={item} />)}
          {activeTab === 3 && !activity.length && (
            <p className="text-white font-bold text-xl text-center">
              {" "}
              No notifications{" "}
            </p>
          )}
        </div>
      </div>
    </div>
  );
};
export default ProfileTabs;
