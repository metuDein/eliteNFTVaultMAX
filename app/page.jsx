"use client";
import Image from "next/image";
import Carousel from "@/components/sample/Carousel";
import ConfirmBtn from "@/components/loading/ConfirmBtn";
import SectionSecond from "@/components/hompage/SectionSecond";
import HomeTab from "@/components/tabcomponent/HomeTab";
import SellerSection from "@/components/hompage/SellerSection";
import StepsSection from "@/components/hompage/StepsSection";
import { useRouter } from "next/navigation";
import { useDataContext } from "@/components/context/DataProvider";

export default function Home() {
  const router = useRouter();
  const { user } = useDataContext();

  return (
    <div className="min-h-screen w-full p-2 font-[family-name:var(--font-dm-sans)]">
      <main className="flex flex-col items-center justify-center">
        <section className="max-w-4xl min-h-screen w-full flex flex-col-reverse sm:flex-row items-start justify-between my-10">
          <div className="sm:mr-5 self-center mt-10">
            <h2 className="text-[30px] sm:text-[35px] font-semibold mb-3 text-center sm:text-left">
              {" "}
              CREATE NFTS{" "}
              <Image
                src={"/assets/greet.jpg"}
                alt="home image"
                width={500}
                height={500}
                className="w-[44px] inline"
              />{" "}
              <br />
              ARTWORKS AND SELL
            </h2>
            <p className="[299px] text-[14px] text-center sm:text-left">
              Your ultimate destination for securing, showcasing, and exploring
              the world of premium NFTs. Unlock the future of digital ownership
              today!
            </p>

            {!user?.username && (
              <ConfirmBtn
                title={"Get Started"}
                otherStyles={
                  "p-3 bg-gradient-to-r from-[#843eff] to-[#fe4ff2] rounded-[10px] w-full sm:w-[140px] mt-5 text-[16px] font-semibold mx-auto sm:mx-0 self-center"
                }
                handleClicked={() => router.push("/register")}
              />
            )}
          </div>
          <div className="mx-auto sm:mx-0 mt-4 sm:mt-0">
            <Carousel />
          </div>
          {/* site stats */}
          <div></div>
        </section>
        {/* second section */}
        <section className="max-w-4xl min-h-screen w-full flex flex-col sm:flex-row items-start justify-between sm:my-10">
          <div className="p-1 sm:flex hidden flex-1 min-h-[350px] mx-auto w-full">
            <SectionSecond />
          </div>
          <div className="mr-5">
            <h3 className="text-[35px] font-semibold mb-3 sm:text-left text-center">
              High Quality Assets
            </h3>
            <p className="w-[299px] text-center sm:text-left">
              Discover boundless creativity on EliteNFTVault an exclusive NFT
              platform where visionary artists tokenize their exceptional works.
              <br />
              <br />
              Immerse yourself in a world of digital art, where every
              masterpiece is uniquely crafted on the Ethereum blockchain,
              creating a decentralized gallery of unparalleled beauty and
              innovation.
            </p>

            <ConfirmBtn
              title={"Explore"}
              otherStyles={
                "p-3 bg-gradient-to-r from-[#843eff] to-[#fe4ff2] rounded-[10px] w-full sm:w-[250px] mt-5 text-[16px] font-semibold self-center"
              }
              handleClicked={() => router.push("/marketplace/explore")}
            />
          </div>
        </section>
        {/* third section */}
        <section className="max-w-4xl min-h-screen w-full flex flex-col items-start justify-between sm:my-10">
          <div className="mx-auto">
            <h3 className="text-[35px] font-semibold mb-3 text-center">
              Our lastest NFT Assets
            </h3>
            <p className="text-center">
              Our latest NFTs collection enables makers with open and safe
              devices. The world fastest growing commercial center for crypto
              collectibles and non-fungible tokens.
            </p>
          </div>
          <div className="mx-auto mt-10">
            <HomeTab />
            {/* <SectionSecond /> */}
          </div>
        </section>
        {/* fourth section */}
        <section className="max-w-4xl min-h-screen w-full flex flex-col items-start justify-between my-10">
          <div className="mx-auto">
            <h3 className="text-[35px] font-semibold mb-3 text-center">
              Top Traders
            </h3>
          </div>
          <div className="mx-auto mt-10">
            <SellerSection />
          </div>
        </section>
        {/* Fifth section */}
        <section className="max-w-4xl min-h-screen w-full flex flex-col sm:flex-row items-start justify-between my-10">
          <div className="mr-5">
            <h3 className="text-[35px] font-semibold mb-3">
              Create and Sell Now
            </h3>
            <p className="w-[299px]">
              Easily create your NFTs, customized solution to assist you make
              you make in meeting it’s goals, make your NFTs availble to the
              marketplace in four easy steps
            </p>

            <ConfirmBtn
              title={"Create"}
              otherStyles={
                "p-3 bg-gradient-to-r from-[#843eff] to-[#fe4ff2] rounded-[10px] w-[250px] mt-5 text-[16px] font-semibold"
              }
              handleClicked={() => router.push("/user/createCollection")}
            />
          </div>
          <div className=" mt-3 sm:mt-0">
            <StepsSection />
          </div>
        </section>
      </main>
    </div>
  );
}
