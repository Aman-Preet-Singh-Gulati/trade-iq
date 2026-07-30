import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  outputFileTracingIncludes: {
    "/*": ["content/blog/**/*", "content/strategies/**/*"],
  },
};

export default nextConfig;
