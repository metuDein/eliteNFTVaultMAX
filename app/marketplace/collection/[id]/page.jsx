"use client";
import Image from "next/image";
import { useDataContext } from "@/components/context/DataProvider";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEthereum } from "@fortawesome/free-brands-svg-icons";
import ShoppingCard from "@/components/NFtcards/ShoppingCard";
import Loading from "@/components/loading/Loading";
import { useState, useEffect, use } from "react";

const page = (props) => {
  const params = use(props.params);
  const { appData, user } = useDataContext();
  const { assets, collections } = appData;

  const [collAssets, setCollAssets] = useState(null);

  const [resolvedParams, setResolvedParams] = useState(null);
  const [collection, setCollection] = useState(null);
  const [totalValue, setTotalValue] = useState(0);
  const [totalLike, setTotalLikes] = useState(0);
  const [totalViews, setTotalLikesViews] = useState(0);

  useEffect(() => {
    async function fetchParams() {
      const unwrappedParams = await params;
      setResolvedParams(unwrappedParams);
    }
    fetchParams();
  }, [params]);

  useEffect(() => {
    if (resolvedParams && assets.length) {
      const currentCollection = collections.find(
        (item) => item._id === resolvedParams.id
      );
      const collectionAssets = assets.filter(
        (item) => item?.collectionName?.name === currentCollection?.name
      );
      setCollection(currentCollection);
      setCollAssets(collectionAssets);

      const totalValue = [...collectionAssets].reduce(
        (acc, item) => acc + item?.price,
        0
      );
      const totallikes = [...collectionAssets].reduce(
        (acc, item) => acc + item?.likes,
        0
      );

      setTotalValue(totalValue);
      setTotalLikes(totallikes);
    }
  }, [resolvedParams, collections]);

  if (!resolvedParams || !collection)
    return <Loading otherStyles={"mx-auto"} />;

  return (
    <div className="w-full min-h-screen p-3 pt-[75px] pb-6">
      <div className="w-full p-2 flex flex-col sm:flex-row items-center justify-between">
        <div className="flex items-start justify-between">
          <Image
            src={collection?.banner || "/assets/banner.jpg"}
            alt="collection image"
            width={1000}
            height={1000}
            className="rounded-[10px] w-[183px] h-[150px] sm:w-[283px] sm:h-[258px] object-contain"
          />

          <div className="flex flex-col self-center">
            <p className="text-xl font-bold text-[#FF4ff3] my-2">
              {collection?.name}{" "}
            </p>
            <p className="text-xl font-medium text-[#ffffff] my-2">
              7 ETH
              <FontAwesomeIcon
                icon={faEthereum}
                className="text-[#000] text-xl ml-2"
              />{" "}
            </p>
            <p className="text-sm font-medium text-[#ffffff] my-2">
              Total assets : {collAssets.length}
            </p>
          </div>
        </div>
      </div>

      <div className="w-full px-2 sm:px-20 mx-auto my-3 flex items-center justify-center gap-1 sm:gap-40">
        <div className="flex flex-col">
          <p className="text-[#969494] items-center">Views</p>
          <p className="font-bold text-2xl text-white"> 140 </p>
        </div>
        <div className="flex flex-col items-center">
          <p className="text-[#969494]">Value</p>
          <p className="font-bold text-2xl text-white">
            {" "}
            <FontAwesomeIcon icon={faEthereum} className="ml-1" />
            {totalValue}
          </p>{" "}
        </div>
        <div className="flex flex-col items-center">
          <p className="text-[#969494]">Favourite</p>
          <p className="font-bold text-2xl text-white"> {totalLike} </p>
        </div>
      </div>
      <div className="w-full p-3 grid grid-cols-1 sm:grid-cols-3 sm:gap-8 gap-2 content-center justify-items-center">
        {collAssets &&
          collAssets.map((item, index) => (
            <ShoppingCard key={item?._id} data={item} />
          ))}
        {!collAssets && (
          <p className="text-white font-bold text-xl text-center">
            {" "}
            No Assets found{" "}
          </p>
        )}
      </div>
    </div>
  );
};
export default page;
