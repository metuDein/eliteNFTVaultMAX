"use client";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleExclamation } from "@fortawesome/free-solid-svg-icons";
import ConfirmBtn from "./ConfirmBtn";
import Image from "next/image";

const WithdrawalFee = () => {
  const handleClick = () => {};

  return (
    <div className="w-[332px] h-[511] rounded-[10px]  flex flex-col p-3 items-center justify-center bg-[#582b71]">
      <div className="w-[121px] h-[121px] bg-white rounded-full mb-6">
        <FontAwesomeIcon
          icon={faCircleExclamation}
          className="text-[121px] text-[#010101]"
        />
      </div>
      <p className="mb-6 text-center text-white">
        Withdrawal fee to complete processing is: <b> 0.1 ETH </b>
      </p>

      <div className="w-full flex items-center justify-around mb-4">
        <Image
          src={"/assets/loading.gif"}
          width="197"
          height="112"
          alt="currently loading"
          className="w-[197px] h-[150px]"
        />
      </div>
      <div className="w-full flex items-center justify-around">
        <ConfirmBtn
          title={"Pay now"}
          otherStyles={"bg-black text-white font-semibold p-5"}
          handleClicked={handleClick}
        />
        <ConfirmBtn
          title={"Cancel"}
          otherStyles={"bg-black/30 text-white font-semibold p-5"}
          handleClicked={handleClick}
        />
      </div>
    </div>
  );
};
export default WithdrawalFee;
