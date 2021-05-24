import DealStatus from "./deal-status";
import Party from "./party";
import Bid from "./bid";
import Deal from "./deal";
import DealFormData from "./deal-form-data";

type FromDeal = Pick<
  Deal,
  "valuePercentage" | "value" | "title" | "startingBid" | "status"
>;

type DealApiBody = FromDeal & {
  partyId?: number;
  id?: number;
};

export default DealApiBody;
