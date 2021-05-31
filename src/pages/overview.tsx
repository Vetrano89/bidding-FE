import React, { ReactElement, FC, useContext, useState } from "react";
import Deal from "../model/deal";
import DealStatus from "../model/deal-status";
import DealsTable from "../components/deals-table";
import { Context } from "../App";
import CreateEditDealDialog from "../components/create-edit-deal-dialog";
import CreateBidDialog from "../components/create-bid-dialog";
import Container from "@material-ui/core/Container";
import ModalActions, { ModalActionTypes } from "../model/modal-actions";
import Header from "../components/header";

const Overview: FC<any> = (): ReactElement => {
  const context = useContext(Context);
  const [showDealModal, setShowDealModal] = useState<ModalActions>(null);
  const [showBidModal, setShowBidModal] = useState<ModalActions>(null);
  const [dealToEdit, setDealToEdit] = useState<Deal>();

  const handleEditDeal = (deal: Deal): void => {
    setShowDealModal(ModalActionTypes.EDIT);
    setDealToEdit(deal);
  };

  const handleCreateBid = (deal: Deal): void => {
    setShowBidModal(ModalActionTypes.CREATE);
    setDealToEdit(deal);
  };

  const handleApproveDeal = (deal: Deal): void => {
    setDealToEdit(deal);
  };

  if (context.party?.isAdmin) {
    return (
      <Container maxWidth="lg" style={{ paddingTop: "16px" }}>
        <h2>All pending deals</h2>
        <DealsTable
          party={context?.partyId}
          deals={
            context?.deals.filter(
              (deal) => deal.status === DealStatus.PENDING_APPROVAL
            ) || []
          }
          bids={context?.bids || []}
          dealAction={(deal) => handleApproveDeal(deal)}
        />
      </Container>
    );
  }

  return (
    <Container maxWidth="lg" style={{ paddingTop: "16px" }}>
      {showDealModal === ModalActionTypes.CREATE && (
        <CreateEditDealDialog
          action={showDealModal}
          handleClose={() => setShowDealModal(null)}
        />
      )}
      {showDealModal === ModalActionTypes.EDIT && (
        <CreateEditDealDialog
          action={showDealModal}
          deal={dealToEdit}
          handleClose={() => setShowDealModal(null)}
        />
      )}
      {showBidModal === ModalActionTypes.CREATE && dealToEdit && (
        <CreateBidDialog
          action={showDealModal}
          deal={dealToEdit}
          handleClose={() => setShowBidModal(null)}
        />
      )}
      <Header setShowDealModal={setShowDealModal} />
      {divider}
      {!context?.partyId ? (
        <>Select a Party to continue</>
      ) : (
        <>
          <h2>Deals from other Parties</h2>
          <DealsTable
            party={context?.partyId}
            deals={
              context?.deals.filter(
                (deal) => deal.party.id !== context?.partyId
              ) || []
            }
            bids={context?.bids || []}
            dealAction={(deal) => handleCreateBid(deal)}
          />
          {divider}
          <h2>Your deals</h2>
          <DealsTable
            deals={
              context?.deals.filter(
                (deal) => deal.party.id === context?.partyId
              ) || []
            }
            bids={context?.bids || []}
            party={context?.partyId}
            dealAction={(deal) => handleEditDeal(deal)}
          />{" "}
        </>
      )}
    </Container>
  );
};

export default Overview;

const divider = <div style={{ marginBottom: "24px" }} />;
