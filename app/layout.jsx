import { Geist, Geist_Mono, DM_Sans } from "next/font/google";
import "./globals.css";
import Header from "@/components/navigation/Header";
import Footer from "@/components/navigation/Footer";
import { headers } from "next/headers";
import ContextProvider from "@/context";
import Provider from "@/components/context/Provider";
import { DataProvider } from "@/components/context/DataProvider";
import Script from "next/script";
import { ToastContainer } from "react-toastify";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
  weight: ["400", "500", "700"], // Specify weights as needed
});

export const metadata = {
  metadataBase: new URL("https://www.elitenftvault.pro"),
  title: "EliteNFTVault | Exclusive NFT Collectibles",
  description:
    "EliteNFTVault is your gateway to premium digital collectibles. Discover, trade, and showcase exclusive NFTs. ",
  alternates: {
    canonical: "https://www.elitenftvault.pro",
    languages: {
      "en-US": "/en-US",
    },
  },

  openGraph: {
    type: "website",
    url: "https://www.elitenftvault.pro",
    title: "EliteNFTVault | Exclusive NFT Collectibles",
    description:
      "EliteNFTVault is your gateway to premium digital collectibles. Discover, trade, and showcase exclusive NFTs in a secure and luxurious environment tailored for collectors and creators alike.",
    images: [
      {
        url: "/favicon-32x32.png",
        width: 800,
        height: 600,
        alt: "logo",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "EliteNFTVault | Exclusive NFT Collectibles",
    description:
      "EliteNFTVault is your gateway to premium digital collectibles. Discover, trade, and showcase exclusive NFTs in a secure and luxurious environment tailored for collectors and creators alike.",
    images: ["/apple-touch-icon.png"],
  },
  icons: {
    icon: ["/apple-touch-icon.png?.v=2"],
    apple: ["/apple-touch-icon.png?.v=1"],
    shortcut: ["/apple-touch-icon.png"],
  },
  manifest: "/site.webmanifest",
};

export default async function RootLayout({ children }) {
  const cookieHeaders = await headers();
  const cookies = cookieHeaders.get("cookie");
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ContextProvider cookies={cookies}>
          <Provider>
            <DataProvider>
              <Header />
              {children}
              <Footer />
              <ToastContainer />
            </DataProvider>
          </Provider>
        </ContextProvider>
        {/* <!--Start of Tawk.to Script--> */}
        {/* <Script
          src="https://embed.tawk.to/6794d2f5825083258e0afe9a/1iielg4e8"
          strategy="lazyOnload"
          onLoad={() => console.log("Tawk.to script loaded successfully")}
        /> */}
        <script src="https://embed.tawk.to/6794d2f5825083258e0afe9a/1iielg4e8"></script>
      </body>
    </html>
  );
}
