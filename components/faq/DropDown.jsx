"use client";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronDown,
  faChevronRight,
  faWallet,
} from "@fortawesome/free-solid-svg-icons";
import ConnectWallet from "@/pages/faq/ConnectWallet";
import CreateCollection from "@/pages/faq/CreateCollection";
import CreateAsset from "@/pages/faq/CreateAsset";
import NFT from "@/pages/faq/NFT";
import Trading from "@/pages/faq/Trading";
import About from "@/pages/faq/About";
import Tos from "@/pages/faq/Tos";

const DropDown = () => {
  const [activeTab, setActiveTab] = useState(0);
  const [display, setDisplay] = useState(false);

  const handleTabClicked = (index) => {
    setDisplay((prev) => !prev);
    setActiveTab(index);
  };

  return (
    <div className="mx-auto max-w-[310px] sm:w-full flex flex-col items-start justify-center">
      {/* HOW TO CONNECT WALLET */}
      <div className="relative self-center">
        <div
          className="w-[300px] sm:w-[850px] h-[77px] bg-white p-2 flex items-center self-center mt-3"
          onClick={() => handleTabClicked(0)}
        >
          <p className=" text-black sm:w-full">
            {" "}
            <span className="mr-1 sm:mr-4">
              {" "}
              <FontAwesomeIcon icon={faWallet} />{" "}
            </span>{" "}
            <span className="text-xl font-semibold">
              {" "}
              How to connect wallet?{" "}
            </span>{" "}
            <span className="float-right mr-1 sm:mr-5">
              {" "}
              <FontAwesomeIcon icon={faChevronDown} />{" "}
            </span>{" "}
          </p>
        </div>
        <div
          className={`w-[290px] sm:w-[800px] ${
            activeTab === 0 && display === true ? "flex flex-col " : "hidden"
          } bg-gray-300 shadow-2xl rounded p-2 mt-1 absolute  top-[110%] left-1/2  transform -translate-x-1/2 z-20`}
        >
          <ConnectWallet />
        </div>
      </div>
      {/* HOW TO CREATE A  COLLECTION */}
      <div
        className="w-[300px] sm:w-[850px] h-[77px] relative bg-white p-2 flex items-center self-center mt-3"
        onClick={() => handleTabClicked(1)}
      >
        <p className=" text-black sm:w-full">
          {" "}
          <span className="mr-1 sm:mr-4">
            {" "}
            <FontAwesomeIcon icon={faWallet} />{" "}
          </span>{" "}
          <span className="text-xl font-semibold"> Create a collection ? </span>{" "}
          <span className="float-right mx-1 sm:mx-5">
            {" "}
            <FontAwesomeIcon icon={faChevronDown} />{" "}
          </span>{" "}
        </p>
        <div
          className={`w-[290px] sm:w-[800px] ${
            activeTab === 1 && display === true ? "flex flex-col " : "hidden"
          } bg-gray-300 p-2 mt-1 absolute  top-[110%] left-1/2  transform -translate-x-1/2 z-20 shadow-2xl rounded`}
        >
          <CreateCollection />
        </div>
      </div>
      {/* HOW TO CREATE AN ASSET */}
      <div
        className="w-[300px] sm:w-[850px] h-[77px] relative bg-white p-2 flex items-center self-center mt-3"
        onClick={() => handleTabClicked(2)}
      >
        <p className=" text-black sm:w-full">
          {" "}
          <span className="mr-1 sm:mr-4">
            {" "}
            <FontAwesomeIcon icon={faWallet} />{" "}
          </span>{" "}
          <span className="text-xl font-semibold"> Create an asset? </span>{" "}
          <span className="float-right mr-1 sm:mr-5">
            {" "}
            <FontAwesomeIcon icon={faChevronDown} />{" "}
          </span>{" "}
        </p>
        <div
          className={`w-[290px] sm:w-[800px] ${
            activeTab === 2 && display === true ? "flex flex-col " : "hidden"
          } bg-gray-300 shadow-2xl roundedp-2 mt-1 absolute  top-[110%] left-1/2  transform -translate-x-1/2 z-20`}
        >
          <CreateAsset />
        </div>
      </div>
      {/* WHAT IS AN NFT */}
      <div
        className="w-[300px] sm:w-[850px] h-[77px] relative bg-white p-2 flex items-center self-center mt-3"
        onClick={() => handleTabClicked(3)}
      >
        <p className=" text-black sm:w-full">
          {" "}
          <span className="mr-1 sm:mr-4">
            {" "}
            <FontAwesomeIcon icon={faWallet} />{" "}
          </span>{" "}
          <span className="text-xl font-semibold"> What is an NFT? </span>{" "}
          <span className="float-right mr-1 sm:mr-5">
            {" "}
            <FontAwesomeIcon icon={faChevronDown} />{" "}
          </span>{" "}
        </p>
        <div
          className={`w-[290px] sm:w-[800px] ${
            activeTab === 3 && display === true ? "flex flex-col " : "hidden"
          } bg-gray-300 rounded shadow-2xl p-2 mt-1 absolute  top-[110%] left-1/2  transform -translate-x-1/2 z-20`}
        >
          <NFT />
        </div>
      </div>
      {/* MAKING SALES */}
      <div
        className="w-[300px] sm:w-[850px] h-[77px] relative bg-white p-2 flex items-center self-center mt-3"
        onClick={() => handleTabClicked(4)}
      >
        <p className=" text-black sm:w-full">
          {" "}
          <span className="mr-1 sm:mr-4">
            {" "}
            <FontAwesomeIcon icon={faWallet} />{" "}
          </span>{" "}
          <span className="text-xl font-semibold">
            {" "}
            How to trade my items?{" "}
          </span>{" "}
          <span className="float-right mr-1 sm:mr-5">
            {" "}
            <FontAwesomeIcon icon={faChevronDown} />{" "}
          </span>{" "}
        </p>
        <div
          className={`w-[290px] sm:w-[800px] ${
            activeTab === 4 && display === true ? "flex flex-col " : "hidden"
          } bg-gray-300 shadow-2xl rounded p-2 mt-1 absolute  top-[110%] left-1/2  transform -translate-x-1/2 z-20`}
        >
          <Trading />
        </div>
      </div>
      {/* TERMS AND CONDITIONS */}
      <div
        className="w-[300px] sm:w-[850px] min-h-[77px] relative bg-white p-2 flex items-center self-center mt-3"
        onClick={() => handleTabClicked(5)}
      >
        <p className=" text-black sm:w-full">
          {" "}
          <span className="mr-1 sm:mr-4">
            {" "}
            <FontAwesomeIcon icon={faWallet} />{" "}
          </span>{" "}
          <span className="text-xl font-semibold"> Terms and conditions? </span>{" "}
          <span className="float-right mr-1 sm:mr-5">
            {" "}
            <FontAwesomeIcon icon={faChevronDown} />{" "}
          </span>{" "}
        </p>
        <div
          className={`w-[290px] sm:w-[800px] ${
            activeTab === 5 && display === true ? "flex flex-col " : "hidden"
          } bg-gray-300 rounded shadow-2xl p-2 mt-1 absolute  top-[110%] left-1/2  transform -translate-x-1/2 z-20 min-h-20`}
        >
          <Tos />
        </div>
      </div>
      <div
        className="w-[300px] sm:w-[850px] h-[77px] relative bg-white p-2 flex items-center self-center mt-3"
        onClick={() => handleTabClicked(6)}
      >
        <p className=" text-black sm:w-full">
          {" "}
          <span className="mr-1 sm:mr-4">
            {" "}
            <FontAwesomeIcon icon={faWallet} />{" "}
          </span>{" "}
          <span className="text-xl font-semibold"> About Us? </span>{" "}
          <span className="float-right mr-1 sm:mr-5">
            {" "}
            <FontAwesomeIcon icon={faChevronDown} />{" "}
          </span>{" "}
        </p>
        <div
          className={`w-[290px] sm:w-[800px] ${
            activeTab === 6 && display === true
              ? "flex flex-col min-h-2"
              : "hidden"
          } bg-gray-300 rounded shadow-2xl p-2 mt-1 absolute  top-[110%] left-1/2  transform -translate-x-1/2  z-20`}
        >
          <About />
        </div>
      </div>
    </div>
  );
};
export default DropDown;
