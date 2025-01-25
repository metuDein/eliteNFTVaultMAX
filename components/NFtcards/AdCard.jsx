import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-solid-svg-icons";

import Image from "next/image";
import Link from "next/link";

const AdCard = () => {
  return (
    <Link
      href={"/"}
      className="w-[336px] h-[498px] rounded-[10px]  flex flex-col p-3 items-start justify-start bg-[#ef8bf7]/50"
    >
      <Image
        src={"/assets/nftsample.jpg"}
        alt="nft sample"
        width={"1000"}
        height={"1000"}
        className="w-[302px] h-[387px] rounded-[9] mx-auto mb-2"
      />
      <h3 className="mb-2 font-bold">CyberRaft #133</h3>
      <div className="flex items-center justify-between w-full">
        <div className="flex flex-col items-start justify-between">
          <p>Price :</p>
          <p>4 items left</p>
        </div>
        <div className="flex flex-col items-start justify-between">
          <p>5 ETH </p>

          <p>
            <FontAwesomeIcon
              icon={faHeart}
              className="text-[#f08faf] text-[18px] mr-1"
            />
            160
          </p>
        </div>
      </div>
    </Link>
  );
};
export default AdCard;
