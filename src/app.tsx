// Vendor modules
import { useMutation } from "@apollo/react-hooks";
import { Transaction } from "@codemirror/next/state";
import { EditorView } from "@codemirror/next/view";
import { useTheme } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import CssBaseline from "@material-ui/core/CssBaseline";
import Divider from "@material-ui/core/Divider";
import Drawer from "@material-ui/core/Drawer";
import IconButton from "@material-ui/core/IconButton";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import MenuIcon from "@material-ui/icons/Menu";
import clsx from "clsx";
import gql from "graphql-tag";
import React, { useEffect, useRef, useState } from "react";

// Local modules
import { TwoPanes, Input, DragBar, Outputs, RunButton } from "./components";
import History from "./components/history";
import useStyles from "./theme";
import { configureEditorState } from "./utils";

// GraphQL mutation executes code
/* ************************************************************************** */
const RUN_SNIPPET_MUTATION = gql`
  mutation Execute($code: String) {
    execute(code: $code) {
      id
      code
      result
      variables
    }
  }
`;

/* ************************************************************************** */

function App() {
  const classes = useStyles();
  const theme = useTheme();
  const ref = useRef<HTMLDivElement>(null);
  const defaultCode = `let x = 2;
x * 2
`;
  const [code, updateCode] = useState(defaultCode);
  const [open, setOpen] = useState(false);
  const [runSnippet, { data }] = useMutation(RUN_SNIPPET_MUTATION);

  // Configure CodeMirror Editor
  const myView = new EditorView({
    state: configureEditorState({ text: code }),
    dispatch: (t: Transaction) => {
      updateCode(t.docs.toString());
      myView.update([t]);
    },
  });

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const handleRunButtonClick = () => {};

  // When the component mounts, instantiate the CodeMirror editor.
  useEffect(() => {
    if (ref === null || ref.current === null) {
      return;
    }

    const el = ref.current;
    el.appendChild(myView.dom);
  }, [ref, myView.dom]);

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar
        position="fixed"
        className={clsx(classes.appBar, {
          [classes.appBarShift]: open,
        })}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            className={clsx(classes.menuButton, open && classes.hide)}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap>
            Snippets
          </Typography>
          <RunButton onClick={handleRunButtonClick} />
        </Toolbar>
      </AppBar>
      <Drawer
        className={classes.drawer}
        variant="persistent"
        anchor="left"
        open={open}
        classes={{
          paper: classes.drawerPaper,
        }}
      >
        <div className={classes.drawerHeader}>
          <div>
            <Typography variant="subtitle1" noWrap>
              Snippets History
            </Typography>
          </div>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === "ltr" ? (
              <ChevronLeftIcon />
            ) : (
              <ChevronRightIcon />
            )}
          </IconButton>
        </div>
        <Divider />
        <History />
      </Drawer>
      <main
        className={clsx(classes.content, {
          [classes.contentShift]: open,
        })}
      >
        <div className={classes.drawerHeader} />
        <TwoPanes className="twopane">
          <Input ref={ref}></Input>
          <DragBar />
          <Outputs>
            <pre>{data && JSON.stringify(data.execute, null, 2)}</pre>
          </Outputs>
        </TwoPanes>
      </main>
    </div>
  );
}

export default App;
