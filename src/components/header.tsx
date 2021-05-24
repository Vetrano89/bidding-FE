import React, { ReactElement, FC, useContext } from "react";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import InputLabel from "@material-ui/core/InputLabel";
import Button from "@material-ui/core/Button";
import { Context } from "../App";
import { ModalActionTypes } from "../model/modal-actions";

// define interface to represent component props
interface Props {
  setShowDealModal: (arg0: ModalActionTypes) => void;
}

const Header: FC<Props> = ({ setShowDealModal }): ReactElement => {
  const context = useContext(Context);

  const handleSetPartyId = (e: React.ChangeEvent<{ value: unknown }>): void => {
    context?.setPartyId(parseInt(e.target.value as string));
  };

  return (
    <>
      <FormControl>
        <InputLabel htmlFor="party">Select a Party</InputLabel>
        <Select
          displayEmpty
          native
          value={context?.partyId}
          onChange={handleSetPartyId}
        >
          <option aria-label="None" value="" />
          {context?.parties.map((party) => (
            <option aria-label="None" value={party.id}>
              {party.name}
            </option>
          ))}
        </Select>
      </FormControl>
      <Button
        onClick={() => setShowDealModal(ModalActionTypes.CREATE)}
        variant="contained"
      >
        Create new Deal
      </Button>
    </>
  );
};

export default Header;
