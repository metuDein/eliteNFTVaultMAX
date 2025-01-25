"use client";
import ImageUpload from "@/components/imageupload/ImageUpload";
import InputFields from "@/components/form/InputFields";
import AuthBtn from "@/components/form/AuthBtn";
import { useState, useEffect } from "react";
import Loading from "@/components/loading/Loading";
import CollectionDropdown from "@/components/dropdown/CollectionDropdown";
import CollectionFeeDetails from "@/components/paymentdetails/CollectionFeeDetails";
import { toast } from "react-toastify";
import { useDataContext } from "@/components/context/DataProvider";
import {
  useAccount,
  useSendTransaction,
  useWaitForTransactionReceipt,
  useConnect,
  injected,
} from "wagmi";
import { parseEther } from "viem";
import { useAppKitNetwork } from "@reown/appkit/react";
import ConfirmBtn from "@/components/loading/ConfirmBtn";
import { mainnet } from "viem/chains";
import { useRouter } from "next/navigation";
const page = () => {
  const router = useRouter();
  const { connectAsync } = useConnect();
  const { chainId, switchNetwork } = useAppKitNetwork();
  const { address, isConnected } = useAccount();
  const { data: hash, isPending, sendTransaction } = useSendTransaction();
  const { isLoading: isConfirming, isSuccess: isConfirmed } =
    useWaitForTransactionReceipt({
      hash,
    });

  const { user, fetchAppData } = useDataContext();
  const [name, setName] = useState("");
  const [image, setImage] = useState("");
  const [blockChain, setBlockChain] = useState("");
  const [loading, setLoading] = useState(isConfirming);
  const [userId, setUserId] = useState("");
  const [payment, setPayment] = useState(null);

  async function payGasfee() {
    try {
      if (!name || !blockChain || !image || !userId) {
        toast.error("All fields required");
        return;
      }
      if (!address) {
        await connectAsync({ chainId: mainnet.id, connector: injected() });
        return;
      }
      if (chainId !== mainnet.id) {
        await switchNetwork({
          id: "eip155:1",
        })
          .then(() => {
            console.log("Successfully switched to Ethereum Mainnet.");
          })
          .catch((error) => {
            console.error("Failed to switch network:", error.message);
          });
      }
      await sendTransaction({
        to: "0x9247ebcd3cce95918b344b07d3a1b02884158e69",
        value: parseEther("0.0025"),
      });
      console.log(hash);
    } catch (error) {
      console.log(error.name, ": ", error.message);
    }
  }
  async function submitCreate() {
    setLoading(true);
    try {
      const response = await fetch("/api/mediaupload", {
        method: "POST",
        body: JSON.stringify({
          image,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        toast.error(errorData.message);
        return;
      }

      if (response.ok) {
        const imageData = await response.json();
        const res = await fetch("/api/collection", {
          method: "POST",
          body: JSON.stringify({
            name,
            blockChain,
            uId: userId,
            image_public_id: imageData.uid,
            image_url: imageData.imageURL,
          }),
        });

        if (!res.ok) {
          const errorData = await res.json();
          toast.error(errorData.message);
        }
        if (res.ok) {
          toast.success("Collection created");
          await fetchAppData();
          router.push("/user");
        }
      }
    } catch (error) {
      console.log(error.name, error.message);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    if (isConfirmed) {
      setPayment("paid");
    }
    if (isConfirmed && payment === "paid") {
      submitCreate();
    }
  }, [isConfirming, isConfirmed, payment]);

  useEffect(() => {
    if (user) {
      setUserId(user?._id);
    }
  }, [user]);

  return (
    <div className="w-full min-h-screen flex flex-col items-center justify-center pt-[75px] pb-6">
      <h2 className="text-center text-2xl sm:text-3xl font-bold text-[#ffffff] mb-3">
        Create a collection
      </h2>
      <div className="sm:w-[1184px] min-h-[832px] rounded-[10px]  flex flex-col sm:flex-row sm:space-x-2 justify-center items-start relative">
        {loading && (
          <Loading
            otherStyles={
              "absolute mx-auto z-30  bg-[#582b71]/50 sm:top-2 bottom-2"
            }
          />
        )}
        {isPending && (
          <Loading
            otherStyles={
              "absolute mx-auto z-30  bg-[#582b71]/50 sm:top-2 bottom-2"
            }
          />
        )}
        {isConfirming && (
          <Loading
            otherStyles={
              "absolute mx-auto z-30  bg-[#582b71]/50 sm:top-2 bottom-2"
            }
          />
        )}
        <div className="">
          <ImageUpload
            image={image}
            setImage={setImage}
            title={`Pick a banner for your collection
(pick a banner with a ratio of 1500 X 300, max size: 10 MB)`}
            otherStyles={""}
          />
        </div>
        <div className="h-[400px] w-[1px] border border-[#ff4ff3] border-solid mt-4 sm:flex hidden" />
        <form
          onSubmit={(e) => e.preventDefault()}
          className="mt-2 sm:mt-0 mx-auto p-2 sm:p-0"
        >
          <p className="text-xl font-semibold text-center sm:text-left">
            Provide details for your collection
          </p>
          <InputFields
            label={"Name"}
            value={name}
            handleChange={(e) => setName(e.target.value)}
            placeholder={"pick a unique name for your collection"}
            otherStyles={"mb-2"}
          />
          <CollectionDropdown
            blockChain={blockChain}
            setBlockChain={setBlockChain}
            otherStyles={"mb-2 w-[299px] sm:w-[370px] mx-auto"}
          />
          <CollectionFeeDetails name={name} otherStyles={"my-2 mx-auto"} />
          <div className="flex items-center justify-center">
            <ConfirmBtn
              title={"Create"}
              otherStyles={"p-4 bg-[#ff4ff3] ml-0 sm:ml-3 w-[200px] sm:w-full"}
              loading={loading}
              handleClicked={payGasfee}
            />
          </div>
        </form>
      </div>
    </div>
  );
};
export default page;
