// Import necessary modules and components
import React, { useState, useEffect } from "react";
import { getOwnedNFTs, totalSupply, getNFT } from "thirdweb/extensions/erc721";
import { contract } from "@/consts/parameters";
import Image from "next/image";
// import { connectedAddress } from "@/lib/owner";
// import { getOwnedNFTs } from "thirdweb/extensions/erc721";
import { useSendTransaction, useActiveAccount } from "thirdweb/react";

// Initialize the contract with client, chain, and address

export default function ThirdwebExtension() {
  const activeAccount = useActiveAccount();
  const [nftData, setNftData] = useState([]);
  const [totalSupplyData, setTotalSupplyData] = useState(null);
  const connectedAddress = activeAccount?.address;

  console.log("nftData", nftData);
  console.log("totalSupplyData", totalSupplyData);
  console.log("connectedAddress", connectedAddress);
  console.log("contract", contract);
  const owner = "0x4aef4750c06c4a4677d90bef40971b4c7292d0ac";
  // State to handle loading status
  const [loading, setLoading] = useState(true);

  async function fetchNFTs() {
    try {
      const ownedNfts = await getOwnedNFTs({
        contract,
        owner,
      });

      console.log("ownedNfts", ownedNfts);

      // const totalSupplyResult = await totalSupply({
      //   contract,
      // });
      // const nft = await getNFT({
      //   contract,
      //   tokenId: 1n,
      // });

      // setTotalSupplyData(totalSupplyResult);
      setNftData(ownedNfts);
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

  // Render message if no NFTs are found
  if (nftData?.length === 0) {
    return <div>No NFTs found</div>;
  }

  // Render the list of NFTs
  return (
    <div className="nftData">
      {/* {nftData.map((data, i) => (
        <div key={i} className="nftDataMap">
          <Image
            src={data?.metadata?.image?.replace(
              "ipfs://",
              "https://ipfs.io/ipfs/"
            )}
            alt={`NFT ${data?.metadata?.name}`}
            width={100}
            height={100}
          />
          <div className="nftData">
            <h1>Name: {data?.metadata?.name}</h1>{" "}
            <h2 className="nftData_Date">
              Date:{" "}
              {data?.metadata?.date ? (
                <>
                  <span>
                    {new Date(data.metadata.date).toLocaleDateString()}
                  </span>
                  <span>
                    {new Date(data.metadata.date).toLocaleTimeString()}
                  </span>
                </>
              ) : (
                "Invalid date"
              )}
            </h2>
          </div>
        </div>
      ))} */}
    </div>
  );
}
