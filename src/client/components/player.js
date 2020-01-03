import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Typography from "@material-ui/core/Typography";
import { roles } from "../constants";

export default function Player({
  team, pos, name, ready
}) {
  if (pos === roles.OPERATIVE) {
    return (
      <div>
        <FontAwesomeIcon icon="user-secret" color={team} size="3x" opacity={ready ? "1.0" : "0.20"} />
        <Typography variant="subtitle1">
          {" "}
          {name}
          {" "}
        </Typography>
      </div>
    );
  }

  return (
    <div>
      <FontAwesomeIcon
        icon="brain"
        color={team}
        size="3x"
        opacity={ready ? "1.0" : "0.20"}
      />
      <Typography variant="subtitle1">
        {" "}
        {name}
        {" "}
      </Typography>
    </div>
  );
}
