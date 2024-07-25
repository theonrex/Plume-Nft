import { useReadContract } from "thirdweb/react";
import { contract } from "@/consts/parameters";

interface TokenuriParams {
  NextTokenIdToMint?: number;
}

export function useTokenuri({ NextTokenIdToMint = 0 }: TokenuriParams = {}) {
  const _tokenId = NextTokenIdToMint.toString();
  const { data, isLoading } = useReadContract({
    contract,
    method: "function tokenURI(uint256 _tokenId) view returns (string)",
    params: [BigInt(_tokenId)],
  });

  return { data, isLoading };
}
