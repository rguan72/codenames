import React from "react";
import GameCard from "../src/client/components/card";

export default {
  component: GameCard,
  title: "Game Card"
};

export const disabledCard = () => (
  <GameCard
    code="pd0a"
    disabled
    word={{
      flipped: false, id: "Gp7fhDUlxQWbSx79yIUw", type: "BEIGE", value: "Shark"
    }}
  />
);

export const enabledCard = () => (
  <GameCard
    code="pd0a"
    disabled={false}
    word={{
      flipped: false, id: "Gp7fhDUlxQWbSx79yIUw", type: "BEIGE", value: "Shark"
    }}
  />
);

export const longWords = () => (
  <GameCard
    code="pd0a"
    disabled={false}
    word={{
      flipped: false, id: "Gp7fhDUlxQWbSx79yIUw", type: "BEIGE", value: "Reimbursement"
    }}
  />
);
