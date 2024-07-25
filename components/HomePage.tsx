import Signin from "./Signin";
import { useActiveAccount } from "thirdweb/react";
import MintNft from "./mintNft/mintNft";

export default function HomePage() {
  const activeAccount = useActiveAccount();
  console.log("activeAccount", activeAccount);
  return (
    <div className="container ">
      {activeAccount?.address ? (
        <div>
          <MintNft />
        </div>
      ) : (
        <Signin />
      )}
    </div>
  );
}
