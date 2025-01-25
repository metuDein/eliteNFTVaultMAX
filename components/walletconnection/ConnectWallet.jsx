"use client";
import ConfirmBtn from "../loading/ConfirmBtn";
import { useAccount } from "wagmi";
import { useEffect } from "react";

const ConnectWallet = ({ setWalletAddress }) => {
  const { address, isConnected } = useAccount();

  useEffect(() => {
    if (isConnected) {
      setWalletAddress(address);
    }
  }, [address]);

  return (
    <div className="">
      <w3m-button size="sm" />
    </div>
  );
};

export default ConnectWallet;
