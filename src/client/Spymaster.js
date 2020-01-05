import React, { useState, useEffect } from "react";
import Box from "@material-ui/core/Box";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Guide from "./components/guide";
import { monitorWords } from "./utils";

export default function Spymaster(props) {
  const [words, setWords] = useState([]);
  const { code } = props.match.params;
  const { team } = props.location.state;

  useEffect(() => {
    const unsubscribe = monitorWords(code, setWords);
    return () => unsubscribe();
  }, []);
  return (
    <div>
      <Box display="flex" justifyContent="center" mt={2}>
        <FontAwesomeIcon icon="brain" color={team} size="2x" />
      </Box>
      <Box display="flex" justifyContent="center">
        <Box m={2}>
          <Guide color="red" words={words} />
        </Box>
        <Box m={2}>
          <Guide color="blue" words={words} />
        </Box>
      </Box>
      <Box display="flex" justifyContent="center">
        <Box m={2} mt={0}>
          <Guide color="black" words={words} />
        </Box>
        <Box m={2} mt={0}>
          <Guide color="beige" words={words} />
        </Box>
      </Box>
    </div>
  );
}
