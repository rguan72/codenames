import React, { useState } from "react";
import Box from "@material-ui/core/Box";
import { makeStyles } from "@material-ui/core/styles";
import Slider from "react-slick";
import "slick-carousel/slick/slick-theme.css";
import "slick-carousel/slick/slick.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Board from "./components/board";

const useStyles = makeStyles({
  marTop: {
    marginTop: 10
  },
});

export default function Operative() {
  const classes = useStyles();
  const [cards, setCards] = useState(Array(20).fill(false));
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
      <Box display="flex" justifyContent="center" className={classes.marTop}>
        <FontAwesomeIcon icon="user-secret" color="red" size="2x" />
      </Box>
      <Slider {...settings}>
        <Board />
        <Board />
        <Board />
        <Board />
        <Board />
      </Slider>
    </div>
  );
}
