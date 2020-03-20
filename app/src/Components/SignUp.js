import React, { useState } from 'react';
import TextField from '@material-ui/core/TextField';
import Container from '@material-ui/core/Container';
import { makeStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { Redirect } from "react-router-dom";


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
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(3),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
  }));

function SignUp(){
    const classes = useStyles();

    const [userName, setUserName] = useState('');
    const [errorMsg, setErrorMsg] = useState('');
    const [redirectFire, setRedirectFire] = useState(false);


    const handleSubmit = (e) => {
        e.preventDefault();
        if(userName !== ''){
            setErrorMsg('');
            alert(`Submitting name ${userName}`)
            signUpAPI(userName);
        }
        else{
            setErrorMsg('Cannot leave user name blank');
        }
    };

    const signUpAPI = async (userNameParam) => {
        const data = {
            userName:userNameParam
        };

        const settings = {
            method:'POST',
            headers:{
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data)
        }

        try{
            const fetchResponse = await fetch(`/user`, settings);
            const data = await fetchResponse.json();
            if(data.nodeStatus === 200){
                setRedirectFire(true);
            }else if(data.nodeStatus === 400){
                alert(`Unable to add account for ${userNameParam}`)
            }else{
                alert(`Unknown error...this site is broken:(`)
            }
            return;
        }catch(err){
            return err;
        };
    };

    if(redirectFire){
        return <Redirect push to="/testpage" />
    };

    return(
        <Container component="main" maxWidth="xs">
        <CssBaseline />
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign up
          </Typography>
          <form className={classes.form} noValidate onSubmit={handleSubmit}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  id="user_name"
                  label="User Name"
                  name="user_name"
                  autoComplete="user_name"
                  helperText = {errorMsg}
                  onChange={e => setUserName(e.target.value)}
                />
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
            >
              Sign Up
            </Button>
            <Grid container justify="flex-end">
              <Grid item>
                <Link href="./" variant="body2">
                  Already have an account? Sign in
                </Link>
              </Grid>
            </Grid>
          </form>
        </div>
      </Container>
    );
}

export default SignUp;