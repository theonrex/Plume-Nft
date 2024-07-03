import { createThirdwebClient, getContract, resolveMethod } from "thirdweb";
import { client } from "@/lib/client";
import { chain } from "@/lib/chain";
import { defineChain } from "thirdweb/chains";

/** Change these values to configure the application for your own use. **/
console.log("chain", chain);
export const contract = getContract({
  // The chain object of the chain your contract is deployed to.
  // If that chain isn't in the default list of our SDK, use `defineChain` - for example: defineChain(666666)
  client,
  chain,
  // Your smart contract address (PlumeTestnet on the thirdweb dashboard)
  address: "0x6827410d73dcd6ac7df140a83b8a70c408734256",
});

// The block explorer you want to use (Opens when user clicks on history of events. i.e. transfers)
//0x6827410D73DcD6ac7dF140a83B8A70C408734256
