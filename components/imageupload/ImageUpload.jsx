"use client";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCloudArrowUp } from "@fortawesome/free-solid-svg-icons";
import Image from "next/image";

const ImageUpload = ({ title, image, setImage }) => {
  const handleImageChange = (e) => {
    const reader = new FileReader();
    reader.readAsDataURL(e.target.files[0]);
    reader.onload = () => {
      setImage(reader.result);
    };
    reader.onerror = (error) => console.log("error :", error);
  };

  return (
    <div className="w-[300px] sm:w-[500px] h-[400px] sm:h-[500px] flex flex-col items-center">
      <h2 className="w-[299px] sm:w-[400px] break-words text-[14px] text-center sm:text-left sm:text-xl">
        {title}
      </h2>
      <div className="mt-2">
        <label
          htmlFor="imageupload"
          className="relative w-[200px] sm:w-[400px] h-[300px] sm:h-[500px] bg-[#ef8bf7]/30 flex items-center justify-center rounded-xl cursor-pointer"
        >
          {!image && (
            <div className="">
              <FontAwesomeIcon
                icon={faCloudArrowUp}
                className="text-[#ff4ff3] text-[100px]"
              />
            </div>
          )}
          {image && (
            <Image
              src={image || "/assets/nftsample.jpg"}
              alt="upload sample"
              className="w-full h-[300px] sm:h-[500px] object-cover rounded-xl absolute"
              width={"750"}
              height={"750"}
            />
          )}
          <input
            type="file"
            className="hidden"
            id="imageupload"
            onChange={handleImageChange}
          />
        </label>
      </div>
    </div>
  );
};
export default ImageUpload;
