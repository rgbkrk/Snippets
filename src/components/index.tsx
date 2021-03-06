import React from "react";

// Vendor modules
import Button from "@material-ui/core/Button";
import Tooltip from "@material-ui/core/Tooltip";
import styled from "styled-components";

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

  & > .cm-wrap {
    height: 100%;
    overflow: auto;
  }
`;

export const DragBar = styled.div`
  flex: none;
  width: 1px;
  height: 100%;
  border: 0.1px dashed gray;
`;

export const Outputs = styled.div`
  flex: 3;
  padding: 10px;
`;

const StyledButton = styled(Button)`
  margin: 0 10px;
`;

/* Preconfigured Components */
/* ************************************************************************** */

export function TooltipButton(props: {
  children: React.ReactNode;
  onClick?: () => void;
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

export function RunButton(props: { onClick?: any }) {
  return (
    <TooltipButton tooltipTitle="Run code" onClick={props.onClick}>
      Run
    </TooltipButton>
  );
}
