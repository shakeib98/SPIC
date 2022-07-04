import SPIC_ABI from "../contracts/SPIC.json";
import type { SPIC } from "../contracts/types";
import useContract from "./useContract";
import { SPIC_ADDRESS } from "../util";
import useContractCustom from "./useContractCustom"

export default function useSpicContract(provider) {
  
  const custom = useContractCustom<SPIC>(SPIC_ADDRESS, SPIC_ABI,provider);
  const defaultContract = useContract<SPIC>(SPIC_ADDRESS, SPIC_ABI)
  return  provider ? custom  : defaultContract
  
}