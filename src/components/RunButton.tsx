import { Button } from "@material-ui/core";
import styled from "styled-components";
import React from "react";

const StyledButton = styled(Button)`
  margin: 0 10px;
`;

export default function RunButton() {
  const handleRun = () => {
    /* Handles executing code in the editor */
  };

  return (
    <StyledButton variant="contained" onClick={handleRun}>
      Run
    </StyledButton>
  );
}
