import type { NextConfig } from "next";
import { basePath } from "./src/lib/base";

// The site lives under /workos. Root paths that must keep working (the
// update feed installed copies read, old links) are handled by Vercel
// itself: see vercel.json.

const nextConfig: NextConfig = {
  basePath: "/workos",
};

export default nextConfig;
