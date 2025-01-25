import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-solid-svg-icons";
import Image from "next/image";

const SecondSectionCard = ({ data, index }) => {
  return (
    <div
      className={`absolute w-[240px] h-[380px] rounded-[10px]  flex flex-col p-3 items-start justify-start bg-[#ef8bf7]/90    ${
        index === 0
          ? "transform -rotate-[20deg] -left-24 opacity-75 -z-10 sm:flex hidden"
          : index === 1
          ? "mb-3 -top-10 z-0"
          : " sm:transform rotate-[20deg] left-24 opacity-75 -z-10 sm:flex hidden"
      }`}
    >
      <Image
        src={data?.image || "/assets/nftsample.jpg"}
        alt="nft sample"
        width={"1000"}
        height={"1000"}
        className={`w-[220px]
                h-[280px]
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
export default SecondSectionCard;
