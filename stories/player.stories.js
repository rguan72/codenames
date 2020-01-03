import React from "react";
import Player from "../src/client/components/player";
import "../src/client/fa";

export default {
  component: Player,
  title: "Player"
};

export const redOp = () => <Player team="red" pos="operative" name="Rich" ready />;
export const blueOp = () => <Player team="blue" pos="operative" name="Jo" ready />;
export const redMaster = () => <Player team="red" pos="spymater" name="Bob" ready />;
export const blueMaster = () => <Player team="blue" pos="spymaster" name="Mary" ready />;
export const redOpNotReady = () => <Player team="red" pos="operative" name="Rich" ready={false} />;
export const blueMasterNotReady = () => (
  <Player team="blue" pos="spymaster" name="Rich" ready={false} />
);
