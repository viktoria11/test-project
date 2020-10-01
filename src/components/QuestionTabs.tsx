import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  deleteQuestion,
  fetchOneQuestion,
  fetchQuestions,
  updateQuestion,
} from '../store/actions/actions';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Preloader from './Preloader';
import Grid from '@material-ui/core/Grid';
import FormElement from './UI/FormElement';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import { RootState } from '../store/configureStore';
import { Question } from '../store/types/actions';

const useStyles = makeStyles((theme) => ({
  root: {
    minWidth: 275,
    textAlign: 'left',
    width: theme.spacing(50),
    margin: '10px auto',
    display: 'flex',
  },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)',
  },
  title: {
    fontSize: 14,
    marginBottom: 16,
  },
  pos: {
    marginBottom: 5,
  },
  buttons: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
  },
  btn: {
    width: 70,
  },
  content: {
    width: '75%',
  },
  container: {
    margin: '16px 16px 16px auto',
    width: theme.spacing(50),
  },
  edit: {
    width: '40%',
    border: '1px solid rgb(0, 0, 0, 0.2)',
    position: 'absolute',
    top: '50%',
    left: '40%',
    transform: 'translate(-50%, -60%)',
    padding: theme.spacing(3),
    borderRadius: theme.spacing(1),
  },
  radio: {
    display: 'flex',
  },
  radioLabel: {
    display: 'flex',
    justifyContent: 'space-between',
  },
  string: {
    display: 'inline',
  },
}));

const QuestionTabs = () => {
  const classes = useStyles();

  const questions: Question[] = useSelector(
    (state: RootState) => state.questions.questions
  );
  const loader = useSelector(
    (state: RootState) => state.questions.questionLoading
  );

  const dispatch = useDispatch();

  const [question, setQuestion] = useState<string>('');
  const [category, setCategory] = useState<string>('');
  const [difficulty, setDifficulty] = useState<string>('');
  const [type, setType] = useState<string>('');
  const [correct, setCorrect] = useState<string>('');
  const [incorrect, setIncorrect] = useState<any>('');
  const [hidden, setHidden] = useState<boolean>(true);
  const [value, setValue] = useState<string>('correct');
  const [id, setId] = useState<number | string>('');

  const state = {
    category: category,
    difficulty: difficulty,
    type: type,
    question: question,
    correct_answer: correct,
    incorrect_answers: incorrect,
  };

  const submit = (event: React.FormEvent) => {
    event.preventDefault();
    setHidden(true);
    dispatch(updateQuestion(String(id), state));
  };

  const getOneQuestion = (event: React.MouseEvent) => {
    event.preventDefault();
    dispatch(fetchOneQuestion());
  };

  const editQuestion = (i: number) => {
    setId(i);
    setQuestion(questions[i].question);
    setCorrect(questions[i].correct_answer);
    setIncorrect(questions[i].incorrect_answers);
    setCategory(questions[i].category);
    setType(questions[i].type);
    setDifficulty(questions[i].difficulty);
    setHidden(false);
    goTop();
  };

  const goTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value);
  };

  useEffect(() => {
    dispatch(fetchQuestions());
  }, []);

  return (
    <div className={classes.container}>
      <Button variant="contained" onClick={getOneQuestion}>
        Load more question
      </Button>

      {loader ? <Preloader /> : null}

      {questions &&
        questions.map((q: Question, i: number) => (
          <Card variant={'outlined'} key={i} className={classes.root}>
            <CardContent className={classes.content}>
              <Typography
                className={classes.title}
                color="textSecondary"
                gutterBottom
              >
                <b>Question {i + 1}: </b>
                {q.question}
              </Typography>
              <Typography className={classes.pos} color="textSecondary">
                <b>Category: </b>
                {q.category}
              </Typography>
              <Typography className={classes.pos} color="textSecondary">
                <b>Difficulty: </b>
                {q.difficulty}
              </Typography>
            </CardContent>
            <div className={classes.buttons}>
              <CardActions>
                <Button
                  className={classes.btn}
                  variant="contained"
                  size="small"
                  onClick={() => editQuestion(i)}
                >
                  Edit
                </Button>
              </CardActions>
              <CardActions>
                <Button
                  className={classes.btn}
                  variant="contained"
                  size="small"
                  onClick={() => dispatch(deleteQuestion(i))}
                >
                  Delete
                </Button>
              </CardActions>
            </div>
          </Card>
        ))}

      <div className={classes.edit} hidden={hidden}>
        <FormControl className={classes.string}>
          <RadioGroup name="radio" value={value} onChange={handleChange}>
            <form onSubmit={submit}>
              <Grid container direction="column" spacing={2}>
                <Grid item xs>
                  <FormElement
                    required
                    propertyName="question"
                    value={question}
                    title="Question"
                    onChange={(event) => setQuestion(event.target.value)}
                    placeholder="Question"
                    autoComplete="new-question"
                  />
                </Grid>
                <div className={classes.radioLabel}>
                  <p>Answers</p>
                  <p>Is correct</p>
                </div>
                <Grid item xs className={classes.radio}>
                  <FormElement
                    required
                    propertyName="correct"
                    value={correct}
                    title="Answer 1"
                    autoComplete="new-correct"
                  />
                  <FormControlLabel
                    style={{ margin: '0 0 0 16px' }}
                    value="correct"
                    control={<Radio />}
                    label=""
                  />
                </Grid>
                {Object.keys(incorrect).map((a, i) => (
                  <Grid item xs key={a} className={classes.radio}>
                    <FormElement
                      required
                      propertyName={'incorrect' + i}
                      value={incorrect[a]}
                      title={'Answer ' + (i + 2)}
                      autoComplete="new-incorrect"
                    />
                    <FormControlLabel
                      style={{ margin: '0 0 0 16px' }}
                      value={'incorrect' + i}
                      control={<Radio />}
                      label=""
                    />
                  </Grid>
                ))}
                <Grid item xs>
                  <Button type="submit" variant="contained" color="default">
                    Done
                  </Button>
                </Grid>
              </Grid>
            </form>
          </RadioGroup>
        </FormControl>
      </div>
    </div>
  );
};

export default QuestionTabs;
