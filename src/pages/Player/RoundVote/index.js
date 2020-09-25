import React from "react";
import { useSelector } from "react-redux";
import { Button, Grid, Typography } from "@material-ui/core";
import { selectAnswers } from "../../../store/answersSlice";
import {
  selectPlayer,
  selectId,
  selectQuestion,
} from "../../../store/gameSlice";
import { updateGame } from "../../../api";
import _ from "lodash";

export default function RoundVote() {
  const gameId = useSelector(selectId);
  const player = useSelector(selectPlayer);
  const currentQuestionId = useSelector(selectQuestion);
  const answers = useSelector(selectAnswers);
  const questionAnswers = _.pickBy(
    answers,
    (answer) => answer.question === currentQuestionId
  );
  const [voted, setVoted] = React.useState(false);

  const sendVote = async (answerId) => {
    await updateGame(`${gameId}/votes`, {
      [`${player}-${currentQuestionId}`]: {
        player,
        answer: answerId,
      },
    });
    setVoted(true);
  };

  if (
    voted ||
    !_.isEmpty(_.pickBy(questionAnswers, (answer) => answer.player === player))
  ) {
    return <Typography>hang tight</Typography>;
  }

  return (
    <Grid container direction="column" justify="center" alignItems="center">
      <Typography paragraph>who won this round?</Typography>
      {_.keys(questionAnswers).map((answerId) => (
        <Button
          key={answerId}
          style={{ marginTop: 16 }}
          fullWidth
          disableElevation
          size="large"
          disabled={voted}
          variant="contained"
          color="primary"
          onClick={() => sendVote(answerId)}
        >
          {answers[answerId].player}
        </Button>
      ))}
    </Grid>
  );
}
