import Deal from "./deal";
import Bid from "./bid";
import BaseModel from "./base-model";

// Should be expanded to include more contact info
interface Party extends BaseModel {
  name: string;
  businessName: string;
  deals: Deal[];
  bids: Bid[];
}

export default Party;
