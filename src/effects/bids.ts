import axios, { AxiosResponse } from "axios";
import Bid from "../model/bid";
import BidApiBody from "../model/bid-api-body";
import { addBidToDeal } from "./deals";
import BidStatus from "../model/bid-status";
import DealStatus from "../model/deal-status";
import Deal from "../model/deal";

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
      axios.put(`http://localhost:1337/deals/${dealId}`, {
        status: DealStatus.COMPLETE,
      });
    })
    .catch(() => []);
}
