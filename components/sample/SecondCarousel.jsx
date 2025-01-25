"use client";

import { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-solid-svg-icons";

import { useDataContext } from "../context/DataProvider";
import Loading from "../loading/Loading";

const SecondCarousel = ({ data }) => {
  const { appData } = useDataContext();

  const [images, setImages] = useState(data);

  // { src: "/assets/nftsample.jpg", name: "Image 1", price: "$100" },
  // { src: "/assets/nftsample.jpg", name: "Image 2", price: "$200" },
  // { src: "/assets/nftsample.jpg", name: "Image 3", price: "$300" },

  const [currentIndex, setCurrentIndex] = useState(0);

  const handlePrev = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  };

  const handleNext = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === images.length - 1 ? 0 : prevIndex + 1
    );
  };

  useEffect(() => {
    const intervalId = setInterval(() => {
      handleNext();
    }, 4000); // Switch image every 3 seconds

    return () => clearInterval(intervalId); // Cleanup interval on component unmount
  }, [currentIndex]);

  useEffect(() => {
    if (appData) {
      let { assets } = appData;
      const last10 = [...assets].slice(-10);
      setImages(last10);
    }
  }, [appData, data]);

  if (!appData) return <Loading otherStyles={"mx-auto"} />;

  return (
    <div className="relative w-full sm:max-w-2xl mx-auto rounded-[10px]">
      <div className="relative w-full h-[330px] sm:h-96 rounded-[10px] mx-auto">
        {images.map((item, index) => (
          <div
            key={index}
            className={`mx-auto absolute inset-0 transition-all duration-500 ease-in-out w-[250px] h-[320px] sm:h-auto sm:w-[300px]  ${
              index === currentIndex
                ? "z-0 transform scale-105"
                : "-z-10 transform scale-90 opacity-60"
            } transform
    ${index === currentIndex ? "scale-105" : "scale-95"}
    ${
      index === (currentIndex - 1 + images.length) % images.length
        ? " -translate-x-[10%] sm:-translate-x-1/2"
        : index === (currentIndex + 1) % images.length
        ? "translate-x-[10%] sm:translate-x-1/2"
        : "translate-x-0"
    }
    transition-transform duration-300`}
            style={{
              backgroundImage: `url(${item.image})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              borderRadius: "10px",
              //   transform:
              //     index === currentIndex
              //       ? "scale(1.05)"
              //       : `scale(0.95) translateX(${
              //           index ===
              //           (currentIndex - 1 + images.length) % images.length
              //             ? "-50%"
              //             : index === (currentIndex + 1) % images.length
              //             ? "50%"
              //             : "0"
              //         })`,
            }}
          />
        ))}
      </div>

      {/* Information section below the active image */}
      <div className="sm:mt-4 text-center">
        {images[currentIndex] && (
          <div className="w-[250px] sm:w-[336px]  rounded-[10px]  flex flex-col p-3 items-start justify-start bg-[#ef8bf7]/50">
            <h3 className="mb-2 font-bold">{`${images[
              currentIndex
            ].name.substring(0, 18)}${
              images[currentIndex].name.length > 19 ? "..." : ""
            }`}</h3>
            <div className="flex items-center justify-between w-full">
              <div className="flex flex-col items-start justify-between">
                <p>Price :</p>
                <p>{images[currentIndex].supply} items left</p>
              </div>
              <div className="flex flex-col items-start justify-between">
                <p>{images[currentIndex].price} ETH </p>

                <p>
                  <FontAwesomeIcon
                    icon={faHeart}
                    className="text-[#f08faf] text-[18px] mr-1"
                  />
                  {images[currentIndex].likes}
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SecondCarousel;
