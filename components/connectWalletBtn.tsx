// Import necessary components and functions from the thirdweb library
import { ConnectButton } from "thirdweb/react";
import { createWallet } from "thirdweb/wallets";
import { client } from "@/lib/client";
import styles from "../styles/ConnectButton.module.css";
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
        client={client}
        wallets={wallets}
        connectModal={{ size: "wide" }}
      />
    </div>
  );
}

// Export the ConnectWalletButton component as the default export
export default ConnectWalletButton;
