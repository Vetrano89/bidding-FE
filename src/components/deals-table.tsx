import React, { ReactElement, FC, useContext } from "react";
import Box from "@material-ui/core/Box";
import Collapse from "@material-ui/core/Collapse";
import IconButton from "@material-ui/core/IconButton";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TableSortLabel from "@material-ui/core/TableSortLabel";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";
import KeyboardArrowDownIcon from "@material-ui/icons/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@material-ui/icons/KeyboardArrowUp";
import DealStatus from "../model/deal-status";
import BidStatus from "../model/bid-status";
import Deal from "../model/deal";
import Bid from "../model/bid";
import Chip from "@material-ui/core/Chip";
import Button from "@material-ui/core/Button";
import { Context } from "../App";
import { getPercentOfTotal } from "../utils/helpers";

import { parseISO, format } from "date-fns";
import { toCurrency } from "../utils/helpers";

import { useAcceptBid } from "../hooks/bids-hooks";

type Sort = "asc" | "desc" | undefined;

interface RowProps {
  deal: Deal;
  bids: Bid[];
  canEdit: boolean;
  dealAction: (arg0: Deal) => void;
}

const getChipColor = (status: DealStatus) => {
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
};

//TODO: Break this up into smaller components
const Row: FC<RowProps> = ({
  deal,
  bids = [],
  canEdit,
  dealAction,
}): ReactElement => {
  const context = useContext(Context);

  const [open, setOpen] = React.useState(false);
  const [sortFunc, setSortFunc] = React.useState<Sort>("asc");
  const acceptBid = useAcceptBid();

  const handleAcceptBid = (bidId: number): void => {
    acceptBid(bidId, deal?.id).then(() => {
      context?.fetchData();
    });
  };

  const handleSetSortFunc = (): void => {
    if (sortFunc === "asc") {
      setSortFunc("desc");
    }
    if (sortFunc === "desc") {
      setSortFunc("asc");
    }
  };

  return (
    <>
      <TableRow style={{ backgroundColor: "rgba(242, 242, 242, 1)" }}>
        <TableCell>
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => setOpen(!open)}
          >
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell component="th" scope="row">
          {deal.title}
        </TableCell>
        <TableCell align="right">{toCurrency(deal.value)}</TableCell>
        <TableCell align="right">{deal.valuePercentage}</TableCell>
        <TableCell align="right">
          {toCurrency(getPercentOfTotal(deal.value, deal.valuePercentage))}
        </TableCell>
        <TableCell align="right">
          {format(parseISO(deal.created_at), "MM/dd/yyyy")}
        </TableCell>
        <TableCell align="right">
          <Chip
            color={getChipColor(deal.status)}
            size="small"
            label={<strong>{deal.status}</strong>}
          />
        </TableCell>
        <TableCell align="right">
          {deal?.status === DealStatus.ACTIVE && (
            <Button
              color="primary"
              variant="contained"
              onClick={() => dealAction(deal)}
              style={{ width: "105px" }}
            >
              {canEdit ? "Edit" : "Place bid"}
            </Button>
          )}
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={3}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box margin={1}>
              <Typography variant="h6" gutterBottom component="div">
                Bids
              </Typography>
              {!deal.bids || deal.bids.length === 0 ? (
                "There are no active bids to display for this deal."
              ) : (
                <Table size="small" aria-label="purchases">
                  <TableHead>
                    <TableRow>
                      <TableCell>Bidding Party</TableCell>
                      <TableCell>
                        <TableSortLabel
                          onClick={handleSetSortFunc}
                          active
                          direction={sortFunc}
                        >
                          Value
                        </TableSortLabel>
                      </TableCell>
                      <TableCell />
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {deal &&
                      deal?.bids
                        ?.sort((a, b) =>
                          sortFunc === "asc"
                            ? a.value - b.value
                            : b.value - a.value
                        )
                        .map((bid) => (
                          <TableRow
                            key={bid.id}
                            style={{
                              backgroundColor:
                                bid?.status === BidStatus.ACCEPTED
                                  ? "rgba(173, 255, 175, 1)"
                                  : "white",
                            }}
                          >
                            <TableCell component="th" scope="row">
                              {
                                bids.find((dealBid) => dealBid.id === bid.id)
                                  ?.party?.name
                              }
                            </TableCell>
                            <TableCell component="th" scope="row">
                              {toCurrency(bid.value)}
                            </TableCell>
                            <TableCell>
                              {canEdit && deal?.status === DealStatus.ACTIVE && (
                                <Button
                                  variant="contained"
                                  color="primary"
                                  onClick={() => handleAcceptBid(bid?.id)}
                                >
                                  Accept Bid
                                </Button>
                              )}
                              {bid?.status === BidStatus.ACCEPTED && (
                                <Chip
                                  color={getChipColor(deal.status)}
                                  size="small"
                                  label={<strong>Accepted</strong>}
                                  style={{ backgroundColor: "green" }}
                                />
                              )}
                            </TableCell>
                          </TableRow>
                        ))}
                  </TableBody>
                </Table>
              )}
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </>
  );
};

interface TableProps {
  deals: Deal[];
  bids: Bid[];
  party?: number;
  dealAction: (arg0: Deal) => void;
}

export const DealsTable: FC<TableProps> = ({
  deals,
  bids,
  party,
  dealAction,
}): ReactElement => {
  return (
    <TableContainer component={Paper}>
      <Table aria-label="collapsible table">
        <TableHead style={{ backgroundColor: "rgba(222, 222, 222, 1)" }}>
          <TableRow>
            <TableCell />
            <TableCell>Title</TableCell>
            <TableCell align="right">Total Value</TableCell>
            <TableCell align="right">Value Percentage</TableCell>
            <TableCell align="right">Value Offered</TableCell>
            <TableCell align="right">Start Date</TableCell>
            <TableCell align="right">Status</TableCell>
            <TableCell />
          </TableRow>
        </TableHead>
        <TableBody>
          {deals.map((deal) => (
            <Row
              key={deal.id}
              canEdit={deal.party.id === party}
              {...{ deal, bids, dealAction }}
            />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default DealsTable;
