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
                search: "",
            },{
                protocol: "http",
                hostname: "localhost",
                port: "8055",
                pathname: "/assets/*",
                search: "",
            }
        ],
    },
};

module.exports = nextConfig;
