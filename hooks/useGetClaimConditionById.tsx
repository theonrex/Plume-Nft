import { useReadContract } from "thirdweb/react";
import { contract } from "@/consts/parameters";
export function getClaimConditionById() {
  const { data: getClaimConditionByIdData, isLoading } = useReadContract({
    contract,
    method:
      "function getClaimConditionById(uint256 _conditionId) view returns ((uint256 startTimestamp, uint256 maxClaimableSupply, uint256 supplyClaimed, uint256 quantityLimitPerWallet, bytes32 merkleRoot, uint256 pricePerToken, address currency, string metadata) condition)",
    params: [BigInt(0)],
  });

  return { getClaimConditionByIdData, isLoading };
}
