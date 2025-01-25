"use client";
import Link from "next/link";
import { useDataContext } from "../context/DataProvider";
const Footer = () => {
  const { user } = useDataContext();
  return (
    <footer className="w-full pb-5 border-t-2 border-[#969494]">
      <div className=" max-w-5xl mx-auto flex sm:flex-row flex-col items-start justify-between pb-20 px-2 sm:px-0">
        <div className="flex flex-col mt-4 sm:mt-0">
          <p className="font-semibold text-[19px] my-3"> Marketplace</p>
          <Link href={"/marketplace/explore"} className="my-1 text-[#edf0f2]">
            Explore
          </Link>
          <Link href={"/user"}>Profile</Link>
          {!user?._id && <Link href={"/login"}>Login</Link>}
          {!user?._id && <Link href={"/register"}>Register</Link>}
        </div>
        <div className="flex flex-col mt-4 sm:mt-0">
          <p className="font-semibold text-[19px] my-3"> Resources</p>
          <Link
            href={"/frequently-asked-questions"}
            className="my-1 text-[#edf0f2]"
          >
            Frequently asked questions
          </Link>
          <Link href={`/frequently-asked-questions?tab=${"tos"}`}>
            Terms and conditions
          </Link>
        </div>
        <div className="flex flex-col mt-4 sm:mt-0">
          <p className="font-semibold text-[19px] my-3"> Company</p>
          <Link href={"/contact"}>Contact Us</Link>
          <Link href={`/frequently-asked-questions?tab=${"about"}`}>
            About Us
          </Link>
        </div>
      </div>
      <div className="mx-auto max-w-4xl w-full">
        {" "}
        <p className="text-center">
          Copyright © EliteNFTVault, INC. {new Date().getFullYear()} All rights
          reserved.{" "}
        </p>
      </div>
    </footer>
  );
};
export default Footer;
