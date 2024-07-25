import { useReadContract } from "thirdweb/react";
import { contract } from "@/consts/parameters";
export function useBalanceOf(owner: string) {
  const { data, isLoading } = useReadContract({
    contract,
    method: "function balanceOf(address owner) view returns (uint256)",
    params: [owner],
  });

  return { data, isLoading };
}
