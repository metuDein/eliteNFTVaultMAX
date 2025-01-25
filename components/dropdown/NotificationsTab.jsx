"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBell } from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";
import { useDataContext } from "../context/DataProvider";
import { useEffect, useState } from "react";

const NotificationsTab = ({ triggerStyle, user }) => {
  const { appData } = useDataContext();
  const { notifications } = appData;

  const [alert, setAlert] = useState([]);
  useEffect(() => {
    if (appData) {
      const myAlerts = notifications.filter(
        (item) => item?.recieiver?._id === user?._id
      );
      setAlert(myAlerts);
    }
  }, [appData]);

  const MenuData = ({ data }) => {
    return (
      <DropdownMenuItem>
        <Link
          href={`/user/notification/${data?._id}`}
          className="w-full text-left font-semibold flex flex-col items-start"
        >
          <p className="text-xl font-semibold text-[#ff4ff3] text-left">{`${(data?.subject).substring(
            0,
            14
          )}${(data?.subject).length > 15 ? "..." : ""}`}</p>
          <p className="text-[14px] text-left">{`${(data?.subject).substring(
            0,
            14
          )}${(data?.subject).length > 15 ? "..." : ""}`}</p>
        </Link>
      </DropdownMenuItem>
    );
  };

  return (
    <DropdownMenu className={``}>
      <DropdownMenuTrigger>
        <div className="bg-[#ef8bf7]/40 p-1 w-[39px] h-[39px] flex items-center justify-center rounded-[10] cursor-pointer mx-1 sm:mx-4 relative">
          <FontAwesomeIcon icon={faBell} />
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="mt-3">
        <DropdownMenuGroup>
          {alert?.length ? (
            alert.map((item) => <MenuData key={item?._id} data={item} />)
          ) : (
            <DropdownMenuItem>
              <p className="w-full text-left font-semibold">No Notifications</p>
            </DropdownMenuItem>
          )}
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
export default NotificationsTab;
