"use client";

import { DropdownMenuCheckboxItemProps } from "@radix-ui/react-dropdown-menu";

// import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";

const CollectionDropdown = ({ blockChain, setBlockChain, otherStyles }) => {
  return (
    <DropdownMenu className={`${otherStyles}`}>
      <DropdownMenuTrigger>
        <p
          variant="outline"
          className="w-[299px] sm:w-[350px] bg-[#ff4ff3] p-4 rounded-xl flex items-center justify-between"
        >
          <span>{!blockChain && "Select a Blockchain"}</span>
          <span>{blockChain && blockChain}</span>
          <FontAwesomeIcon icon={faChevronDown} className="float-right mr-3" />
        </p>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-[300px] bg-[#ff4ff3] p-4 rounded-xl ">
        <DropdownMenuRadioGroup
          value={blockChain}
          onValueChange={setBlockChain}
        >
          <DropdownMenuRadioItem value="Ethereum MainNet">
            Ethereum MainNet
          </DropdownMenuRadioItem>
          <DropdownMenuRadioItem value="Binance Smart chain">
            Binance Smart chain
          </DropdownMenuRadioItem>
        </DropdownMenuRadioGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
export default CollectionDropdown;
