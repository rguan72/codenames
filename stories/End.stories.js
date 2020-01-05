import React from "react";
import { storiesOf } from "@storybook/react";
import StoryRouter from "storybook-react-router";
import End from "../src/client/End";

const stories = storiesOf("End", module);
stories.addDecorator(StoryRouter());

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

stories.add("won", () => <End location={{ state: { words, win: true } }} />);
stories.add("lost", () => <End location={{ state: { words, win: false } }} />);
