import React from "react";
import Board from "../src/client/components/board";

export default {
  component: Board,
  title: "Board"
};

const words = [
  {
    created: 1,
    flipped: false,
    type: "RED",
    value: "Procrastinate"
  },
  {
    created: 1,
    flipped: false,
    type: "BLUE",
    value: "Windmill"
  },
  {
    created: 1,
    flipped: false,
    type: "BEIGE",
    value: "Circus"
  },
  {
    created: 1,
    flipped: false,
    type: "BLACK",
    value: "Home"
  },
];

export const enabledBoard = () => (
  <Board words={words} code="filler" disabled={false} />
);
export const disabledBoard = () => (
  <Board words={words} code="filler" disabled />
);
