"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEthereum } from "@fortawesome/free-brands-svg-icons";
import Image from "next/image";
import Link from "next/link";
import { signOut } from "next-auth/react";
import { useDataContext } from "../context/DataProvider";

const NavDropDownMenu = ({ triggerStyle, user }) => {
  const { setUser } = useDataContext();
  async function signout(params) {
    await signOut();
    setUser({});
  }

  return (
    <DropdownMenu className={``}>
      <DropdownMenuTrigger>
        <div
          className={`flex items-center justify-between bg-[#582b71]/70 px-[4px] py-1 rounded-[5px] ${
            user?.walletAddress && "w-[150px]"
          }`}
        >
          <div>
            {user?.image && (
              <Image
                src={user?.image}
                alt="user image"
                width={300}
                height={300}
                className="w-[36px] h-[36px] rounded object-fill outline-0"
              />
            )}
            {!user?.image && (
              <div className="w-[36px] h-[36px] rounded object-fill outline-0 flex items-center justify-center bg-[#ff4ff3]/30">
                <p className="font-semibold">
                  {(user?.username).charAt(0).toUpperCase()}
                </p>
              </div>
            )}
          </div>
          {user?.walletAddress && (
            <div className="flex flex-col items-end justify-center h-9">
              <p className="text-sm leading-4 p-[1px]">
                {" "}
                {(user?.balance).toFixed(5)}{" "}
                <FontAwesomeIcon
                  icon={faEthereum}
                  className="text-gradient-to-r from-[#141414] to-[#3c3c3b]"
                />{" "}
              </p>
              <p className="text-sm leading-4">
                {" "}
                <span className="w-1 h-1 rounded-full bg-green-600 inline-flex mx-[1px]"></span>
                {`${(user?.walletAddress)
                  .slice(0, 4)
                  .toString()}...${(user?.walletAddress).slice(-4).toString()}`}
              </p>
            </div>
          )}
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="mt-3">
        <DropdownMenuGroup>
          <DropdownMenuItem>
            <Link href={"/"} className="w-full text-left font-semibold">
              Home
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <Link href={"/user"} className="w-full text-left font-semibold">
              Profile
            </Link>
          </DropdownMenuItem>
          {/* sub menu to create */}
          <DropdownMenuItem>
            <Link
              href={"/user/createCollection"}
              className="w-full text-left font-semibold"
            >
              Create
            </Link>
          </DropdownMenuItem>
          {/* <DropdownMenuItem>
            <appkit-button
              balance="hide"
              label="Buy crypto"
              size="sm"
              address="hide"
            />
          </DropdownMenuItem> */}
          <DropdownMenuItem>
            <Link
              href={"/frequently-asked-questions"}
              className="w-full text-left font-semibold"
            >
              FAQs
            </Link>
          </DropdownMenuItem>
          {user?.roles?.Admin === 5150 && (
            <DropdownMenuItem>
              <Link href={"/admin"} className="w-full text-left font-semibold">
                Admin Panel
              </Link>
            </DropdownMenuItem>
          )}
          <DropdownMenuItem>
            <button
              className="w-full text-left font-semibold"
              onClick={signout}
            >
              LogOut
            </button>
          </DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
export default NavDropDownMenu;
