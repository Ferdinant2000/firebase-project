import React from "react";
import NextHead from "next/head";

// import { siteConfig } from "@/config/site";

export const Head = () => {
  return (
    <NextHead>
      <title>Form with Firebase</title>
      <meta key="title" property="og:title" />
      <meta property="og:description" />
      <meta name="description" />
      <meta
        key="viewport"
        content="viewport-fit=cover, width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0"
        name="viewport"
      />
      <link href="/favicon.ico" rel="icon" />
    </NextHead>
  );
};
