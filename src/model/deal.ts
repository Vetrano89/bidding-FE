import DealStatus from "./deal-status";
import Party from "./party";
import Bid from "./bid";
import BaseModel from "./base-model";

//Should be expanded to include "types" of Deals (ex: fine art, classic cars)
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
