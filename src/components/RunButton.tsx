// Vendor modules
import Button from "@material-ui/core/Button";
import Tooltip from "@material-ui/core/Tooltip";
import React from "react";
import styled from "styled-components";

// Local modules
import useStyle from "../theme";

export default function RunButton() {
  const classes = useStyle();
  const handleRun = () => {
    /* Handles executing code in the editor */
  };

  return (
    <Tooltip
      arrow={true}
      className={classes.tooltip}
      placement={"right"}
      title={"Run code"}
    >
      <StyledButton variant="contained" onClick={handleRun}>
        Run
      </StyledButton>
    </Tooltip>
  );
}

/* Styled Components */
/* ************************************************************************** */
const StyledButton = styled(Button)`
  margin: 0 10px;
`;
