import { createDeal, editDeal } from "../effects/deals";
import Bid from "../model/bid";
import Deal from "../model/deal";
import DealFormData from "../model/deal-form-data";
import ContextData from "../model/context-data";
import DealStatus from "../model/deal-status";
import Context from "../App";
import { useState, useCallback, useContext, useEffect } from "react";

export function useCreateDeal(): (deal: DealFormData) => Promise<any> {
  const [createdDeal, setCreatedDeal] = useState();
  return useCallback((deal: DealFormData) => {
    return createDeal({ ...deal, status: DealStatus.ACTIVE });
  }, []);
}

export function useEditDeal(): (deal: DealFormData) => Promise<any> {
  const [createdDeal, setCreatedDeal] = useState();
  return useCallback((deal: DealFormData) => {
    return editDeal({ ...deal });
  }, []);
}
