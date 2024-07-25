import React from "react";
import ConnectWalletButton from "@/components/connectWalletBtn";
import Image from "next/image";
import YellowImage from "../public/images/cisar yellow.png";
import styles from "../styles/signin.module.css";

export default function Signin() {
  return (
    <div className={styles.Signin}>
      <div className={styles.Signin_Img}>
        <Image src={YellowImage} alt="Sign In image" width={600} height={600} />
      </div>
      <div className={styles.SignIn_Detials}>
        <h1>
          MINT <span>3D printed</span>
          <br /> miniature model
        </h1>
        <h3>
          Sign in and mint a miniature NFT to supercharge your testnet campaign
          with extra miles, multipliers, rerolls, and more!
        </h3>
        <ConnectWalletButton />
      </div>
    </div>
  );
}
