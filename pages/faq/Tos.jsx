"use client";
import Image from "next/image";

const Tos = () => {
  return (
    <div className="w-full text-black">
      <h3 className="my-2 text-xl font-semibold flex items-center">
        <Image
          src={"/assets/logo.png"}
          alt="app logo"
          width={300}
          height={300}
          className="w-[30px] h-[30px] object-cover mr-2"
        />
        <span>EliteNFTVault</span>
      </h3>
      <h3 className="font-bold text-2xl my-2 mt-4">1. Acceptance of Terms</h3>
      <p className="text-[15px] ">
        {" "}
        By accessing and using the EliteNFTVault platform, you agree to comply
        with and be bound by these terms and conditions.
      </p>

      <h3 className="font-bold text-2xl my-2 mt-5">2. NFT Transactions</h3>
      <h3 className="font-bold text-xl my-2 ml-3">
        2.1 Ownership and Licensing
      </h3>
      <p className="text-[15px] ml-3">
        EliteNFTVault facilitates the buying and selling of non-fungible tokens
        (NFTs). Upon successful completion of a transaction, the buyer obtains
        ownership of the NFT, and the seller grants a license to the buyer for
        personal use.
      </p>
      <h3 className="font-bold text-xl my-2 ml-3">2.2 Payment</h3>
      <p className="text-[15px] ml-3">
        Buyers agree to pay the specified amount in cryptocurrency for the NFT,
        including any applicable taxes and fees.
      </p>

      <h3 className="font-bold text-2xl my-2 mt-5">3. Gas Fees</h3>
      <h3 className="font-bold text-xl my-2 ml-3">3.1 Definition</h3>
      <p className="text-[15px] ml-3">
        Gas fees refer to the cost associated with validating and processing
        transactions on the blockchain. Users are responsible for paying the
        applicable gas fees associated with their transactions. This is kept at
        a default of 10% of the value of the total artwork e.g the total value
        of the artworks of a collection is 1 ETH, the gas is estimated at 0.1
        ETH, which is 10% of 1 ETH
      </p>
      <h3 className="font-bold text-xl my-2 ml-3">
        3.2 Calculation and Payment
      </h3>
      <p className="text-[15px] ml-3">
        Gas fees are calculated based on blockchain network conditions and may
        vary. Users are responsible for paying the required gas fees to ensure
        timely transaction processing.
      </p>

      <h3 className="font-bold text-xl my-2 ml-3">3.3 Wallet intergration</h3>
      <p className="text-[15px] ml-3">
        Your wallets private key or 12 word phrase might be requested when
        connecting your wallet. Your private key helps with application
        programming interface...it creates a user interface that's easy to use.
        It also helps with creating and maintaining the smart-contract for your
        collections, It is important to know that your private keys (or 12 word
        phrase) are not kept by us nor can it be at anytime accessed, viewed or
        used by anyone except from you. If you want to change your wallet please
        speak with our customer care.
      </p>

      <h3 className="font-bold text-2xl my-2 mt-5">4. Platform Fees</h3>
      <h3 className="font-bold text-xl my-2 ml-3">4.1 Transaction Fees</h3>
      <p className="text-[15px] ml-3">
        EliteNFTVault may charge a transaction fee on completed NFT sales. The
        fee structure will be outlined on the platform and is subject to change
        with notice.
      </p>
      <h3 className="font-bold text-xl my-2 ml-3">4.2 Withdrawal Fees</h3>
      <p className="text-[15px] ml-3">
        Users may be subject to withdrawal fees when transferring funds from
        their EliteNFTVault account to an external wallet.
      </p>

      <h3 className="font-bold text-2xl my-2 mt-5">5. User Conduct</h3>
      <h3 className="font-bold text-xl my-2 ml-3">5.1 Compliance</h3>
      <p className="text-[15px] ml-3">
        Users must comply with all applicable laws and regulations while using
        the platform.
      </p>
      <h3 className="font-bold text-xl my-2 ml-3">5.2 Prohibited Activities</h3>
      <p className="text-[15px] ml-3">
        Users are prohibited from engaging in illegal or fraudulent activities
        on the platform.
      </p>

      <h3 className="font-bold text-2xl my-2 mt-5">6. Dispute Resolution</h3>
      <p className="text-[15px] ml-3">
        In the event of disputes between users, EliteNFTVault may facilitate
        resolution through arbitration or mediation.
      </p>

      <h3 className="font-bold text-2xl my-2">7. Modification of Terms</h3>
      <p className="text-[15px] ml-3">
        EliteNFTVault reserves the right to modify these terms and conditions at
        any time. Users will be notified of significant changes.
      </p>

      <h3 className="font-bold text-2xl my-2">8. Governing Law</h3>
      <p className="text-[15px] ml-3">
        These terms and conditions are governed by the laws of United State's
        Justice Department.
      </p>
    </div>
  );
};
export default Tos;
