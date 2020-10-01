import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';

const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: theme.spacing(4),
    '& > * + *': {
      marginLeft: theme.spacing(2),
    },
  },
  color: {
    color: 'rgb(0, 0, 0, 0.4)',
  },
}));

const Preloader: React.FC = () => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <CircularProgress className={classes.color} />
    </div>
  );
};

export default Preloader;
