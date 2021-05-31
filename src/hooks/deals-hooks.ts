import { createDeal, editDeal } from "../effects/deals";
import DealFormData from "../model/deal-form-data";
import DealStatus from "../model/deal-status";
import { useCallback } from "react";

export function useCreateDeal(): (deal: DealFormData) => Promise<any> {
  return useCallback((deal: DealFormData) => {
    return createDeal({ ...deal, status: DealStatus.PENDING_APPROVAL });
  }, []);
}

export function useEditDeal(): (deal: DealFormData) => Promise<any> {
  return useCallback((deal: DealFormData) => {
    return editDeal({ ...deal });
  }, []);
}
