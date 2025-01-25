"use client";

import Link from "next/link";

const MessageCard = ({ data, link }) => {
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

  // Example usage
  const originalDate = "2024-03-30T23:30:35.641Z";
  console.log(formatDate(originalDate));

  return (
    <Link
      href={link}
      className="w-[300px] p-2  flex flex-col place-self-start col-span-1 sm:col-span-3"
    >
      <h3 className="text-xl font-semibold text-[#ff4ff3] text-left">
        {" "}
        {data?.subject}{" "}
      </h3>
      {data?.body && (
        <p className="text-[14px] text-left">
          {" "}
          {`${(data?.body).substring(0, 21)}${
            (data?.body).length > 22 ? "..." : ""
          }`}
          {"  "}
          <span> {formatDate(data?.createdAt || originalDate)} </span>
        </p>
      )}
    </Link>
  );
};
export default MessageCard;
