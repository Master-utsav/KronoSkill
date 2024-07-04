/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
      remotePatterns: [
        {
          protocol: 'https',
          hostname: 'images.unsplash.com',
          pathname: '**'
        },
        {
          protocol: 'https',
          hostname: 'yt3.ggpht.com',
          pathname: '**'
        },
        {
          protocol: 'https',
          hostname: 'i.ytimg.com',
          pathname: '**'
        }
      ],
    },
    reactStrictMode: false,
  };
  
  export default nextConfig;
  