
import Bid from "./bid";

type FromBid = Pick<Bid, "value">;

type BidApiBody = FromBid & {
  partyId?: number;
  dealId?: number;
};

export default BidApiBody;
