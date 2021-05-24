import Deal from "./deal";
import Bid from "./bid";
import BaseModel from "./base-model";

interface Party extends BaseModel {
  name: string;
  businessName: string;
  deals: Deal[];
  bids: Bid[];
}

export default Party;
