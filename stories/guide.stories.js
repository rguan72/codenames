import React from "react";
import Guide from "../src/client/components/guide";

export default {
  component: Guide,
  title: "Guide"
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
export const redGuide = () => (
  <Guide
    color="red"
    words={words}
  />
);
export const blueGuide = () => <Guide color="blue" words={words} />;
export const beigeGuide = () => <Guide color="beige" words={words} />;
export const blackGuide = () => <Guide color="black" words={words} />;
