/** @type {import('next').NextConfig} */
const nextConfig = {
  async redirects() {
    return [
      // /technology used to alias the old /oyi page; /technology is now
      // the real corporate route, so /oyi redirects here instead (kept
      // for backward compatibility with anything already linking to it).
      { source: "/oyi", destination: "/technology", permanent: true },
      // The membership form now lives inline on /private (#membership),
      // matching the Technology page's #deployment pattern — kept for
      // backward compatibility with anything already linking here.
      { source: "/private/membership", destination: "/private#membership", permanent: true },
      { source: "/infrastructure", destination: "/development", permanent: true },
      { source: "/architecture", destination: "/development/approach", permanent: true },
      { source: "/solutions", destination: "/development/approach", permanent: true },
      { source: "/governance", destination: "/about#trust", permanent: true },
      { source: "/trust", destination: "/about#trust", permanent: true },
      { source: "/engage", destination: "/partnerships/professional", permanent: true },
      { source: "/command-center", destination: "/technology", permanent: true },
      { source: "/twin", destination: "/technology", permanent: true },
      { source: "/console", destination: "/technology", permanent: true },
      { source: "/papers", destination: "/insights", permanent: true },
      { source: "/papers/:slug", destination: "/insights/:slug", permanent: true },
    ];
  },
};

module.exports = nextConfig;
