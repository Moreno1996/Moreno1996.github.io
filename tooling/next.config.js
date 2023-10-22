/** @type {import('next').NextConfig} */

const is_build = true;

let assetPrefix = "";
let basePath = "";

if (is_build) {
  // trim off `<owner>/`
  const repo = "";
  assetPrefix = `/`;
  basePath = ``;
  distDir= "../docs";
}
const nextConfig = {
  reactStrictMode: true,
  distDir,
  output: "export",
  assetPrefix: assetPrefix,
  basePath: basePath,
};

module.exports = nextConfig;
