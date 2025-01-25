"use client";
import { useDataContext } from "@/components/context/DataProvider";
import { useState, useEffect, use } from "react";
import Loading from "@/components/loading/Loading";
import Image from "next/image";

const page = (props) => {
  const params = use(props.params);
  const { appData } = useDataContext();
  const { notifications } = appData;

  const [notificaton, setNotification] = useState(null);

  const [resolvedParams, setResolvedParams] = useState(null);

  function formatDate(dateString) {
    const date = new Date(dateString);

    const options = {
      month: "numeric",
      day: "numeric",
      year: "numeric",
      hour: "numeric",
      minute: "numeric",
      hour12: true,
    };

    const formattedDate = new Intl.DateTimeFormat("en-US", options).format(
      date
    );

    return formattedDate.replace(", ", " ");
  }

  useEffect(() => {
    async function fetchParams() {
      const unwrappedParams = await params;
      setResolvedParams(unwrappedParams);
    }
    fetchParams();
  }, [params]);

  useEffect(() => {
    if (resolvedParams && appData) {
      const currentNotification = notifications.find(
        (item) => item._id === resolvedParams.id
      );
      setNotification(currentNotification);
    }
  }, [resolvedParams, notifications]);

  if (!resolvedParams || !appData) return <Loading otherStyles={"mx-auto"} />;
  return (
    <div className="max-w-5xl flex flex-col items-start justify-center min-h-screen pt-[75px] pb-6">
      <div className="flex flex-col mx-auto items-center justify-center space-y-2">
        <div className="bg-[#ff4ff3]/30 rounded p-2 w-[300px] sm:w-[450px] flex items-center justify-center">
          <p className="break-words">
            <Image
              src={"/assets/logo.png"}
              alt="app logo"
              width={50}
              height={50}
              className="inline-flex w-[20px] h-[20px]"
            />{" "}
            From: EliteNFTVault Admin
          </p>
        </div>
        <div className="bg-[#ff4ff3]/30 rounded p-2 w-[300px] sm:w-[450px] flex items-center justify-center">
          <p className="break-words">{notificaton?.subject}</p>
        </div>
        <div className="bg-[#ff4ff3]/30 rounded p-2 w-[300px] sm:w-[450px] flex flex-col items-center justify-center min-h-[300px]">
          <p className="break-words">{notificaton?.body}</p>
          <span className="self-end mt-1 sm:mt-4">
            {/* {formatDate(notificaton?.createdAt)}{" "} */}
            sijdsj
          </span>
        </div>
      </div>
    </div>
  );
};
export default page;
