import React from "react";
import Box from "@material-ui/core/Box";
import GameCard from "./card";

export default function Board() {
  return (
    <div>
      <Box>
        <Box flexDirection="row">
          <GameCard type="RED" name="field" />
          <GameCard type="BEIGE" name="axle" />
        </Box>
        <Box flexDirection="row">
          <GameCard type="BLACK" name="cool" />
          <GameCard type="BLUE" name="bros" />
        </Box>
      </Box>
    </div>
  );
}
