"use client";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEthereum } from "@fortawesome/free-brands-svg-icons";

const CollectionFeeDetails = ({ otherStyles, name }) => {
  return (
    <div className={`${otherStyles} bg-[#582b71] flex flex-col sm:w-[304px] `}>
      <p className="text-white font-medium py-2 px-2">Summary</p>
      <div className="border border-solid border-[#ff4ff4]" />
      <div className="px-2 flex items-center justify-between my-3">
        <div className="flex flex-col">
          <p>Name :</p>
          <p>BlockChain :</p>
        </div>
        <div className="flex flex-col">
          <p className="break-words w-[70px]"> {name} </p>
          <p>
            ERC 20{" "}
            <FontAwesomeIcon
              icon={faEthereum}
              className="text-xl ml-1 text-[#141414]"
            />
          </p>
        </div>
      </div>
      <div className="border border-solid border-[#ff4ff4]" />
      <div className="px-2 flex items-center justify-between py-2">
        <div className="flex flex-col">
          <p>Total :</p>
        </div>
        <div className="flex flex-col">
          <p>
            0.0025{" "}
            <FontAwesomeIcon
              icon={faEthereum}
              className="text-xl ml-1 text-[#141414]"
            />
          </p>
        </div>
      </div>
    </div>
  );
};
export default CollectionFeeDetails;
