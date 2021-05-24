import { getDeals } from "../effects/deals";
import { getBids } from "../effects/bids";
import { getParties } from "../effects/parties";
import Bid from "../model/bid";
import Deal from "../model/deal";
import Party from "../model/party";
import ContextData from "../model/context-data";
import Context from "../App";
import { useState, useCallback, useContext, useEffect } from "react";

export function useContextValue(): ContextData {
  const [deals, setDeals] = useState<Deal[]>([]);
  const [bids, setBids] = useState<Bid[]>([]);
  const [parties, setParties] = useState<Party[]>([]);
  const [partyId, setPartyId] = useState<number | undefined>();
  const [isLoading, setIsLoading] = useState(false);

  const fetchData = useCallback(() => {
    setIsLoading(true);
    getDeals().then((dealData) => {
      setDeals(dealData);
    });

    getBids().then((bidData) => {
      setBids(bidData);
    });

    getParties().then((partyData) => {
      setParties(partyData);
    });
    setIsLoading(false);
  }, [setBids]);

  const handleSetPartyId = (partyId: number): void => {
    setPartyId(partyId);
  };

  return {
    bids,
    deals,
    parties,
    isLoading,
    fetchData,
    partyId,
    setPartyId: handleSetPartyId,
  };
}
