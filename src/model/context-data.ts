import Deal from "./deal";
import Bid from "./bid";
import Party from "./party";

export interface ContextData {
  bids: Bid[];
  deals: Deal[];
  parties: Party[];
  partyId?: number;
  fetchData: () => void;
  setPartyId: (arg0: number) => void;
  isLoading: boolean;
}

export default ContextData;
