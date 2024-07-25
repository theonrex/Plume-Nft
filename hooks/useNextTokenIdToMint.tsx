import { useReadContract } from "thirdweb/react";
import { contract } from "@/consts/parameters";
export function useNextTokenIdToMint() {
  const { data, isLoading } = useReadContract({
    contract,
    method: "function nextTokenIdToMint() view returns (uint256)",
    params: [],
  });

  return { data, isLoading };
}
