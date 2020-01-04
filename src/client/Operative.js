import React, { useState, useEffect } from "react";
import Box from "@material-ui/core/Box";
import Slider from "react-slick";
import "slick-carousel/slick/slick-theme.css";
import "slick-carousel/slick/slick.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Board from "./components/board";
import {
  monitorWords, wordComp, monitorPlayer, monitorGame
} from "./utils";
import { teams } from "./constants";

export default function Operative() {
  const [words, setWords] = useState([]);
  const [player, setPlayer] = useState(null);
  const [myTurn, setMyTurn] = useState(false);
  const { id, code } = props.match.params;
  useEffect(() => monitorWords(code).then(data => { data.sort(wordComp); setWords(data); }));
  useEffect(() => monitorGame(code).then(
    data => setMyTurn((player.team === teams.RED && data.redTurn))
    || (player.team === teams.BLUE && !data.redTurn)
  ));
  useEffect(() => monitorPlayer(id).then(data => setPlayer(data)), []);
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: true
  };
  return (
    <div>
      <Box display="flex" justifyContent="center" mt={2}>
        <FontAwesomeIcon icon="user-secret" color="red" size="2x" />
      </Box>
      <Slider {...settings}>
        <Board words={words.slice(0, 4)} code={code} disabled={!myTurn} />
        <Board words={words.slice(4, 8)} code={code} disabled={!myTurn} />
        <Board words={words.slice(8, 12)} code={code} disabled={!myTurn} />
        <Board words={words.slice(12, 16)} code={code} disabled={!myTurn} />
        <Board words={words.slice(16, 20)} code={code} disabled={!myTurn} />
      </Slider>
    </div>
  );
}
