import React, { ReactElement, FC, useContext } from "react";
import Button from "@material-ui/core/Button";
import { Context } from "../App";
import Deal from "../model/deal";
import Party from "../model/party";
import DealStatus from "../model/deal-status";

// define interface to represent component props
interface Props {
  deal: Deal;
  dealAction: (arg0: Deal) => void;
  canEdit: boolean;
  isAdmin: boolean;
}

const DealTableActionButton: FC<Props> = ({
  deal,
  dealAction,
  canEdit,
  isAdmin,
}): ReactElement => {
  return (
    <>
      {deal?.status === DealStatus.ACTIVE && (
        <Button
          color="primary"
          variant="contained"
          onClick={() => dealAction(deal)}
          style={{ width: "105px" }}
        >
          {actionText(deal, { canEdit, isAdmin })}
        </Button>
      )}
    </>
  );
};

type PartyQualifiers = Pick<Props, "canEdit" | "isAdmin">;

function actionText(deal: Deal, { canEdit, isAdmin }: PartyQualifiers): string {
  return isAdmin ? "Approve" : canEdit ? "Edit" : "Place bid";
}

export default DealTableActionButton;
