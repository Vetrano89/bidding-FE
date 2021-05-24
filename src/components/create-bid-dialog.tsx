import React, { ReactElement, FC, useState, useContext } from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import ModalAction from "../model/modal-actions";
import Deal from "../model/deal";
import { Context } from "../App";
import { useCreateBid } from "../hooks/bids-hooks";
import { stripNonNumericCharacters } from "../utils/helpers";

interface Props {
  handleClose: () => void;
  action: ModalAction;
  deal: Deal;
}

const CreateBidDialog: FC<Props> = ({
  handleClose,
  action,
  deal,
}): ReactElement => {
  const context = useContext(Context);

  const [value, setValue] = useState("");

  const createBid = useCreateBid();

  const handleSetValue = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setValue(stripNonNumericCharacters(e.target.value));
  };

  const handleCreateBid = (): void => {
    createBid(
      {
        value: parseFloat(value),
        dealId: deal?.id,
        partyId: context?.partyId,
      },
      deal
    ).then(() => {
      context?.fetchData();
      handleClose();
    });
  };

  return (
    <div>
      <Dialog open onClose={handleClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">{`Place a bid`}</DialogTitle>
        <DialogContent>
          <TextField
            label="How much to bid?"
            margin="dense"
            id="value"
            fullWidth
            required
            onChange={handleSetValue}
            value={value}
            helperText={`Enter a bid of ${deal?.startingBid} or above`}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button
            onClick={handleCreateBid}
            color="primary"
            disabled={
              !value || (deal && parseFloat(value) <= deal?.startingBid)
            }
          >
            {`Place Bid`}
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default CreateBidDialog;
