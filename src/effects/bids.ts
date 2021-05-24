import axios from "axios";
import Bid from "../model/bid";
import BidApiBody from "../model/bid-api-body";
import { addBidToDeal } from "./deals";
import BidStatus from "../model/bid-status";
import DealStatus from "../model/deal-status";
import Deal from "../model/deal";

//TODO: Actually do something when calls fail

export async function getBids(): Promise<Bid[]> {
  const data: Bid[] = await axios
    .get<Bid[]>(`http://localhost:1337/bids`)
    .then((response) => response.data)
    .catch(() => []);

  return data;
}

export async function createBid(bid: BidApiBody, deal: Deal): Promise<any> {
  const { value, dealId, partyId: party, status } = bid;
  console.log(party);
  return await axios
    .post(`http://localhost:1337/bids`, {
      value,
      deal: dealId,
      party,
      status,
    })
    .then((response) => {
      // We update the Deal with the newly placed Bid here because
      // the Strapi backend doesn't do it for us
      // Ideally the backend would do this for us
      addBidToDeal(response.data.id, deal);
    })
    .catch(() => []);
}

export async function acceptBid(bidId: number, dealId: number): Promise<any> {
  return await axios
    .put(`http://localhost:1337/bids/${bidId}`, {
      status: BidStatus.ACCEPTED,
    })
    .then((response) => {
      // We update the Deal with the newly placed Bid here because
      // the Strapi backend doesn't do it for us
      // Ideally the backend would do this for us
      axios.put(`http://localhost:1337/deals/${dealId}`, {
        status: DealStatus.COMPLETE,
      });
    })
    .catch(() => []);
}
