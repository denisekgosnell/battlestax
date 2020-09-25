import React from "react";
import { useSelector } from "react-redux";
import { Button, TextField, Grid, Typography } from "@material-ui/core";
import { selectQuestions } from "../../../store/questionsSlice";
import { selectAnswers } from "../../../store/answersSlice";
import { selectRound, selectPlayer, selectId } from "../../../store/gameSlice";
import { updateGame } from "../../../api";
import constants from "../../../constants";
import _ from "lodash";

export default function RoundInput() {
  const questions = useSelector(selectQuestions);
  const answers = useSelector(selectAnswers);
  const roundId = useSelector(selectRound);
  const player = useSelector(selectPlayer);
  const gameId = useSelector(selectId);
  const currentRound = constants.ROUNDS.find((round) => round.id === roundId);
  const playerAnswers = _.pickBy(answers, (answer, answerId) => {
    return (
      answer.player === player &&
      questions[answers[answerId].question].round === roundId
    );
  });
  const [response, setResponse] = React.useState(_.cloneDeep(playerAnswers));
  const [responseSent, setResponseSent] = React.useState(false);
  const [buttonDisabled, setButtonDisabled] = React.useState(false);

  const submitResponse = async () => {
    setResponseSent(true);
    await updateGame(`${gameId}/answers`, response);
  };

  React.useEffect(() => {
    let disabled = false;
    _.keys(response).forEach((responseKey) => {
      if (!response[responseKey].content) {
        disabled = true;
      }
    });
    setButtonDisabled(disabled);
  }, [response]);

  if (responseSent) {
    return <Typography paragraph>hang tight!</Typography>;
  }

  return (
    <Grid container direction="column" justify="center" alignItems="center">
      <Typography paragraph>{currentRound.title}</Typography>
      {_.keys(playerAnswers).map((answerId) => (
        <React.Fragment key={answerId}>
          {currentRound.type === "question" && (
            <Typography paragraph>
              {questions[answers[answerId].question].content}
            </Typography>
          )}
          {currentRound.type === "comic" && (
            <img
              alt="comic"
              style={{ maxWidth: "100%", marginBottom: 16 }}
              src={questions[answers[answerId].question].content}
            />
          )}
          <TextField
            style={{ marginBottom: 16 }}
            label="response"
            variant="outlined"
            value={response[answerId].content || ""}
            onChange={(e) =>
              setResponse({
                ...response,
                [answerId]: { ...response[answerId], content: e.target.value },
              })
            }
          />
        </React.Fragment>
      ))}
      <Button
        fullWidth
        disableElevation
        size="large"
        disabled={buttonDisabled}
        variant="contained"
        color="primary"
        onClick={submitResponse}
      >
        submit
      </Button>
    </Grid>
  );
}
