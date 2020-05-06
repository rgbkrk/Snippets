// Vendor modules
import AddCircleIcon from "@material-ui/icons/AddCircle";
import IconButton from "@material-ui/core/IconButton";
import Tooltip from "@material-ui/core/Tooltip";
import React from "react";

// Local module
import { useStyles } from "../theme";

export default function CreateSnippetButton() {
  const classes = useStyles();

  return (
    <Tooltip
      arrow={true}
      className={classes.tooltip}
      placement={"left"}
      title={"Create a New Snippet"}
    >
      <IconButton
        aria-label="create snippet"
        className={classes.createSnippetButton}
        color="primary"
        size="medium"
      >
        <AddCircleIcon className={classes.addCircleIcon} />
      </IconButton>
    </Tooltip>
  );
}
