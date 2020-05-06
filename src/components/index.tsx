import React from "react";

// Vendor modules
import Button from "@material-ui/core/Button";
import Tooltip from "@material-ui/core/Tooltip";
import styled from "styled-components";

import useStyle from "../theme";

/* Styled Components */
/* ************************************************************************** */
export const TwoPanes = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;

  height: 100vh;
`;

export const Input = styled.div`
  flex: 3;
  height: 100vh;
`;

export const DragBar = styled.div`
  flex: none;
  width: 1px;
  height: 80%;
  border: 1px dashed gray;
`;

export const Outputs = styled.div`
  flex: 3;
`;

const StyledButton = styled(Button)`
  margin: 0 10px;
`;

/* Preconfigured Components */
/* ************************************************************************** */

export function TooltipButton(props: {
  children: React.ReactNode;
  onClick?: any;
  tooltipTitle: string;
}) {
  return (
    <Tooltip title={props.tooltipTitle} arrow placement="right">
      <StyledButton variant="contained" onClick={props.onClick}>
        {props.children}
      </StyledButton>
    </Tooltip>
  );
}

export function RunButton(props: { onClick: any }) {
  return (
    <TooltipButton tooltipTitle="Run code" onClick={props.onClick}>
      Run
    </TooltipButton>
  );
}
