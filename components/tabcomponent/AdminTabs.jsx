"use client";
import { useEffect, useState } from "react";
import { useDataContext } from "../context/DataProvider";
import AdminAssets from "../NFtcards/AdminAssets";
import CollectionCard from "../NFtcards/CollectionCard";
import MessageCard from "../message/MessageCard";
import UserCard from "../NFtcards/UserCard";
import {
  faEnvelope,
  faEnvelopeCircleCheck,
  faFileImage,
  faFolderOpen,
  faFolderPlus,
  faImage,
  faUserCircle,
  faVault,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";

const AdminTabs = ({}) => {
  const { appData, searchResultCollections, searchResultAssets } =
    useDataContext();
  const { assets, collections, users, notifications } = appData;
  const [highest, setHighest] = useState(null);
  const [lowest, setLowest] = useState(null);

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
    <div className="w-full sm:w-[1200px] min-h-screen p-[2px] sm:p-3 pt-[75px] pb-6 mx-auto">
      <div className="flex flex-col items-start w-full">
        <div className="flex items-start justify-between w-full">
          <div className="flex items-center justify-center flex-1 space-x-1 sm:space-x-3">
            <button
              className={`${
                activeTab === 0 ? "bg-[#ef8bf7]" : "bg-transparent"
              }  border-solid border-[2px] border-[#ef7bf7] rounded-[10px] px-3 py-2 text-white`}
              onClick={() => handleTabClicked(0)}
            >
              {" "}
              Tools
            </button>
            <button
              className={`${
                activeTab === 1 ? "bg-[#ef8bf7]" : "bg-transparent"
              }  border-solid border-[2px] border-[#ef7bf7] rounded-[10px] px-3 py-2 text-white`}
              onClick={() => handleTabClicked(1)}
            >
              {" "}
              User
            </button>
            <button
              className={`${
                activeTab === 2 ? "bg-[#ef8bf7]" : "bg-transparent"
              }  border-solid border-[2px] border-[#ef7bf7] rounded-[10px] px-3 py-2 text-white hidden sm:flex`}
              onClick={() => handleTabClicked(2)}
            >
              {" "}
              Collections
            </button>
            <button
              className={`${
                activeTab === 3 ? "bg-[#ef8bf7]" : "bg-transparent"
              }  border-solid border-[2px] border-[#ef7bf7] rounded-[10px] px-3 py-2 text-white hidden sm:flex`}
              onClick={() => handleTabClicked(3)}
            >
              {" "}
              Assets
            </button>
            <button
              className={`${
                activeTab === 4 ? "bg-[#ef8bf7]" : "bg-transparent"
              }  border-solid border-[2px] border-[#ef7bf7] rounded-[10px] px-3 py-2 text-white hidden sm:flex`}
              onClick={() => handleTabClicked(4)}
            >
              {" "}
              Messages
            </button>
          </div>
        </div>
        {/* AdminTabs display */}
        {activeTab === 0 && (
          <div className="w-full sm:flex sm:flex-wrap  grid grid-cols-2 gap-2 sm:gap-5 sm:items-center sm:justify-center justify-items-center sm:mt-3 mt-1">
            <div
              className="w-[150px] sm:w-[240px] h-[130px] sm:h-[220px] rounded-[10px] text-black bg-[#fff] flex flex-col items-center justify-center"
              onClick={() => setActiveTab(1)}
            >
              <FontAwesomeIcon icon={faUserCircle} className="text-[30px]" />
              <p className="font-semibold text-[19px]">users</p>
              <p className="font-semibold text-[13px]">{users.length}</p>
            </div>
            <div
              className="w-[150px] sm:w-[240px] h-[130px] sm:h-[220px] rounded-[10px] text-black bg-[#fff] flex flex-col items-center justify-center"
              onClick={() => setActiveTab(4)}
            >
              <FontAwesomeIcon icon={faEnvelope} className="text-[30px]" />
              <p className="font-semibold text-[19px]">Messages</p>
              <p className="font-semibold text-[13px]">
                {notifications.length}
              </p>
            </div>
            <div
              className="w-[150px] sm:w-[240px] h-[130px] sm:h-[220px] rounded-[10px] text-black bg-[#fff] flex flex-col items-center justify-center"
              onClick={() => setActiveTab(2)}
            >
              <FontAwesomeIcon icon={faFolderOpen} className="text-[30px]" />
              <p className="font-semibold text-[19px]">Collections</p>
              <p className="font-semibold text-[13px]">{collections?.length}</p>
            </div>
            <div
              className="w-[150px] sm:w-[240px] h-[130px] sm:h-[220px] rounded-[10px] text-black bg-[#fff] flex flex-col items-center justify-center"
              onClick={() => setActiveTab(3)}
            >
              <FontAwesomeIcon icon={faImage} className="text-[30px]" />
              <p className="font-semibold text-[19px]">Assets</p>
              <p className="font-semibold text-[13px]">{assets.length}</p>
            </div>
            <Link
              href={"#"}
              className="w-[150px] sm:w-[240px] h-[130px] sm:h-[220px] rounded-[10px] text-black bg-[#fff] flex flex-col items-center justify-center"
            >
              <FontAwesomeIcon icon={faFileImage} className="text-[30px]" />
              <p className="font-semibold text-[19px]">New Asset</p>
              {/* <p className="font-semibold text-[13px]">10</p> */}
            </Link>
            <Link
              href={"#"}
              className="w-[150px] sm:w-[240px] h-[130px] sm:h-[220px] rounded-[10px] text-black bg-[#fff] flex flex-col items-center justify-center"
            >
              <FontAwesomeIcon icon={faFolderPlus} className="text-[30px]" />
              <p className="font-semibold text-[19px]">New Collection</p>
              {/* <p className="font-semibold text-[13px]">10</p> */}
            </Link>
            <Link
              href={"/admin/sendEmail"}
              className="w-[150px] sm:w-[240px] h-[130px] sm:h-[220px] rounded-[10px] text-black bg-[#fff] flex flex-col items-center justify-center"
            >
              <FontAwesomeIcon
                icon={faEnvelopeCircleCheck}
                className="text-[30px]"
              />
              <p className="font-semibold text-[19px]">Email</p>
              {/* <p className="font-semibold text-[13px]">10</p> */}
            </Link>
            <Link
              href={"/admin/cexapp"}
              className="w-[150px] sm:w-[240px] h-[130px] sm:h-[220px] rounded-[10px] text-black bg-[#fff] flex flex-col items-center justify-center"
            >
              <FontAwesomeIcon icon={faVault} className="text-[30px]" />
              <p className="font-semibold text-[19px]">CEX</p>
              {/* <p className="font-semibold text-[13px]">10</p> */}
            </Link>
          </div>
        )}

        {activeTab === 1 && (
          <div className="w-full p-1 min-h-screen mt-5 grid grid-cols-1 sm:grid-cols-3 gap-1 sm:gap-5 justify-items-start">
            {[...users].reverse().map((item, index) => (
              <UserCard
                key={item?._id}
                data={item}
                link={`/admin/editUser/${item?._id}`}
                index={index}
              />
            ))}
          </div>
        )}
        {activeTab === 2 && (
          <div className="w-full p-1 min-h-screen mt-5 grid grid-cols-1 sm:grid-cols-3 gap-1 sm:gap-5 justify-items-center">
            {[...collections].reverse().map((item, index) => (
              <CollectionCard
                key={item?._id}
                data={item}
                link={`/admin/editCollection/${item?._id}`}
              />
            ))}
          </div>
        )}
        {activeTab === 3 && (
          <div className="w-full p-1 min-h-screen mt-5 grid grid-cols-1 sm:grid-cols-3 gap-1 sm:gap-5 justify-items-center">
            {[...assets].reverse().map((item, index) => (
              <AdminAssets
                key={item?._id}
                data={item}
                link={`/admin/editAsset/${item?._id}`}
              />
            ))}
          </div>
        )}
        {activeTab === 4 && (
          <div className="w-full p-1 min-h-screen mt-5 grid grid-cols-1 sm:grid-cols-3 gap-1 sm:gap-5 justify-items-center">
            {[...notifications].reverse().map((item, index) => (
              <MessageCard
                key={item?._id}
                data={item}
                link={`/admin/message/${item?._id}`}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
export default AdminTabs;
