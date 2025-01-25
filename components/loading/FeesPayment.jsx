"use client";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleExclamation } from "@fortawesome/free-solid-svg-icons";
import Image from "next/image";

const FeesPayment = () => {
  return (
    <div className="w-[332px] h-[511] rounded-[10px]  flex flex-col p-3 items-center justify-center bg-[#582b71]">
      <div className="w-[121px] h-[121px] bg-white rounded-full mb-6">
        <FontAwesomeIcon
          icon={faCircleExclamation}
          className="text-[121px] text-[#010101]"
        />
      </div>
      <p className="mb-6 text-center text-white">
        please hold processing payment
      </p>

      <div className="w-full flex items-center justify-around">
        <Image
          src={"/assets/loading.gif"}
          width="197"
          height="112"
          alt="currently loading"
          className="w-[197px] h-[201px]"
        />
      </div>
    </div>
  );
};
export default FeesPayment;
