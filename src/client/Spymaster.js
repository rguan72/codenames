import React, { useState, useEffect } from "react";
import Box from "@material-ui/core/Box";
import Guide from "./components/guide";
import { monitorWords } from "./utils";

export default function Spymaster(props) {
  const [words, setWords] = useState([]);
  const { code } = props.match.params;

  useEffect(() => monitorWords(code).then(data => setWords(data)));
  return (
    <div>
      <Box display="flex">
        <Box m={2}>
          <Guide color="red" words={words} />
        </Box>
        <Box m={2}>
          <Guide color="blue" words={words} />
        </Box>
      </Box>
      <Box m={2} mt={0}>
        <Guide color="black" words={words} />
      </Box>
      <Box m={2} mt={0}>
        <Guide color="beige" words={words} />
      </Box>
    </div>
  );
}
