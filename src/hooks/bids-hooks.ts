import { createBid, acceptBid } from "../effects/bids";
import Bid from "../model/bid";
import Deal from "../model/deal";
import ContextData from "../model/context-data";
import BidStatus from "../model/bid-status";
import Context from "../App";
import { useState, useCallback, useContext, useEffect } from "react";
import BidApiBody from "../model/bid-api-body";
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
