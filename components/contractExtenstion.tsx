// Import necessary modules and components
import React, { useState, useEffect } from "react";
import { contract } from "@/consts/parameters";
import {
  owner,
  name,
  symbol,
} from "@/thirdweb/161221135/0x6827410d73dcd6ac7df140a83b8a70c408734256";

// Define the contractExtenstion component
export default function ContractExtenstion() {
  // State to hold NFT data and total supply
  const [contractOwnerData, setContractOwnerData] = useState(null);
  const [contractSymbol, setContractSymbol] = useState(null);
  const [contractName, setContractName] = useState(null);
  console.log("contractOwnerData", contractOwnerData);
  // State to handle loading status
  const [loading, setLoading] = useState(true);

  // Function to fetch NFTs and total supply from the contract
  async function fetchNFTs() {
    try {
      const ownerData = await owner({
        contract,
      });

      const contractSymbol = await symbol({ contract });
      const contractName = await name({ contract });

      setContractName(contractName);
      setContractSymbol(contractSymbol);
      setContractOwnerData(ownerData);

      // const ownedNFTs = useReadContract(getOwnedNFTs, {
      //   contract,
      //   address: "0xBBb175Fb03D5324265d064271Ad977f52083358D",
      // });
    } catch (error) {
      // Log any errors during the fetch
      console.error("Error fetching NFTs:", error);
    } finally {
      // Set loading to false after fetch is complete
      setLoading(false);
    }
  }

  // useEffect hook to fetch NFTs when the component mounts
  useEffect(() => {
    fetchNFTs();
  }, []);

  // Render loading state
  if (loading) {
    return <div>Loading...</div>;
  }

  // Render the list of NFTs
  return (
    <div className="ContractExtenstion">
      <h2>Contract Name : {contractName}</h2>
      <h2>Contract Symbol : {contractSymbol}</h2>
      <h2>Contract Owner : {contractOwnerData}</h2>
    </div>
  );
}
