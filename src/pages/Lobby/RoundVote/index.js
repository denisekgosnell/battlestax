import React from "react";
import constants from "../../../constants";
import { updateGame } from "../../../api";
import { useSelector } from "react-redux";
import { Grid, Typography } from "@material-ui/core";
import {
  selectId,
  selectRound,
  selectQuestion,
} from "../../../store/gameSlice";
import { selectAnswers } from "../../../store/answersSlice";
import { selectQuestions } from "../../../store/questionsSlice";
import { selectVotes } from "../../../store/votesSlice";
import { selectPlayers } from "../../../store/playersSlice";
import Countdown from "../../../components/Countdown";
import _ from "lodash";

const Vote = ({ question, answers, votes }) => {
  return (
    <React.Fragment>
      <Typography paragraph>{question.content}</Typography>
      <Grid container>
        {_.keys(answers).map((answerId) => (
          <Grid item xs={6} key={answerId}>
            <Typography>{answers[answerId].player}</Typography>
            <Typography>{answers[answerId].content}</Typography>
          </Grid>
        ))}
      </Grid>
      <Countdown duration={constants.ROUND_VOTE_TIMER} />
    </React.Fragment>
  );
};

export default function RoundVote() {
  const gameId = useSelector(selectId);
  const roundId = useSelector(selectRound);
  const currentQuestionId = useSelector(selectQuestion);
  const currentRound = constants.ROUNDS.find((round) => round.id === roundId);
  const answers = useSelector(selectAnswers);
  const players = useSelector(selectPlayers);
  const questions = useSelector(selectQuestions);
  const votes = useSelector(selectVotes);
  const roundQuestions = _.pickBy(
    questions,
    (question) => question.round === roundId
  );
  const questionAnswers = _.pickBy(
    answers,
    (answer) => answer.question === currentQuestionId
  );
  const [votedQuestions, setVotedQuestions] = React.useState([]);
  React.useEffect(() => {
    const answerVotes = _.pickBy(votes, (vote) =>
      _.keys(questionAnswers).includes(vote.answer)
    );
    if (_.keys(players).length - 2 <= _.keys(answerVotes).length) {
      console.log(`voting complete for ${currentQuestionId}`);
      const newVotedQuestions = votedQuestions.concat([currentQuestionId]);
      setVotedQuestions(newVotedQuestions);
      const remaingQuestions = _.difference(
        _.keys(roundQuestions),
        newVotedQuestions
      );
      if (remaingQuestions.length === 0) {
        console.log(`round complete: ${roundId}`);
        // updateGame(`${gameId}/game`, {
        //   page: constants.ROUND_SCORE_PAGE,
        //   question: "",
        // });
      } else {
        updateGame(`${gameId}/game`, {
          question: remaingQuestions[0],
        });
      }
    }
  }, [votes]);

  return (
    <Grid container direction="column" justify="center" alignItems="center">
      <Typography paragraph>{currentRound.title}</Typography>
      <Vote
        question={questions[currentQuestionId]}
        answers={_.pickBy(
          answers,
          (answer) => answer.question === currentQuestionId
        )}
      ></Vote>
    </Grid>
  );
}
