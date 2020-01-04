import React, { useState, useEffect } from "react";
import Box from "@material-ui/core/Box";
import Slider from "react-slick";
import "slick-carousel/slick/slick-theme.css";
import "slick-carousel/slick/slick.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Board from "./components/board";
import { monitorWords, wordComp } from "./utils";

export default function Operative() {
  const [words, setWords] = useState([]);
  const { id, code } = props.match.params;

  useEffect(() => monitorWords(code).then(data => { data.sort(wordComp); setWords(data); }));
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
        <Board />
        <Board />
        <Board />
        <Board />
        <Board />
      </Slider>
    </div>
  );
}
