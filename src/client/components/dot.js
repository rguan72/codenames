import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Dot, WithStore } from "pure-react-carousel";
import { withStyles } from "@material-ui/core/styles";

const styles = {
  noButton: {
    backgroundColor: "Transparent",
    outline: "none",
    border: "none",
  }
};

class MyDot extends React.Component {
  render() {
    const { slide, currentSlide, classes } = this.props;
    return (
      <Dot slide={this.props.slide} className={classes.noButton}>
        <FontAwesomeIcon
          icon="circle"
          opacity={(slide === currentSlide) ? "1.0" : "0.20"}
          size="sm"
        />
      </Dot>
    );
  }
}

export default withStyles(styles)(WithStore(MyDot, state => ({
  currentSlide: state.currentSlide
})));
