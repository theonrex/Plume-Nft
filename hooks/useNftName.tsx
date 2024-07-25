import { useReadContract } from "thirdweb/react";
import { contract } from "@/consts/parameters";
export function useNftName() {
  const { data, isLoading } = useReadContract({
    contract,
    method: "function name() view returns (string)",
    params: [],
  });

  return { data, isLoading };
}
