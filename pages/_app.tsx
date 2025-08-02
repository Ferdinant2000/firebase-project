import type { AppProps } from "next/app";
import { useRouter } from "next/router";

import "../styles/globals.css";

import { HeroUIProvider } from "@heroui/system";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import { AuthProvider } from "@/context/AuthContext";

import { fontSans, fontInter } from "@/config/fonts";

export const fonts = {
  sans: fontSans?.style?.fontFamily || "sans-serif",
  inter: fontInter?.style?.fontFamily || "sans-serif",
};

export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter();

  return (
    <HeroUIProvider navigate={router.push}>
      <AuthProvider>
        <NextThemesProvider attribute="class" defaultTheme="system">
          <Component {...pageProps} />
        </NextThemesProvider>
      </AuthProvider>
    </HeroUIProvider>
  );
}
