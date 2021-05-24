import Bid from "./bid";

// I opted to be more explicit with the type here instead of using a Partial Pick
type FromBid = Pick<Bid, "value" | "status">;

type BidApiBody = FromBid & {
  partyId?: number;
  dealId?: number;
};

export default BidApiBody;
