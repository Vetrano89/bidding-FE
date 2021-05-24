
import Deal from "./deal";

type FromDeal = Pick<
  Deal,
  "valuePercentage" | "value" | "title" | "startingBid" | "status"
>;

type DealApiBody = FromDeal & {
  partyId?: number;
  id?: number;
};

export default DealApiBody;
