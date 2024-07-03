import "@/styles/globals.css";
import "../styles/main.css";
import type { AppProps } from "next/app";
import { ThirdwebProvider } from "thirdweb/react";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <div>
      {" "}
      <ThirdwebProvider>
        <Component {...pageProps} />;
      </ThirdwebProvider>
    </div>
  );
}
