import React, { useState, useEffect } from "react";
import Box from "@material-ui/core/Box";
import Slider from "react-slick";
import "slick-carousel/slick/slick-theme.css";
import "slick-carousel/slick/slick.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Board from "./components/board";
import { monitorWords } from "./utils";
import { teams } from "./constants";
import firebase_ from "./Firebase";

export default function Operative(props) {
  const [words, setWords] = useState(Array(20).fill(null));
  const [myTurn, setMyTurn] = useState(false);
  const { id, code } = props.match.params;
  const { team } = props.location.state;
  useEffect(() => {
    const unsubscribe = monitorWords(code, setWords);
    return () => unsubscribe();
  }, []);
  useEffect(() => {
    const db = firebase_.firestore();
    const unsubscribe = db.collection("games").doc(code).onSnapshot((docRef) => {
      const data = docRef.data();
      setMyTurn((team === teams.RED && data.redTurn)
        || (team === teams.BLUE && !data.redTurn));
    });
    return () => unsubscribe();
  }, []);
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
        <FontAwesomeIcon icon="user-secret" color={team} size="2x" />
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
