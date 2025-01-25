"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown } from "@fortawesome/free-solid-svg-icons";

const CustomDropdown = ({ category, setCategory, otherStyles }) => {
  return (
    <DropdownMenu className={`${otherStyles}`}>
      <DropdownMenuTrigger>
        <p
          variant="outline"
          className="w-[299px] sm:w-[350px] bg-[#ff4ff3] p-4 rounded-xl flex items-center justify-between"
        >
          {!category && <span>Select a Category</span>}
          {category && <span>{category}</span>}
          <FontAwesomeIcon icon={faChevronDown} className="float-right mr-3" />
        </p>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-[300px] bg-[#ff4ff3] p-4 rounded-xl ">
        <DropdownMenuRadioGroup value={category} onValueChange={setCategory}>
          <DropdownMenuRadioItem value="arts">Arts</DropdownMenuRadioItem>
          <DropdownMenuRadioItem value="collectibles">
            Collectibles
          </DropdownMenuRadioItem>
          <DropdownMenuRadioItem value="gaming">Gaming</DropdownMenuRadioItem>
          <DropdownMenuRadioItem value="music">Music</DropdownMenuRadioItem>
        </DropdownMenuRadioGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
export default CustomDropdown;
