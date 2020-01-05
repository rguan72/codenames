import React from "react";
import End from "../src/client/End";

export default {
  component: End,
  title: "End"
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
    type: "RED",
    value: "Procrastinate"
  },
  {
    created: 1,
    flipped: false,
    type: "RED",
    value: "Through"
  },
  {
    created: 1,
    flipped: true,
    type: "BLUE",
    value: "Rainbow"
  },
  {
    created: 1,
    flipped: true,
    type: "RED",
    value: "Capitalism"
  },
  {
    created: 1,
    flipped: false,
    type: "BLUE",
    value: "Wristwatch"
  },
  {
    created: 1,
    flipped: false,
    type: "RED",
    value: "Song"
  },
  {
    created: 1,
    flipped: false,
    type: "BLACK",
    value: "Home"
  },
  {
    created: 1,
    flipped: true,
    type: "BEIGE",
    value: "Hospital"
  }
];

export const won = () => <End words={words} win />;
export const lost = () => <End words={words} win={false} />;
