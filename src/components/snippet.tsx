import React from "react";
import styled from "styled-components";

export default function Snippet() {
  const handleTextAreaChange = (
    e: React.SyntheticEvent<HTMLTextAreaElement>
  ) => {
    /* Handle TextArea Change */
    const text = e.currentTarget.value;
    console.log(text);
  };

  return (
    <TwoPanes className="twopane">
      <Editor id={"editor"} onChange={handleTextAreaChange}></Editor>
      <DragBar />
      <Outputs>
        <pre>{}</pre>
      </Outputs>
    </TwoPanes>
  );
}

/* Styled Components */
/* ************************************************************************** */
const TwoPanes = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;

  height: 100vh;
`;

const Editor = styled.textarea`
  flex: 3;
  border: none;
  font-family: monospace;
`;

const DragBar = styled.div`
  flex: none;
  width: 1px;
  height: 80%;
  border: 1px dashed gray;
`;

const Outputs = styled.div`
  flex: 3;
`;
