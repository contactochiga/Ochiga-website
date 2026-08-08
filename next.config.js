/** @type {import('next').NextConfig} */
const nextConfig = {
  async redirects() {
    return [
      { source: "/technology", destination: "/oyi", permanent: true },
      { source: "/infrastructure", destination: "/development", permanent: true },
      { source: "/architecture", destination: "/development/approach", permanent: true },
      { source: "/solutions", destination: "/development/approach", permanent: true },
      { source: "/governance", destination: "/about#trust", permanent: true },
      { source: "/trust", destination: "/about#trust", permanent: true },
      { source: "/engage", destination: "/partnerships/professional", permanent: true },
      { source: "/command-center", destination: "/oyi", permanent: true },
      { source: "/twin", destination: "/oyi", permanent: true },
      { source: "/console", destination: "/oyi", permanent: true },
      { source: "/papers", destination: "/insights", permanent: true },
      { source: "/papers/:slug", destination: "/insights/:slug", permanent: true },
    ];
  },
};

module.exports = nextConfig;
