import DealStatus from "./deal-status";
import Bid from "./bid";

type FromBid = Pick<Bid, "value" | "status">;

type BidApiBody = FromBid & {
  partyId?: number;
  dealId?: number;
};

export default BidApiBody;
