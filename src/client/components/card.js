import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import Typography from "@material-ui/core/Typography";
import CardActionArea from "@material-ui/core/CardActionArea";
import firebase from "firebase/app";
import firebase_ from "../Firebase";
import { types } from "../constants";

const useStyles = makeStyles(() => ({
  center: {
    textAlign: "center",
  },
  mar: {
    margin: 15
  },
  pad: {
    padding: 30
  },
  colored: {
    backgroundColor: props => types[props.word.type]
  },
  basis: {
    minHeight: 130,
  },
  disabled: {
    backgroundColor: "#e0e0e0",
    color: "#bfbfbf"
  }
}));

export default function GameCard(props) {
  const [flipped, setFlipped] = useState(false);
  const { word, disabled, code } = props;
  const classes = useStyles(props);
  function flip() {
    setFlipped(true);
    const db = firebase_.firestore();
    db.collection("words").doc(word.id).update({ flipped: true });
    if (word.type === "BLACK") {
      db.collection("games").doc(code).get().then((ref) => {
        const data = ref.data();
        if (data.redTurn) db.collection("games").doc(code).update({ winner: "blue" });
        else db.collection("games").doc(code).update({ winner: "red" });
      });
    } else if (word.type === "RED") {
      db.collection("games").doc(code).update({ redFlipped: firebase.firestore.FieldValue.increment(1) });
      db.collection("games").doc(code).get().then((ref) => {
        const data = ref.data();
        if ((data.redFlipped >= 7 && !data.redFirst) || (data.redFlipped >= 8 && data.redFirst)) {
          db.collection("games").doc(code).update({ winner: "red" });
        }
        if (!data.redTurn) {
          db.collection("games").doc(code).update({ redTurn: true });
        }
      });
    } else if (word.type === "BLUE") {
      db.collection("games").doc(code).update({ redFlipped: firebase.firestore.FieldValue.increment(1) });
      db.collection("games").doc(code).get().then((ref) => {
        const data = ref.data();
        if ((data.blueFlipped >= 7 && data.redFirst) || (data.blueFlipped >= 8 && !data.redFirst)) { db.collection("games").doc(code).update({ winner: "blue" }); }
        if (data.redTurn) { db.collection("games").doc(code).update({ redTurn: false }); }
      });
    } else {
      db.collection("games").doc(code).get().then((ref) => {
        const data = ref.data();
        if (data.redTurn) { db.collection("games").doc(code).update({ redTurn: false }); } else { db.collection("games").doc(code).update({ redTurn: true }); }
      });
    }
  }
  if (!flipped) {
    return (
      <Card className={`${classes.mar} ${classes.center}`}>
        <CardActionArea
          className={disabled ? `${classes.pad} ${classes.disabled}` : `${classes.pad}`}
          onClick={flip}
          disabled={disabled}
        >
          <Typography variant="h2">{word.value}</Typography>
        </CardActionArea>
      </Card>
    );
  }
  return <Card className={`${classes.colored} ${classes.basis} ${classes.mar}`}> &nbsp; </Card>;
}
