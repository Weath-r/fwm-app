/** @type {import('next').NextConfig} */
const nextConfig = {
    output: "standalone",
    images: {
        dangerouslyAllowSVG: true,
        remotePatterns: [
            {
                protocol: "https",
                hostname: "backend.myweathr.com",
                port: "",
                pathname: "/assets/*",
                search: `?v=${process.env.NEXT_PUBLIC_ASSETS_VERSION}`,
            },{
                protocol: "https",
                hostname: "myweathr.com",
                port: "",
                pathname: "/assets/*",
                search: `?v=${process.env.NEXT_PUBLIC_ASSETS_VERSION}`,
            },{
                protocol: "http",
                hostname: "localhost",
                port: "8055",
                pathname: "/assets/*",
                search: `?v=${process.env.NEXT_PUBLIC_ASSETS_VERSION}`,
            },{
                protocol: "http",
                hostname: "localhost",
                port: "3000",
                pathname: "/assets/*",
                search: `?v=${process.env.NEXT_PUBLIC_ASSETS_VERSION}`,
            }
        ],
    },
};

module.exports = nextConfig;
