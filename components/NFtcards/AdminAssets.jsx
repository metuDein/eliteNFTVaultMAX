"use client";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-solid-svg-icons";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { useDataContext } from "../context/DataProvider";

import ConfirmBtn from "../loading/ConfirmBtn";
import { useState } from "react";

const AdminAssets = ({ data, link }) => {
  const { user } = useDataContext();
  const router = useRouter();
  const [btnText, setBtnText] = useState("Buy");

  function handleNavigate() {
    router.push(link);
  }

  return (
    <div className="w-[300px] sm:h-[494px]  rounded-[10px]  flex flex-col p-3 items-start justify-start bg-[#ef8bf7]/50">
      <Image
        src={data?.image || "/assets/nftsample.jpg"}
        alt="nft sample"
        width={"1000"}
        height={"1000"}
        className="w-[280px] h-[330px] rounded-[9] mx-auto mb-2"
      />
      <h3 className="mb-2 font-bold">{`${(data?.name).substring(0, 27)}${
        (data?.name).length > 28 ? "..." : ""
      } `}</h3>
      <div className="flex items-center justify-between w-full">
        <div className="flex flex-col items-start justify-between">
          <p>Price :</p>
          <p>4 items left</p>
        </div>
        <div className="flex flex-col items-start justify-between">
          <p>{data?.price} ETH </p>

          <p>
            <FontAwesomeIcon
              icon={faHeart}
              className="text-[#f08faf] text-[18px] mr-1"
            />
            {data?.likes}
          </p>
        </div>
      </div>
      <ConfirmBtn
        otherStyles={"bg-[#ef8bf7] p-3 w-full"}
        title={"Edit"}
        handleClicked={handleNavigate}
      />
    </div>
  );
};
export default AdminAssets;
