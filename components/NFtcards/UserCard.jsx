import Image from "next/image";
import Link from "next/link";

const UserCard = ({ data, index, link }) => {
  return (
    <Link href={link} className="flex items-start justify-center h-[95px]">
      <p> {index + 1}. </p>
      <div className="mx-5">
        {data?.image && (
          <Image
            src={data?.image}
            alt="top sellers"
            width={500}
            height={500}
            className="rounded-[8px] object-cover w-[86px] h-[84px] "
          />
        )}
        {!data?.image && (
          <div className="w-[86px] h-[84px] rounded-[8px] mx-auto mb-2 flex items-center justify-center bg-[#ff4ff3]/30">
            {data?.username && (
              <p className="font-semibold text-xl">{`${(data?.username)
                .charAt(0)
                .toUpperCase()}`}</p>
            )}
          </div>
        )}
      </div>
      <div className="flex flex-col self-center">
        <p className="text-[#ff4ff3] font-semibold text-[20px]">
          {`${(data?.username).substring(0, 11)}${
            (data?.username).length > 12 ? "..." : ""
          }`}{" "}
        </p>
        <p className="text-white text-[12px]"> {data?.balance} ETH</p>
      </div>
    </Link>
  );
};
export default UserCard;
