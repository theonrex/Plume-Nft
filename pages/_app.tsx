import "@/styles/globals.css";
import "../styles/main.css";
import type { AppProps } from "next/app";
import { ThirdwebProvider } from "thirdweb/react";
import { NavBody } from "@/components/navBar/navBody";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
export default function App({ Component, pageProps }: AppProps) {
  return (
    <div>
      {" "}
      <ThirdwebProvider>
        <NavBody />
        <Component {...pageProps} /> <ToastContainer />
      </ThirdwebProvider>
    </div>
  );
}
