import React, { useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick-theme.css";
import "slick-carousel/slick/slick.css";
import Board from "./components/board";

export default function Guesser() {
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
    <Slider {...settings}>
      <Board />
      <Board />
      <Board />
      <Board />
      <Board />
    </Slider>
  );
}
