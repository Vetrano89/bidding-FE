import axios from "axios";
import Deal from "../model/deal";
import DealApiBody from "../model/deal-api-body";
import DealFormData from "../model/deal-form-data";

//TODO: Actually do something when calls fail

export async function getDeals(): Promise<Deal[]> {
  const data: Deal[] = await axios
    .get<Deal[]>(`http://localhost:1337/deals`)
    .then((response) => response.data)
    .catch(() => []);

  return data;
}

export async function createDeal(deal: DealApiBody): Promise<any> {
  return await axios
    .post(`http://localhost:1337/deals`, {
      ...deal,
      party: deal.partyId,
    })
    .then((response) => response.data)
    .catch(() => []);
}

export async function editDeal(deal: DealFormData): Promise<any> {
  return await axios
    .put(`http://localhost:1337/deals/${deal.id}`, {
      ...deal,
    })
    .then((response) => response.data)
    .catch(() => []);
}

export async function addBidToDeal(bidId: number, deal?: Deal): Promise<any> {
  return await axios
    .put(`http://localhost:1337/deals/${deal?.id}`, {
      bids: deal?.bids?.map((bid) => bid?.id).concat([bidId]),
    })
    .then((response) => response.data)
    .catch(() => []);
}
