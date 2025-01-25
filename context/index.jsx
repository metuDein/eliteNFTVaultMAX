"use client";
import { wagmiAdapter, projectId } from "@/config";
import { createAppKit } from "@reown/appkit";
import { mainnet, arbitrum, sepolia } from "@reown/appkit/networks";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import React from "react";
import { cookieToInitialState, WagmiProvider } from "wagmi";

const queryClient = new QueryClient();

if (!projectId) {
  throw new Error("Project is is not defined");
}

const metadata = {
  name: "elitenftvault",
  description: "Purchase and Sell NFTs",
  url: "https://www.elitenftvault.pro", // origin must match your domain & subdomain
  icons: [
    "https://www.elitenftvault.pro/_next/image?url=%2Fassets%2Flogo.png&w=640&q=75",
  ],
};

const modal = createAppKit({
  adapters: [wagmiAdapter],
  projectId,
  networks: [mainnet, arbitrum, sepolia],
  defaultNetwork: mainnet,
  features: {
    analytics: true,
    email: false,
    socials: false,
  },
  themeMode: "dark",
});

function ContextProvider({ children, cookies }) {
  const initialState = cookieToInitialState(wagmiAdapter.wagmiConfig, cookies);

  return (
    <WagmiProvider
      config={wagmiAdapter.wagmiConfig}
      initialState={initialState}
    >
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    </WagmiProvider>
  );
}

export default ContextProvider;
