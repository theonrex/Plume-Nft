import React from "react";
import ConnectWalletButton from "@/components/connectWalletBtn";
import Image from "next/image";

export default function Signin() {
  return (
    <div className="Signin">
      <div className="Signin_Img">
        <Image
          src={
            "https://ipfs.io/ipfs/bafybeibj2cpzl3xae752fpwz445cjbhujsycv7lzgralz5vibtp6dftbmu/1.png"
          }
          alt="Sign In image"
          width={600}
          height={600}
        />
      </div>
      <div className="ConnectWalletButton">
        <h1>MINT YOUR PlumeApe GOON</h1>
        <h3>
          Sign in and mint a PlumeApe  NFT to supercharge your
          testnet campaign with extra miles, multipliers, rerolls, and more!
        </h3>
        <ConnectWalletButton />
      </div>
    </div>
  );
}
