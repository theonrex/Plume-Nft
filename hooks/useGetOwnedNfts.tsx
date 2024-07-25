export async function useOwnedNfts(owner: string) {
  const response = await fetch(
    `https://plume-testnet.explorer.caldera.xyz/api/v2/addresses/${owner}/nft/collections?type=ERC-721%2CERC-404%2CERC-1155`
  );
  if (!response.ok) {
    throw new Error("Failed to fetch NFTs");
  }
  const ownedNFTs = await response.json();

  // console.log("owner", owner);
  // console.log("ownedNFTs", ownedNFTs);

  return { ownedNFTs };
}
