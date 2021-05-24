import Deal from "./deal";

// I opted to be more explicit with the type here instead of using a Partial Pick
type FromDeal = Pick<
  Deal,
  "valuePercentage" | "value" | "title" | "startingBid" | "status"
>;

type DealApiBody = FromDeal & {
  partyId?: number;
  id?: number;
};

export default DealApiBody;
