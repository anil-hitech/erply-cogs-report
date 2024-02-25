import { FormControlLabel, Radio, RadioGroup, Typography } from "@mui/material";
import PropTypes from "prop-types";

const SelectorRadioGroup = ({ options, state, setState }) => {
  return (
    <RadioGroup
      row
      value={state}
      onChange={(_, value) => setState(value)}
      sx={{ marginTop: "0px", mb: "15px", alignItems: "center" }}
    >
      <Typography fontWeight={"bold"} mr={"10px"}>
        Select :
      </Typography>

      {options.map((graphName, index) => (
        <FormControlLabel
          key={index}
          value={graphName}
          control={<Radio />}
          label={graphName}
        />
      ))}
    </RadioGroup>
  );
};

SelectorRadioGroup.propTypes = {
  options: PropTypes.array,
  state: PropTypes.string,
  setState: PropTypes.func,
};

export default SelectorRadioGroup;
