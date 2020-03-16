import React, { useState } from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';


const useStyles = makeStyles(theme => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

function Home() {
  const [userName, setUserName] = useState(0);
  const classes = useStyles();

  const loginApi = async (userNameParam) => {
    try {
      const fetchResponse = await fetch(`/retrieve-user?user_name=${userName}`);
      const data = await fetchResponse.json();
      window.location = `/testpage`;
      return data;
    } catch (err) {
      return err;
    };
  };

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        <TextField
          variant="outlined"
          margin="normal"
          required
          fullWidth
          id="email"
          label="User Name"
          name="user_name"
          autoComplete="use_name"
          autoFocus
          onKeyDown={(e) => {
            if (e.key !== 'Enter') { return; };
            loginApi(userName);
            setUserName('');
            e.target.value = '';
          }}
          onChange={(e) => {
            setUserName(e.target.value);
          }}
        />
        <Button
          type="submit"
          fullWidth
          variant="contained"
          color="primary"
          className={classes.submit}
          onClick={(e) => {
            loginApi(userName);
            document.getElementById('email').value = '';
          }}
        >
          Sign In
        </Button>
        <Grid container>
          <Grid item>
            <Link href="#" variant="body2">
              {"Don't have an account? Sign Up"}
            </Link>
          </Grid>
        </Grid>
      </div>
    </Container>
  );
};

export default Home;