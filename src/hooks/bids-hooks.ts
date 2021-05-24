import { createBid, acceptBid } from "../effects/bids";
import Deal from "../model/deal";
import BidStatus from "../model/bid-status";
import { useCallback } from "react";
import BidFormData from "../model/bid-form-data";

export function useCreateBid(): (bid: BidFormData, deal: Deal) => Promise<any> {
  return useCallback((bid: BidFormData, deal: Deal) => {
    return createBid({ ...bid, status: BidStatus.SUBMITTED }, deal);
  }, []);
}

export function useAcceptBid(): (
  bidId: number,
  dealId: number
) => Promise<any> {
  return useCallback((bidId: number, dealId: number) => {
    return acceptBid(bidId, dealId);
  }, []);
}
