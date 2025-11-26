import mdx from "@next/mdx";

const withMDX = mdx({
  extension: /\.mdx?$/,
});

export default withMDX({
  experimental: {
    mdxRs: true,
  },
  pageExtensions: ["js", "jsx", "mdx"],
});
