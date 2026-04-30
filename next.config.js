/** @type {import('next').NextConfig} */
const nextConfig = {
    output: "standalone",
    allowedDevOrigins: ["192.168.68.105"],
    images: {
        dangerouslyAllowSVG: true,
        remotePatterns: [
            {
                protocol: "https",
                hostname: "backend.myweathr.com",
                port: "",
                pathname: "/assets/*",
                search: `?v=${process.env.NEXT_PUBLIC_ASSETS_VERSION}`,
            },
            {
                protocol: "https",
                hostname: "myweathr.com",
                port: "",
                pathname: "/assets/*",
                search: `?v=${process.env.NEXT_PUBLIC_ASSETS_VERSION}`,
            },
            {
                protocol: "http",
                hostname: "localhost",
                port: "8055",
                pathname: "/assets/*",
                search: `?v=${process.env.NEXT_PUBLIC_ASSETS_VERSION}`,
            },
            {
                protocol: "http",
                hostname: "localhost",
                port: "3000",
                pathname: "/assets/*",
                search: `?v=${process.env.NEXT_PUBLIC_ASSETS_VERSION}`,
            },
        ],
        localPatterns: [
            {
                pathname: "/api/**",
            },
            {
                pathname: "/assets/**",
            },
        ],
    },
};

// eslint-disable-next-line no-undef
module.exports = nextConfig;
