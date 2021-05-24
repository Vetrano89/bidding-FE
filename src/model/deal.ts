import DealStatus from "./deal-status";
import Party from "./party";
import Bid from "./bid";
import BaseModel from "./base-model";

interface Deal extends BaseModel {
  valuePercentage: number;
  value: number;
  startingBid: number;
  bids?: Bid[];
  status: DealStatus;
  party: Party;
  title: string;
}

export default Deal;
