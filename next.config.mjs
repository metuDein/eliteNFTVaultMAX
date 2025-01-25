/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: "https",
                hostname: "res.cloudinary.com",
                port: "",
                pathname: "/dxrxrbo8c/**", // Adjust to your Cloudinary folder structure
            },
            {
                protocol: "http",
                hostname: "res.cloudinary.com",
                port: "",
                pathname: "/dxrxrbo8c/**", // Same path for http
            },
        ],
    },
};

export default nextConfig;