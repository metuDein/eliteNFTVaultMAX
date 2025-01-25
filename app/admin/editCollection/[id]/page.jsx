"use client";
import Image from "next/image";
import { useDataContext } from "@/components/context/DataProvider";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEthereum } from "@fortawesome/free-brands-svg-icons";

import ConfirmBtn from "@/components/loading/ConfirmBtn";
import { useState, useEffect, use } from "react";
import Loading from "@/components/loading/Loading";

import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import InputFields from "@/components/form/InputFields";
import AdminAssets from "@/components/NFtcards/AdminAssets";

const page = (props) => {
  const router = useRouter();
  const params = use(props.params);
  const { appData, user, fetchAppData } = useDataContext();
  const { assets, collections } = appData;

  const [collAssets, setCollAssets] = useState(null);
  const [loading, setLoading] = useState(false);

  const [resolvedParams, setResolvedParams] = useState(null);
  const [collection, setCollection] = useState(null);
  const [totalValue, setTotalValue] = useState(0);
  const [totalLike, setTotalLikes] = useState(0);

  const [gasfee, setGasfee] = useState(0);
  const [withdrawalfee, setWithdrawalfee] = useState(0);
  const [gasState, setGasState] = useState("");

  async function editCollection() {
    try {
      setLoading(true);
      const response = await fetch("/api/adminrequest/collection", {
        method: "PATCH",
        body: JSON.stringify({
          id: collection?._id,
          gasfeeamount: gasfee,
          withdrawalFee: withdrawalfee,
          gasState: gasState,
        }),
      });
      if (!response.ok) {
        const errorData = await response.json();
        toast.error(errorData.message);
        return;
      }
      if (response.ok) {
        await fetchAppData();
        toast.success("Collection updated.");
        return;
      }
    } catch (error) {
      console.log(error.name, ": ", error.message);
      return;
    } finally {
      setLoading(false);
    }
  }

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
      console.log(currentCollection);

      setGasfee(currentCollection?.gasfeeamount);
      setWithdrawalfee(currentCollection?.withdrawalFee);
      setGasState(currentCollection?.gasFee);
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
            className="rounded-[10px] w-[183px] h-[150px] sm:w-[283px] sm:h-[258px] object-contain mr-2 sm:mr-0"
          />

          <div className="flex flex-col self-center">
            <p className="text-xl font-bold text-[#FF4ff3] my-2">
              {collection.name}{" "}
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

        <div className="bg-[#ff4ff3]/40   w-[300px]  sm:w-[310px] py-3 flex flex-col justify-around relative">
          {loading && <Loading otherStyles={"absolute"} />}

          <form>
            <InputFields
              label={"Name"}
              placeholder={"collection name"}
              value={collection?.name}
              handleChange={() => {}}
            />
            <InputFields
              label={"Gas Fee state"}
              placeholder={"paid or unpaid"}
              value={gasState}
              handleChange={(e) => setGasState(e.target.value)}
            />
            <InputFields
              label={"Gas fee amount"}
              placeholder={"gas fee amount"}
              inputType={"number"}
              value={gasfee}
              handleChange={(e) => setGasfee(e.target.value)}
            />
            <InputFields
              label={"Withdrawal fee"}
              placeholder={"withdrawal fee"}
              inputType={"number"}
              value={withdrawalfee}
              handleChange={(e) => setWithdrawalfee(e.target.value)}
            />
          </form>
          <ConfirmBtn
            title={"Save"}
            otherStyles={"bg-[#ff4ff3]/60 p-3 mx-auto"}
            handleClicked={editCollection}
          />
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
          </p>
        </div>
        <div className="flex flex-col items-center">
          <p className="text-[#969494]">Favourite</p>
          <p className="font-bold text-2xl text-white"> {totalLike} </p>
        </div>
      </div>
      <div className="w-full p-3 grid grid-cols-1 sm:grid-cols-3 gap-8  justify-items-center">
        {collAssets &&
          collAssets.map((item, index) => (
            <AdminAssets
              key={item?._id}
              data={item}
              link={`/admin/editAsset/${item?._id}`}
            />
          ))}
        {collAssets.length === 0 && (
          <p className="text-white font-bold text-xl text-center">
            {" "}
            No Assets found{" "}
          </p>
        )}
        <ConfirmBtn
          title={"Delete collection"}
          otherStyles={"bg-[#cb4747] p-4 w-[300px]"}
        />
      </div>
    </div>
  );
};
export default page;
