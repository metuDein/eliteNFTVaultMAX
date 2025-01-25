"use client";
import { useDataContext } from "@/components/context/DataProvider";
import Loading from "@/components/loading/Loading";
import { redirect } from "next/navigation";
import AdminTabs from "@/components/tabcomponent/AdminTabs";
import { useState, useEffect } from "react";
import UserCard from "@/components/NFtcards/UserCard";
import CollectionCard from "@/components/NFtcards/CollectionCard";
import AdminAssets from "@/components/NFtcards/AdminAssets";
import MessageCard from "@/components/message/MessageCard";

const page = () => {
  const [recentUsers, setRecentUsers] = useState(null);
  const [recentCollection, setRecentCollections] = useState(null);
  const [recentMsg, setRecentMsg] = useState(null);
  const [recentAsset, setRecentAssets] = useState(null);
  const { appLoading, user, appData } = useDataContext();
  const { users, assets, collections, notifications } = appData;

  useEffect(() => {
    if (appData) {
      const recentusers = [...users].slice(-3);
      const recentassets = [...assets].slice(-3);
      const recentcollections = [...collections].slice(-3);
      const recentmsg = [...notifications].slice(-3);

      setRecentAssets(recentassets);
      setRecentCollections(recentcollections);
      setRecentUsers(recentusers);
      setRecentMsg(recentmsg);
    }
  }, [appData]);

  if (appLoading && !appData?.user)
    return (
      <div className="flex items-center justify-center w-full min-h-screen">
        {" "}
        <Loading />{" "}
      </div>
    );

  if (!user) {
    return redirect("/login");
  }
  if (user && user?.roles?.Admin !== 5150) {
    return redirect("/user");
  }

  return (
    <div className="w-full min-h-screen pt-[75px] mb-6 p-2 mx-auto">
      <section className="min-h-1">
        <AdminTabs />
      </section>
      {recentUsers && (
        <section className="min-h-[600px] w-full p-2">
          <h2 className=" my-1 sm:my-3 font-semibold text-white text-center">
            Recent users
          </h2>
          <div className="w-full p-1 min-h-[200px] mt-2 sm:mt-5 grid grid-cols-1 sm:grid-cols-3 gap-1 sm:gap-5 justify-items-start mx-auto">
            {[...recentUsers].reverse().map((item, index) => (
              <UserCard
                data={item}
                index={index}
                key={item._id}
                link={`/admin/editUser/${item._id}`}
              />
            ))}
          </div>
        </section>
      )}
      {recentCollection && (
        <section className="min-h-[600px] w-full p-2">
          <h2 className=" my-1 sm:my-3 font-semibold text-white text-center">
            Recent collections
          </h2>
          <div className="w-full p-1 min-h-[200px] mt-2 sm:mt-5 grid grid-cols-1 sm:grid-cols-3 gap-1 sm:gap-5 justify-items-center mx-auto">
            {[...recentCollection].reverse().map((item, index) => (
              <CollectionCard
                data={item}
                index={index}
                link={`/admin/editCollection/${item?._id}`}
                key={item._id}
              />
            ))}
          </div>
        </section>
      )}
      {recentAsset && (
        <section className="min-h-[600px] w-full p-2">
          <h2 className=" my-1 sm:my-3 font-semibold text-white text-center">
            Recent assets
          </h2>
          <div className="w-full p-1 min-h-[200xp] mt-2 sm:mt-5 grid grid-cols-1 sm:grid-cols-3 gap-1 sm:gap-5 justify-items-center mx-auto">
            {[...recentAsset].reverse().map((item, index) => (
              <AdminAssets
                data={item}
                index={index}
                link={`/admin/editAsset/${item?._id}`}
                key={item._id}
              />
            ))}
          </div>
        </section>
      )}
      {recentMsg && (
        <section className="min-h-[600px] w-full p-2">
          <h2 className=" my-1 sm:my-3 font-semibold text-white text-center">
            Recent messages
          </h2>
          <div className="w-full p-1 min-h-[200px] mt-2 sm:mt-5 grid grid-cols-1 sm:grid-cols-3 gap-1 sm:gap-5 justify-items-start mx-auto">
            {[...recentMsg].reverse().map((item, index) => (
              <MessageCard
                data={item}
                link={`/admin/message/${item?._id}`}
                key={item._id}
              />
            ))}
          </div>
        </section>
      )}
    </div>
  );
};
export default page;
