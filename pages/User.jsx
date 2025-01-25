"use client";
import { useDataContext } from "@/components/context/DataProvider";
import ProfileTabs from "@/components/tabcomponent/ProfileTabs";
import Image from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEthereum } from "@fortawesome/free-brands-svg-icons";
import ConfirmBtn from "@/components/loading/ConfirmBtn";
import Loading from "@/components/loading/Loading";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

const User = () => {
  const router = useRouter();
  const { appData, user } = useDataContext();
  const username = user?.username;

  const [myAssets, setMyAssets] = useState([]);
  const [myCollections, setMyCollections] = useState([]);
  const [myAlerts, setMyAlerts] = useState([]);

  function handleNavigate() {
    router.push("/user/editprofile");
  }

  useEffect(() => {
    if (appData) {
      const { assets, collections, notifications } = appData;
      const myAssets = assets.filter(
        (item, i) => item?.owner?.username === username
      );

      const myCollections = collections.filter(
        (item) => item?.owner?.username === username
      );
      const myAlerts = notifications.filter(
        (item) => item?.reciever?.username === username
      );
      setMyAssets(myAssets);
      setMyCollections(myCollections);
      setMyAlerts(myAlerts);
    }
  }, [appData]);

  if (!appData || !user) return <Loading otherStyles={"mx-auto"} />;

  return (
    <div className="w-full min-h-screen">
      <div className="w-full h-96">
        <Image
          src={"/assets/banner.jpg"}
          alt="banner"
          width={3500}
          height={3500}
          className="w-full h-96 opacity-20"
        />
      </div>
      <div className="w-full min-h-40  mx-auto bg-[#281549] flex flex-col sm:flex-row -mt-20 flex-1">
        <div className="-mt-16 w-[320px]  min-h-40 p-2 flex flex-col  items-center">
          <Image
            src={user?.image || "/assets/profilepic.jpg"}
            alt="profile pic"
            width={"1000"}
            height={"1000"}
            className="w-[188px] h-[188px] rounded-full my-2"
          />
          <h3>{username}</h3>
          {user?.walletAddress && (
            <p>
              <FontAwesomeIcon icon={faEthereum} className="text-[#141414]" />{" "}
              <span>{`${(user?.walletAddress).slice(
                0,
                4
              )}...${(user?.walletAddress).slice(-4)}`}</span>{" "}
            </p>
          )}
          {!user?.walletAddress && <p>no wallet connected</p>}
          <p className="my-2 p-1 text-center">
            {" "}
            {user?.bio ? user.bio : "bio"}
          </p>

          <ConfirmBtn
            otherStyles={"mb-2 bg-[#ff4ff3]/50 p-3"}
            title={"edit profile"}
            handleClicked={handleNavigate}
          />
          <ConfirmBtn
            otherStyles={"mb-2 bg-[#ff4ff3]/80 p-3"}
            title={"Create"}
            handleClicked={() => router.push("/user/createCollection")}
          />
        </div>
        <ProfileTabs
          otherStyles={"mt-20"}
          assets={myAssets}
          collections={myCollections}
          activity={myAlerts}
        />
      </div>
    </div>
  );
};
export default User;
