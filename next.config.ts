import type { NextConfig } from "next";
const config: NextConfig = {
  distDir: process.env.NODE_ENV === "development" ? ".next-dev" : ".next",
  poweredByHeader: false,
  serverExternalPackages: ["pdfjs-dist"],
  outputFileTracingIncludes: {
    "/mock-tests/class-11/physics": ["./content/mock-questions/**/*.json"],
    "/mock-tests/class-11/physics/*": ["./content/mock-questions/**/*.json"],
    "/api/mock-tests": ["./content/mock-questions/**/*.json"],
    "/api/mock-tests/*": ["./content/mock-questions/**/*.json"],
    "/api/mock-practice": ["./content/mock-questions/**/*.json"],
    "/api/mock-practice/*": ["./content/mock-questions/**/*.json"],
  },
  outputFileTracingExcludes: {
    "*": ["./.gnosis-mock-data/**/*", "./tmp/**/*"],
  },
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          { key: "X-Frame-Options", value: "SAMEORIGIN" },
        ],
      },
    ];
  },
};
export default config;
