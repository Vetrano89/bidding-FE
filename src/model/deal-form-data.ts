import Deal from "./deal";

type FromDeal = Pick<
  Deal,
  "valuePercentage" | "value" | "title" | "startingBid"
>;

type DealFormData = FromDeal & {
  partyId?: number;
  id?: number;
};

export default DealFormData;
