"use client";

import { useEffect, useState, use } from "react";
import { useDataContext } from "@/components/context/DataProvider";

import Loading from "@/components/loading/Loading";
import { toast } from "react-toastify";
import Image from "next/image";
import ConfirmBtn from "@/components/loading/ConfirmBtn";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowDown, faEye, faHeart } from "@fortawesome/free-solid-svg-icons";
import ShoppingCard from "@/components/NFtcards/ShoppingCard";
import TxAlert from "@/components/loading/TxAlert";
import PurchaseAlert from "@/components/loading/PurchaseAlert";
import { useRouter } from "next/navigation";

const page = (props) => {
  const router = useRouter();
  const params = use(props.params);
  const { appData, user } = useDataContext();
  const { assets, collections } = appData;

  const [collAssets, setCollAssets] = useState([]);

  const [resolvedParams, setResolvedParams] = useState(null);
  const [asset, setAsset] = useState(null);
  const [currentCollection, setCurrentCollection] = useState(null);
  const [loading, setLoading] = useState(false);
  const [purchase, setPurchase] = useState("");
  const [fmessage, setFmessage] = useState("");
  const [smessage, setSmessage] = useState("");

  useEffect(() => {
    async function fetchParams() {
      const unwrappedParams = await params;
      setResolvedParams(unwrappedParams);
    }
    fetchParams();
  }, [params]);

  useEffect(() => {
    if (resolvedParams && assets.length) {
      const currentAsset = assets.find(
        (item) => item._id === resolvedParams.id
      );
      const sameCol = assets.filter(
        (item) => item.collectionName?._id === currentAsset?.collectionName?._id
      );
      const col = collections.find(
        (item) => item._id === currentAsset?.collectionName?._id
      );
      console.log(sameCol);
      setAsset(currentAsset);
      setCollAssets(sameCol);
      setCurrentCollection(col);
    }
  }, [resolvedParams, assets]);

  async function initiatePurchase() {
    try {
      setLoading(true);
      if (!user?._id) return router.push("/login");
      if (user?.balance < asset.price) {
        setLoading(false);
        setPurchase("failed");
        toast.error("Insuficient funds");
        setFmessage(
          `There was a transaction error for the purchase of ${asset.name}, due to insufficient balance.`
        );
        return;
      }

      if (currentCollection?.gasfee === "unpaid") {
        setLoading(false);
        setPurchase("failed");
        toast.error("Transaction failed.");
        setFmessage(
          `There was a transaction error for the purchase of ${asset.name}, this is a problem from this seller's end.`
        );
        return;
      } else {
        setLoading(false);
        setPurchase("success");

        setSmessage(`The purchase of ${asset.name} has been completed.`);
        return;
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }

  if (!resolvedParams || !asset) return <Loading otherStyles={"mx-auto"} />;

  return (
    <div className="w-full min-h-screen p-2 flex flex-col pt-[75px] pb-5">
      <h2 className="my-3 text-[#ffffff] font-bold text-[25px] sm:text-[35px] text-center">
        Purchase
      </h2>
      <div className="flex flex-col-reverse sm:flex-row items-start justify-center sm:justify-between w-full  max-w-5xl mx-auto relative">
        {loading && (
          <Loading
            otherStyles={"absolute mx-auto z-30  bg-[#582b71]/50 top-2"}
          />
        )}
        {purchase === "success" && (
          <PurchaseAlert
            smessage={smessage}
            otherStyles={"absolute top-5 sm:left-[30%] mx-auto"}
            setPurchase={setPurchase}
          />
        )}
        {purchase === "failed" && (
          <TxAlert
            fmessage={fmessage}
            otherStyles={"absolute top-5 sm:left-[30%] mx-auto"}
            setPurchase={setPurchase}
          />
        )}
        <div className="flex flex-col basis-[45%]">
          <h3 className="my-3 text-[#ffffff] font-bold text-[35px] ">
            {asset?.name}
          </h3>
          <small className="mb-3">
            {" "}
            <FontAwesomeIcon icon={faArrowDown} /> NFT info
          </small>
          <p className="text-[16.9px] text-[#969494] mb-3">
            {" "}
            <span>Owned by {asset?.owner?.username}</span>{" "}
            <span className="mx-4">
              {" "}
              <FontAwesomeIcon icon={faEye} /> 200
            </span>{" "}
            <span>
              <FontAwesomeIcon icon={faHeart} className="text-[#ef8bf7]" /> 10
              favourite
            </span>{" "}
          </p>
          <div className="w-[99%] border-[#d9d9d9] border my-3" />
          <p className="text-[16.9px] text-[#969494]"> current price</p>
          <p className="text-[#ffffff] text-[38px] font-bold">
            {asset?.price} ETH
          </p>
          <p className="text-[16.9px] text-[#969494]"> $29000 USD</p>
          <div className="w-[99%] border-[#d9d9d9] border my-3" />
          <div className="bg-[#582b71]/50 rounded-[10px] py-4 px-2">
            <p className="my-1 font-semibold text-xl text-white">Description</p>
            <p className="text-[16.9px] text-[#969494]">
              {" "}
              From the #{asset?.collectionName?.name || asset?.collectionName}
            </p>
            <p className="text-[16.9px] text-[#969494]">
              {" "}
              RetroPixel Gems is a captivating NFT collection that pays homage
              to the timeless charm of retro aesthetics through pixel art. Each
              piece in this collection is a carefully crafted gem, blending
              nostalgia with modern
            </p>
          </div>
        </div>
        <div className="flex flex-col mx-auto  sm:basis-[48%]">
          <Image
            src={asset.image}
            alt="product image"
            width={1500}
            height={1500}
            className="w-[299px] sm:w-[400px] h-[500px] rounded-[10px]"
          />
          <ConfirmBtn
            title={"Buy Now"}
            otherStyles={
              "text-white text-xl font-semibold bg-[#ef8bf7] w-[299px] sm:w-[400px] p-4 mt-2"
            }
            handleClicked={initiatePurchase}
          />
        </div>
      </div>
      {collAssets && (
        <div className="flex flex-col p-2 my-4">
          <h3 className="text-white font-semibold text-3xl mb-2">
            {" "}
            More from this Collection
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 justify-items-center">
            {asset &&
              [...collAssets]
                .reverse()
                .map((item) => <ShoppingCard key={item?._id} data={item} />)}
          </div>
        </div>
      )}
      <div className="flex flex-col p-2 my-4">
        <h3 className="text-white font-bold text-3xl mb-2"> Other assets</h3>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 justify-items-center">
          {assets &&
            [...assets]
              .reverse()
              .map((item) => <ShoppingCard key={item?._id} data={item} />)}
        </div>
      </div>
    </div>
  );
};
export default page;
