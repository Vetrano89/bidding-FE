import Party from "./party";
import BidStatus from "./bid-status";
import Deal from "./deal";
import BaseModel from "./base-model";

interface Bid extends BaseModel {
  value: number;
  deal: Deal;
  status: BidStatus;
  party: Party;
  created_at: string;
  id: number;
}

export default Bid;
