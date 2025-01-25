"use client";
import Tabs from "@/components/tabcomponent/Tabs";
const page = () => {
  return (
    <div className="w-full min-h-screen p-2 flex flex-col">
      <div className="mx-auto">
        <Tabs />
      </div>
      <div className="grid grid-cols-3 gap-5 justify-items-center"></div>
    </div>
  );
};
export default page;
