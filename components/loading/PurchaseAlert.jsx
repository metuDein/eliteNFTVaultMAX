"use client";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleExclamation } from "@fortawesome/free-solid-svg-icons";
import ConfirmBtn from "./ConfirmBtn";

const PurchaseAlert = ({ otherStyles, smessage, setPurchase }) => {
  const handleClick = () => {
    setPurchase(null);
  };

  return (
    <div
      className={`w-[299px] min-h-[400px] sm:w-[332px] sm:h-[511] rounded-[10px]  flex flex-col p-3 items-center justify-center bg-[#582b71] ${otherStyles}`}
    >
      <div className="w-[121px] h-[121px] bg-white rounded-full mb-6">
        <FontAwesomeIcon
          icon={faCircleExclamation}
          className="text-[121px] text-[#228b33]"
        />
      </div>

      <h3 className="font-bold text-xl text-center mb-6">Purchase Complete</h3>

      <p className="mb-6 text-center text-white">{smessage}</p>

      <div className="w-full flex items-center justify-around">
        <ConfirmBtn
          title={"Cancel"}
          otherStyles={"bg-black/30 text-white font-semibold p-5"}
          handleClicked={handleClick}
        />
      </div>
    </div>
  );
};
export default PurchaseAlert;
