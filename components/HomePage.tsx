import ContractExtenstion from "./contractExtenstion";
import ThirdwebExtension from "./thirdwebExtension";
import Signin from "./Signin";
import { useActiveAccount } from "thirdweb/react";
import MintNft from "./mintNft";

export default function HomePage() {
  const activeAccount = useActiveAccount();
  console.log("activeAccount", activeAccount);
  return (
    <div className="container mx-auto">
      {activeAccount?.address ? (
        <div>
          <div>
            <ContractExtenstion /> <MintNft />
          </div>{" "}
          <ThirdwebExtension />{" "}
        </div>
      ) : (
        <Signin />
      )}
    </div>
  );
}
