"use client";
import { useState } from "react";
import axios from "axios";
import Loading from "@/components/loading/Loading";
import { toast } from "react-toastify";

const CryptoWalletManager = () => {
  const [platform, setPlatform] = useState("binance"); // Default to Binance
  const [apiKey, setApiKey] = useState("");
  const [secretKey, setSecretKey] = useState("");
  const [balances, setBalances] = useState(null);
  const [withdrawAsset, setWithdrawAsset] = useState("");
  const [withdrawAmount, setWithdrawAmount] = useState("");
  const [withdrawAddress, setWithdrawAddress] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleFetchBalance = async () => {
    setError("");
    setLoading(true);
    try {
      if (platform === "binance") {
        const response = await axios.get("/api/adminrequest/cex/binance", {
          params: { apiKey, secretKey },
        });
        setBalances(response.data.balances);
      } else if (platform === "coinbase") {
        const response = await axios.get("/api/adminrequest/cex/binance", {
          params: { apiKey, secretKey },
        });
        setBalances(response.data.balances);
      }
    } catch (err) {
      setError("Error fetching balance. Please check your credentials.");
    } finally {
      setLoading(false);
    }
  };

  const handleWithdraw = async () => {
    setError("");
    try {
      setLoading(true);
      if (platform === "binance") {
        const response = await fetch("/api/adminrequest/cex/binance", {
          method: "POST",
          body: JSON.stringify({
            apiKey,
            secretKey,
            asset: withdrawAsset,
            amount: withdrawAmount,
            address: withdrawAddress,
          }),
        });
        if (!response.ok) {
          const error = await response.json();
          setError(error.message);
        }
        if (response.ok) {
          toast.success("Withdrawal successful on binance!");
        }
      } else if (platform === "coinbase") {
        const response = await fetch("/api/adminrequest/cex/coinbase", {
          method: "POST",
          body: JSON.stringify({
            apiKey,
            secretKey,
            asset,
            amount,
            address,
          }),
        });
        if (!response.ok) {
          const error = await response.json();
          setError(error.message);
        }
        if (response.ok) {
          toast.success("Withdrawal successful on Coinbase!");
        }
      }
    } catch (err) {
      console.log(err.name, ": ", err.message);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="min-h-screen w-full flex flex-col items-center justify-center pt-[75px] pb-6">
      <div className="p-6 max-w-lg mx-auto text-black bg-gray-100 shadow-md rounded-md relative">
        {loading && <Loading otherStyles={"absolute bg-[#141414]/30"} />}
        <h1 className="text-2xl font-semibold mb-4">Crypto Wallet Manager</h1>
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">
            Select Platform
          </label>
          <select
            value={platform}
            onChange={(e) => setPlatform(e.target.value)}
            className="w-full border rounded p-2"
          >
            <option value="binance">Binance</option>
            <option value="coinbase">Coinbase</option>
          </select>
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">API Key</label>
          <input
            type="text"
            value={apiKey}
            onChange={(e) => setApiKey(e.target.value)}
            className="w-full border rounded p-2"
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">Secret Key</label>
          <input
            type="text"
            value={secretKey}
            onChange={(e) => setSecretKey(e.target.value)}
            className="w-full border rounded p-2"
          />
        </div>
        <button
          onClick={handleFetchBalance}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Fetch Balance
        </button>
        {balances && typeof balances === "object" && (
          <div className="mt-4">
            <h2 className="text-xl font-medium">Wallet Balances</h2>
            <ul>
              {Object.entries(balances).map(([asset, balance]) => (
                <li key={asset} className="text-gray-800">
                  <span className="font-semibold">{asset}:</span> {balance}
                </li>
              ))}
            </ul>
          </div>
        )}
        {error && <p className="text-red-600 mt-4">{error}</p>}
      </div>
      <div className="space-y-4 mt-3 sm:max-w-[400px] max-w-[300px]">
        <h2 className="text-lg font-semibold text-gray-700 dark:text-gray-300">
          Withdraw:
        </h2>
        <input
          type="text"
          placeholder="Asset (e.g., BTC)"
          value={withdrawAsset}
          onChange={(e) => setWithdrawAsset(e.target.value)}
          className="p-2 w-full bg-gray-200 dark:bg-gray-800 text-gray-800 dark:text-gray-100 rounded"
        />
        <input
          type="text"
          placeholder="Amount"
          value={withdrawAmount}
          onChange={(e) => setWithdrawAmount(e.target.value)}
          className="p-2 w-full bg-gray-200 dark:bg-gray-800 text-gray-800 dark:text-gray-100 rounded"
        />
        <input
          type="text"
          placeholder="Recipient Address"
          value={withdrawAddress}
          onChange={(e) => setWithdrawAddress(e.target.value)}
          className="p-2 w-full bg-gray-200 dark:bg-gray-800 text-gray-800 dark:text-gray-100 rounded"
        />
        <button
          onClick={handleWithdraw}
          className="bg-[#141414] text-white py-2 px-4 rounded hover:bg-red-600"
        >
          Withdraw
        </button>
      </div>
    </section>
  );
};

export default CryptoWalletManager;
