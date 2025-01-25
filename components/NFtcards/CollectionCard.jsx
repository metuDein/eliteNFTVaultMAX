import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-solid-svg-icons";

import Image from "next/image";
import Link from "next/link";

const CollectionCard = ({ data, link }) => {
  return (
    <Link
      href={link || `/marketplace/collection/${data?._id}`}
      className="w-[269px] h-[289px]  flex flex-col  items-center justify-center bg-[#ef8bf7]/50 relative pb-4"
    >
      <Image
        src={data?.banner || "/assets/banner.jpg"}
        alt="banner sample"
        width={"1000"}
        height={"1000"}
        className="w-full h-[150px] mx-auto mb-2 absolute object-cover top-0"
      />
      <div className="z-0">
        {data?.owner?.image && (
          <Image
            src={data?.owner?.image}
            alt="collection owner"
            width={"1000"}
            height={"1000"}
            className="w-[150px] h-[150px] rounded-full mx-auto mb-2  object-cover "
          />
        )}
        {!data?.owner?.image && (
          <div className="w-[150px] h-[150px] rounded-full mx-auto mb-2 flex items-center justify-center bg-[#ff4ff3]/30">
            {data?.owner?.username && (
              <p className="font-semibold text-xl">{`${(data?.owner?.username)
                .charAt(0)
                .toUpperCase()}`}</p>
            )}
            {!data?.owner?.username && (
              <p className="font-semibold text-xl">E</p>
            )}
          </div>
        )}
        <h3 className="mb-2 font-bold text-center">{`${(data?.name).substring(
          0,
          20
        )}${(data?.name).length > 21 ? "..." : ""}`}</h3>
        <p className="text-[#969494] font-medium text-center"> ERC-20</p>
      </div>
    </Link>
  );
};
export default CollectionCard;
