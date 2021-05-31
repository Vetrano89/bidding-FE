import React, { ReactElement, FC, useContext } from "react";
import Chip from "@material-ui/core/Chip";
import { Context } from "../App";
import Deal from "../model/deal";
import DealStatus from "../model/deal-status";

// define interface to represent component props
interface Props {
  deal: Deal;
}

const DealStatusLabel: FC<Props> = ({ deal }): ReactElement => {
  return (
    <Chip
      color={getChipColor(deal.status)}
      size="small"
      label={<strong>{deal.status}</strong>}
    />
  );
};

export default DealStatusLabel;

function getChipColor(status: DealStatus) {
  switch (status) {
    case DealStatus.ACTIVE:
      return "secondary";
    case DealStatus.COMPLETE:
      return "primary";
    case DealStatus.CANCELLED:
      return "default";
    default:
      return "default";
  }
}
