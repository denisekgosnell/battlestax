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

  const sendVote = (answerId) => {
    setVoted(true);
    updateGame(`${gameId}/votes`, {
      [`${player}-${currentQuestionId}`]: {
        player,
        answer: answerId,
      },
    });
  };

  if (
    voted ||
    !_.isEmpty(_.pickBy(questionAnswers, (answer) => answer.player === player))
  ) {
    return <React.Fragment />;
  }

  return (
    <React.Fragment>
      <Grid item xs={12}>
        <Typography paragraph>which one was the best?</Typography>
      </Grid>
      <Grid item xs={12}>
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
            {answers[answerId].content}
          </Button>
        ))}
      </Grid>
    </React.Fragment>
  );
}
