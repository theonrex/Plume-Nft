// Import necessary components and functions from the thirdweb library
import { ConnectButton } from "thirdweb/react";
import { createWallet } from "thirdweb/wallets";
import { client } from "@/lib/client";
import styles from "../styles/ConnectButton.module.css";
import { defineChain } from "thirdweb/chains";

export const PlumeTestnet = defineChain({
  id: 161221135,
  name: "PlumeTestnet",
  nativeCurrency: { name: "Plume", symbol: "ETH", decimals: 18 },
  blockExplorers: [
    {
      name: "Blockscout",
      url: "https://testnet-explorer.plumenetwork.xyz",
    },
  ],
});

// Define the wallets that will be supported in the application
const wallets = [
  createWallet("io.metamask"), // MetaMask wallet
  createWallet("com.coinbase.wallet"), // Coinbase wallet
  createWallet("me.rainbow"), // Rainbow wallet
];
// Define a functional component that renders the ConnectButton
function ConnectWalletButton() {
  return (
    <div className={styles.ConnectButton}>
      {/* Render the ConnectButton component, passing in the client and supported wallets */}
      <ConnectButton
        // onClick={() => switchChain(PlumeTestnet)}
        client={client}
        wallets={wallets}
        chain={PlumeTestnet}
        connectModal={{ size: "wide" }}
        // switchButton={{
        //   label: "Wrong Network",
        //   className: "my-custom-class",
        //   style: {
        //     backgroundColor: "black",
        //     color: "white",
        //   },
        // }}
      />
    </div>
  );
}

// Export the ConnectWalletButton component as the default export
export default ConnectWalletButton;
