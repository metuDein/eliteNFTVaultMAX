import {
  faUserPlus,
  faWallet,
  faFolderOpen,
  faFileImage,
} from "@fortawesome/free-solid-svg-icons";

import StepsCard from "../NFtcards/StepsCard";
const StepsSection = () => {
  return (
    <div className="grid grid-cols-2 gap-3 sm:gap-10">
      <StepsCard
        icon={faUserPlus}
        title={"Create your Account"}
        body={"register for an account, if you don't have one already."}
      />
      <StepsCard
        icon={faWallet}
        title={"Setup your wallet"}
        body={"connect an crypto wallet to your account"}
      />
      <StepsCard
        icon={faFolderOpen}
        title={"Create a Collection"}
        body={"Head over to your dashboard and create a collection"}
      />
      <StepsCard
        icon={faFileImage}
        title={"Create your Assets"}
        body={
          "add assets to your collection and they will be available to your buyers "
        }
      />
    </div>
  );
};
export default StepsSection;
