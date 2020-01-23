import React, { useState, useEffect } from "react";
import { Redirect } from "react-router-dom";
import Box from "@material-ui/core/Box";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";
import {
  CarouselProvider,
  Slider,
  Slide,
  ButtonBack,
  ButtonNext,
} from "pure-react-carousel";
import "pure-react-carousel/dist/react-carousel.es.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import firebase from "firebase/app";
import GameCard from "./components/card";
import TopBar from "./components/topbar";
import { PrevArrow, NextArrow } from "./components/arrow";
import Dot from "./components/dot";
import { monitorWords, monitorGame } from "./utils";
import { teams, roles } from "./constants";
import firebase_ from "./Firebase";

const useStyles = makeStyles({
  mar: {
    marginLeft: 50
  },
  noButton: {
    backgroundColor: "Transparent",
    outline: "none",
    border: "none",
    marginTop: 15
  },
  dotGroup: {
    display: "flex",
    justifyContent: "space-between"
  }
});

export default function Operative(props) {
  const [words, setWords] = useState(Array(20).fill(null));
  const [game, setGame] = useState({});
  const { code, id } = props.match.params;
  let team;
  let name;
  if (!props.location.state) {
    team = sessionStorage.getItem("team");
    name = sessionStorage.getItem("name");
  } else {
    team = props.location.state.team;
    name = props.location.state.name;
  }
  const classes = useStyles();
  const myTurn = (team === teams.RED && game.redTurn) || (team === teams.BLUE && !game.redTurn);

  useEffect(() => {
    const unsubscribe = monitorWords(code, setWords);
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    const unsubscribe = monitorGame(code, setGame);
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    sessionStorage.setItem("words", JSON.stringify(words));
  }, [words]);

  useEffect(() => {
    sessionStorage.setItem("role", roles.OPERATIVE);
  }, []);

  function handleClick(i) {
    const wordsCopy = words.slice();
    wordsCopy[i].flipped = true;
    setWords(wordsCopy);
    const db = firebase_.firestore();
    const word = words[i];
    db.collection("words").doc(word.id).update({ flipped: true });
    if (word.type === "BLACK") {
      db.collection("games").doc(code).get().then((ref) => {
        const data = ref.data();
        if (data.redTurn) db.collection("games").doc(code).update({ winner: "blue", active: false });
        else db.collection("games").doc(code).update({ winner: "red", active: false });
      });
    } else if (word.type === "RED") {
      db.collection("games").doc(code).update({ redFlipped: firebase.firestore.FieldValue.increment(1) });
      db.collection("games").doc(code).get().then((ref) => {
        const data = ref.data();
        if ((data.redFlipped >= 7 && !data.redFirst) || (data.redFlipped >= 8 && data.redFirst)) {
          db.collection("games").doc(code).update({ winner: "red", active: false });
        }
        if (!data.redTurn) {
          db.collection("games").doc(code).update({ redTurn: true });
        }
      });
    } else if (word.type === "BLUE") {
      db.collection("games").doc(code).update({ blueFlipped: firebase.firestore.FieldValue.increment(1) });
      db.collection("games").doc(code).get().then((ref) => {
        const data = ref.data();
        if ((data.blueFlipped >= 7 && data.redFirst) || (data.blueFlipped >= 8 && !data.redFirst)) { db.collection("games").doc(code).update({ winner: "blue", active: false }); }
        if (data.redTurn) { db.collection("games").doc(code).update({ redTurn: false }); }
      });
    } else {
      db.collection("games").doc(code).get().then((ref) => {
        const data = ref.data();
        if (data.redTurn) { db.collection("games").doc(code).update({ redTurn: false }); } else { db.collection("games").doc(code).update({ redTurn: true }); }
      });
    }
  }

  function endTurn() {
    const db = firebase_.firestore();
    if (team === teams.RED) db.collection("games").doc(code).update({ redTurn: false });
    else db.collection("games").doc(code).update({ redTurn: true });
  }

  function renderCard(i) {
    return (
      <GameCard
        word={words[i]}
        disabled={!myTurn}
        onClick={() => handleClick(i)}
      />
    );
  }

  const boardItems = [];
  for (let i = 0; i < 5; i += 1) {
    boardItems.push(
      <Slide key={i} index={i}>
        <Box>
          {renderCard(4 * i)}
          {renderCard(4 * i + 1)}
          {renderCard(4 * i + 2)}
          {renderCard(4 * i + 3)}
        </Box>
      </Slide>
    );
  }

  const dots = [];
  for (let i = 0; i < 5; i += 1) {
    dots.push(
      <Dot slide={i} key={i} />
    );
  }

  if (game.winner && team === game.winner) {
    sessionStorage.setItem("win", true);
    return (
      <Redirect to={{
        pathname: `/end/${code}/${id}`,
        state: {
          words, win: true, name, team, role: roles.OPERATIVE
        }
      }}
      />
    );
  }
  if (game.winner && team !== game.winner) {
    sessionStorage.setItem("win", false);
    return (
      <Redirect to={{
        pathname: `/end/${code}/${id}`,
        state: {
          words, win: false, name, team, role: roles.OPERATIVE
        }
      }}
      />
    );
  }

  return (
    <div>
      <TopBar />
      <Box display="flex" justifyContent="center" alignItems="center" mt={2}>
        <FontAwesomeIcon icon="user-secret" color={team} size="2x" />
        <Button
          variant="contained"
          disabled={!myTurn}
          onClick={endTurn}
          className={classes.mar}
          size="large"
        >
          {" "}
          End Turn
          {" "}
        </Button>
      </Box>
      <CarouselProvider
        naturalSlideWidth={100}
        naturalSlideHeight={125}
        totalSlides={5}
        infinite
      >
        <Slider>{boardItems}</Slider>
        <Box display="flex" justifyContent="space-between">
          <ButtonBack className={classes.noButton}>
            <PrevArrow />
          </ButtonBack>
          <ButtonNext className={classes.noButton}>
            <NextArrow />
          </ButtonNext>
        </Box>
        <Box display="flex" justifyContent="space-between" pt={1.3} p={1.8}>
          {dots}
        </Box>
      </CarouselProvider>
    </div>
  );
}
