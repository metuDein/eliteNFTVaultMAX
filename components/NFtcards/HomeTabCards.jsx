"use client";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-solid-svg-icons";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { useDataContext } from "../context/DataProvider";

import ConfirmBtn from "../loading/ConfirmBtn";
import { useState } from "react";

const HomeTabCards = ({ data, index }) => {
  const router = useRouter();

  return (
    <div
      className={`absolute w-[300px]  rounded-[10px]  flex flex-col p-3 items-start justify-start bg-[#ef8bf7]/90 ${
        index === 1
          ? "h-[420px]"
          : index === 2
          ? "h-[450px]"
          : index === 3
          ? "h-[420px]"
          : "h-[380px]"
      } 
       ${
         index === 0
           ? "mr-[500px] -z-20"
           : index === 1
           ? "mr-[400px] -z-10"
           : index === 2
           ? "z-0"
           : index === 3
           ? "ml-[400px] -z-10"
           : "ml-[500px] -z-20"
       }
      `}
    >
      <Image
        src={data?.image || "/assets/nftsample.jpg"}
        alt="nft sample"
        width={"1000"}
        height={"1000"}
        className={`w-[282px]
            ${
              index === 1
                ? "h-[320px]"
                : index === 2
                ? "h-[350px]"
                : index === 3
                ? "h-[320px]"
                : "h-[280px]"
            }
            rounded-[9] mx-auto mb-2`}
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
    </div>
  );
};
export default HomeTabCards;
