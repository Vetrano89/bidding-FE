import React, {
  ReactElement,
  FC,
  useState,
  useContext,
  ChangeEvent,
} from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import { useCreateDeal, useEditDeal } from "../hooks/deals-hooks";
import {
  toCurrency,
  getPercentOfTotal,
  stripNonNumericCharacters,
} from "../utils/helpers";
import ModalAction, { ModalActionTypes } from "../model/modal-actions";
import Deal from "../model/deal";
import { Context } from "../App";

interface Props {
  handleClose: () => void;
  action: ModalAction;
  deal?: Deal;
}

const CreateEditDealDialog: FC<Props> = ({
  handleClose,
  action,
  deal,
}): ReactElement => {
  const context = useContext(Context);

  const [value, setValue] = useState(deal?.value.toString() || "");
  const [title, setTitle] = useState(deal?.title || "");
  const [valuePercentage, setValuePercentage] = useState(
    deal?.valuePercentage.toString() || ""
  );
  const [hasPercentageError, setHasPercentageError] = useState(false);
  const [startingBid, setStartingBid] = useState(
    deal?.startingBid.toString() || ""
  );

  const createDeal = useCreateDeal();
  const editDeal = useEditDeal();

  const valueOfDeal = getPercentOfTotal(
    parseFloat(value),
    parseFloat(valuePercentage)
  );

  const handleSetTitle = (e: ChangeEvent<HTMLInputElement>): void => {
    setTitle(e.target.value);
  };

  const handleSetValue = (e: ChangeEvent<HTMLInputElement>): void => {
    setValue(stripNonNumericCharacters(e.target.value));
  };

  const handleSetStartingBid = (e: ChangeEvent<HTMLInputElement>): void => {
    setStartingBid(stripNonNumericCharacters(e.target.value));
  };

  const handleSetValuePercentage = (e: ChangeEvent<HTMLInputElement>): void => {
    setValuePercentage(stripNonNumericCharacters(e.target.value));
    validatePercentage(stripNonNumericCharacters(e.target.value));
  };

  const handleCreateEditDeal = (): void => {
    const dealFunc = action === ModalActionTypes.CREATE ? createDeal : editDeal;
    const body = {
      value: parseFloat(value),
      title,
      valuePercentage: parseFloat(valuePercentage),
      startingBid: parseFloat(startingBid),
    };
    dealFunc({
      ...body,
      ...(ModalActionTypes.CREATE ? { partyId: context?.partyId } : {}),
      ...(ModalActionTypes.EDIT ? { id: deal?.id } : {}),
    }).then(() => {
      context?.fetchData();
      handleClose();
    });
  };

  const modalTitle =
    action && action[0].toUpperCase() + action.slice(1).toLowerCase();

  const validatePercentage = (percentage: string) => {
    setHasPercentageError(!validateNumber(percentage));
  };

  return (
    <div>
      <Dialog open onClose={handleClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">{`${modalTitle} a Deal`}</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            id="title"
            label="Title"
            fullWidth
            required
            onChange={handleSetTitle}
            value={title}
          />
          <TextField
            label="Total value of asset"
            margin="dense"
            id="value"
            fullWidth
            required
            onChange={handleSetValue}
            value={value}
          />
          <TextField
            label="Percent of asset being offered"
            margin="dense"
            id="valuePercentage"
            fullWidth
            required
            onChange={handleSetValuePercentage}
            value={valuePercentage}
            error={hasPercentageError}
            onBlur={(e) => validatePercentage(e.target.value)}
            helperText={
              hasPercentageError ? "Enter a value between 0.01 and 100" : ""
            }
          />
          <TextField
            label="Starting bid"
            margin="dense"
            id="startingBid"
            fullWidth
            required
            onChange={handleSetStartingBid}
            value={startingBid}
          />
          <div style={{ marginTop: "12px", textAlign: "end" }}>
            <strong>{`Submit deal with value of: ${
              value && valuePercentage
                ? toCurrency(valueOfDeal)
                : "Not calculated"
            }`}</strong>
          </div>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button
            onClick={handleCreateEditDeal}
            color="primary"
            disabled={!startingBid || !valuePercentage || !value || !title}
          >
            {`${modalTitle} Deal`}
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

function validateNumber(num: string) {
  return parseFloat(num) >= 0.01 && parseFloat(num) <= 100;
}

export default CreateEditDealDialog;
