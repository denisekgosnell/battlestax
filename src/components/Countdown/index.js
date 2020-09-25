import React from "react";
import Countdown from "react-countdown";
import { Typography } from "@material-ui/core";

const renderer = ({ minutes, seconds }) => {
  return (
    <Typography variant="overline">
      {minutes !== 0 && `${minutes}:`}
      {seconds}
    </Typography>
  );
};

export default function BattleStaxCountdown({ duration }) {
  const [date] = React.useState(Date.now() + duration);
  return <Countdown date={date} renderer={renderer} />;
}
