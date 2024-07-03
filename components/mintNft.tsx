import React from "react";
import { useSendTransaction, useActiveAccount } from "thirdweb/react";
import { claimTo } from "thirdweb/extensions/erc721";
import { contract } from "@/consts/parameters";

export default function MintNft() {
  const activeAccount = useActiveAccount();
  const { mutate: sendTransaction } = useSendTransaction();
  const toAddress = activeAccount?.address;
  console.log("toAddress ", toAddress);

  const mintNft = () => {
    if (toAddress) {
      const transaction = claimTo({
        contract,
        to: toAddress,
        quantity: BigInt(1), // Convert to bigint
      });
      sendTransaction(transaction);
    } else {
      console.error("toAddress is undefined");
    }
  };

  return (
    <div>
      <button onClick={mintNft}>Mint NFT</button>
    </div>
  );
}
