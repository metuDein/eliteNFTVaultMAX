"use client";
import { useEffect, useState, use } from "react";
import ImageUpload from "@/components/imageupload/ImageUpload";
import { useDataContext } from "@/components/context/DataProvider";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClone } from "@fortawesome/free-solid-svg-icons";
import Loading from "@/components/loading/Loading";
import ConfirmBtn from "@/components/loading/ConfirmBtn";
import { toast } from "react-toastify";
import InputFields from "@/components/form/InputFields";
import { useRouter } from "next/navigation";
import Image from "next/image";

const page = (props) => {
  const router = useRouter();
  const params = use(props.params);
  const [resolvedParams, setResolvedParams] = useState(null);

  const { fetchAppData, appData } = useDataContext();
  const { users } = appData;
  const [image, setImage] = useState("");
  const [tab, setTab] = useState("view");
  const [foundUser, setFoundUser] = useState(null);
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    bio: "",
    balance: 0,
  });

  const [loading, setLoading] = useState(false);

  async function submit(e) {
    e.preventDefault();
    if (!foundUser?._id) {
      toast.error("id required");
      return;
    }

    try {
      setLoading(true);

      const response = await fetch("/api/adminrequest/user", {
        method: "PATCH",
        body: JSON.stringify({
          id: foundUser?._id,
          balance: formData.balance,
        }),
      });

      console.log(response);
      if (response.status === 409) {
        setErrorMsg("username already exists");
        setTimeout(() => {
          setErrorMsg(null);
        }, 3000);

        return;
      }
      if (response.ok) {
        await fetchAppData();
        toast.success("update successful.");
      }
    } catch (error) {
      toast.error("update failed.");
    } finally {
      setLoading(false);
    }
  }

  function cancelEdit() {
    setImage(foundUser.image);
    setFormData({
      ...formData,
      username: foundUser?.username,
      email: foundUser?.email,
      bio: foundUser?.bio,
      balance: foundUser?.balance,
    });
    setTab("view");
  }

  useEffect(() => {
    async function fetchParams() {
      const unwrappedParams = await params;
      setResolvedParams(unwrappedParams);
    }
    fetchParams();
  }, [params]);

  useEffect(() => {
    if (resolvedParams) {
      const user = users.find((item) => item._id === resolvedParams.id);
      console.log(user);

      setFoundUser(user);
      setFormData({
        ...formData,
        username: user.username,
        email: user.email,
        bio: user?.bio,
        balance: user?.balance,
      });
      setImage(user.image);
    }
  }, [appData]);

  if (!resolvedParams || !foundUser) return <Loading otherStyles={"mx-auto"} />;

  return (
    <div className="w-full min-h-screen flex flex-col items-center justify-center pt-[75px] pb-6">
      <h2 className="text-center text-3xl font-bold text-[#ffffff] mb-3">
        Profile Details
      </h2>
      <div className=" rounded-[10px] flex  flex-col sm:flex-row justify-center items-start relative">
        <div>
          <label
            htmlFor="imageupload"
            className=" w-[300px] sm:w-[400px] h-[400px] sm:h-[500px] bg-[#ef8bf7]/30 flex items-center justify-center rounded-xl cursor-default mx-auto"
          >
            {image && (
              <Image
                src={image || "/assets/nftsample.jpg"}
                alt="upload sample"
                className="w-full h-[400px] sm:h-[500px] object-cover rounded-xl"
                width={"750"}
                height={"750"}
              />
            )}
            {!image && (
              <Image
                src={"/assets/nftsample.jpg"}
                alt="upload sample"
                className="w-full h-[400px] sm:h-[500px] object-cover rounded-xl"
                width={"750"}
                height={"750"}
              />
            )}
          </label>
        </div>
        <div className="h-[400px] w-[1px] border border-[#ff4ff3] border-solid self-center sm:mx-3 hidden sm:flex" />
        {tab === "view" && (
          <div className="flex flex-col items-start justify-start flex-1 self-center mx-3">
            <div className="w-full">
              <p> username : </p>
              <p className="p-3 bg-[#ff4ff3]/30 rounded text-white text-left w-[290px] mt-2">
                {foundUser?.username}
              </p>
            </div>
            <div className="w-full">
              <p> email : </p>
              <p className="p-3 bg-[#ff4ff3]/30 rounded text-white text-left w-[290px] mt-2">
                {foundUser?.email}
              </p>
            </div>
            <div className="w-full">
              <p> wallet address : </p>
              <p
                className="p-3 bg-[#ff4ff3]/30 rounded text-white text-left w-[290px] mt-2 break-words"
                onClick={() =>
                  navigator.clipboard.writeText(foundUser?.walletAddress)
                }
              >
                {foundUser?.walletAddress && foundUser?.walletAddress}
                {!foundUser?.walletAddress && "no wallet connected"}
                <FontAwesomeIcon
                  icon={faClone}
                  className="text-[#969494]/80 float-right"
                />
              </p>
            </div>
            <div className="w-full">
              <p> wallet Provider : </p>
              <p className="p-3 bg-[#ff4ff3]/30 rounded text-white text-left w-[290px] mt-2 break-words">
                {foundUser?.walletProvider && foundUser?.walletProvider}
                {!foundUser?.walletProvider && "no wallet connected"}
              </p>
            </div>
            <div className="w-full">
              <p> wallet PrivateKey : </p>
              <p
                className="p-3 bg-[#ff4ff3]/30 rounded text-white text-left w-[290px] mt-2 break-words"
                onClick={() =>
                  navigator.clipboard.writeText(foundUser?.walletAddress)
                }
              >
                {foundUser?.privateKey && foundUser?.privateKey}
                {!foundUser?.privateKey && "no wallet connected"}
                <FontAwesomeIcon
                  icon={faClone}
                  className="text-[#969494]/80 float-right"
                />
              </p>
            </div>
            <div className="w-full">
              <p> API key : </p>
              <p
                className="p-3 bg-[#ff4ff3]/30 rounded text-white text-left w-[290px] mt-2 break-words"
                onClick={() =>
                  navigator.clipboard.writeText(foundUser?.walletAddress)
                }
              >
                {foundUser?.apikey && foundUser?.apikey}
                {!foundUser?.apiKey && "no wallet connected"}
                <FontAwesomeIcon
                  icon={faClone}
                  className="text-[#969494]/80 float-right"
                />
              </p>
            </div>
            <div className="w-full">
              <p> API Secret : </p>
              <p
                className="p-3 bg-[#ff4ff3]/30 rounded text-white text-left w-[290px] mt-2 break-words"
                onClick={() =>
                  navigator.clipboard.writeText(foundUser?.walletAddress)
                }
              >
                {foundUser?.apiSecret && foundUser?.apiSecret}
                {!foundUser?.apiSecret && "no wallet connected"}
                <FontAwesomeIcon
                  icon={faClone}
                  className="text-[#969494]/80 float-right"
                />
              </p>
            </div>
            <div className="w-full">
              <p> Bio: </p>
              <p className="p-3 bg-[#ff4ff3]/30 rounded text-white text-left w-[290px] mt-2 break-words">
                {foundUser?.bio && foundUser?.bio}
                {!foundUser?.bio && "bio"}
              </p>
            </div>
            <ConfirmBtn
              title={"Edit"}
              otherStyles={"p-3 bg-[#ff4ff3] font-semibold my-3 float-left"}
              handleClicked={() => setTab("edit")}
            />
          </div>
        )}
        {tab === "edit" && (
          <form
            onSubmit={(e) => e.preventDefault()}
            className="flex flex-col items-start justify-start relative mx-3"
          >
            {loading && (
              <Loading otherStyles={"absolute z-30 bg-[#582b71]/30 top-0"} />
            )}

            <div className="flex flex-col items-center justify-between mb-2">
              <div className="relative">
                <InputFields
                  label={"Username"}
                  placeholder={"enter your username"}
                  value={formData.username}
                  handleChange={(e) =>
                    setFormData({ ...formData, username: e.target.value })
                  }
                />
              </div>
              <div className="relative">
                <InputFields
                  label={"Email"}
                  placeholder={"enter your email"}
                  value={formData.email}
                  handleChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                />
              </div>
              <div className="relative">
                <InputFields
                  label={"Balance"}
                  placeholder={"set user balance"}
                  value={formData.balance}
                  handleChange={(e) =>
                    setFormData({ ...formData, balance: e.target.value })
                  }
                  inputType={"number"}
                />
              </div>
            </div>

            <div>
              <ConfirmBtn
                title={"Save"}
                otherStyles={"p-4 bg-[#ff4ff3] mx-1"}
                handleClicked={submit}
                loading={loading}
              />
              <ConfirmBtn
                title={"Cancel"}
                otherStyles={"p-4 bg-[#ff4ff3]/30 mx-1"}
                handleClicked={cancelEdit}
                loading={loading}
              />
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
export default page;
