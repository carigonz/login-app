import React, { useState, useEffect } from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import Paper from '@material-ui/core/Paper';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import AuthService from "../services/auth.service";
import UserService from '../services/user.service';
import IClientUser from '../interfaces/IclientUser';
import Profile from './profile'

const Copyright: React.FC<{}> = () => {
  return (
    <Typography variant="body2" color="textPrimary" align="center" >
      {'Copyright © '}
      <Link href="https://www.linkedin.com/in/carigonz/" color="textPrimary">
        carigonz
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const useStyles = makeStyles((theme) => ({
  root: {
    height: '100vh',
  },
  image: {
    backgroundImage: 'url(https://source.unsplash.com/random)',
    backgroundRepeat: 'no-repeat',
    backgroundColor:
      theme.palette.type === 'light' ? theme.palette.grey[50] : theme.palette.grey[900],
    backgroundSize: 'cover',
    backgroundPosition: 'center',
  },
  paper: {
    margin: theme.spacing(8, 4),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  formControl: {
    marginTop: theme.spacing(1),
    width: '100%', // Fix IE 11 issue.
  },
  signIn: {
    backgroundColor: 'rgba(0, 36, 115, 0.4)',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  signup: {
    cursor: 'pointer'
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  dark: {
    color: '#000',
    borderColor: "#000"
  },
  error: {
    color: '#ff2212',
    borderRadius: '5px',
    border: '1px solid #ff2212',
    padding: '5px 12px'
  }
}));

export default function SignIn() {
  const [buttonName, setButtonName] = useState('Next');
  const classes = useStyles();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [disableButton, setDisableButton] = useState(true);
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit: React.ChangeEventHandler<HTMLInputElement> = async (event: any) => {
    event.preventDefault();
    if (!passwordVisible && new RegExp(/[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,15}/g).test(email)) {
      setButtonName('login');
      setPasswordVisible(true);
    }

    if (passwordVisible && password.length) {
      try {
        const res: Response = await AuthService.login(email, password);
        console.log(res);
        if (res.ok) {
          const token: { jwt: string } = await res.json();
          const user:  IClientUser = await UserService.getUser(token.jwt);

          setCurrentUser(user);
          window.history.replaceState(window.history.state, 'User Profile', '/user-info');
        } else {
          const error: any = await res.json();
          console.log(error.message);
          showError(error.message);
        }
      } catch (error) {
        console.log(error.message);
        showError(error.message);
      }
    }
  };

  const fetchData = async () => {
    const user: IClientUser | null = await UserService.getCurrentUser();
    if (user) {
      setCurrentUser(user);
      window.history.replaceState(window.history.state, 'User Profile', '/user-info');
    }
  }
  useEffect( () => {
    fetchData();
  }, []);

  const showError = (message:string) => {
      setErrorMessage(message);
      setError(true);
    }

  const handleEmailChange: React.ChangeEventHandler<HTMLInputElement> =
    (e) => {
      const email: string = e.target.value;
      setEmail(email);
      if (email.length) { 
        setDisableButton(false);
      } else {
        setDisableButton(true);
      }
    };

  const handlePasswordChange: React.ChangeEventHandler<HTMLInputElement> =
    (e) => {
      setPassword(e.target.value);
    }
  return (
    <Grid container component="main" className={classes.root}>
      { !currentUser ? (
          <React.Fragment>
            <CssBaseline />
            <Grid item xs={false} sm={4} md={7} className={classes.image} />
            <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
              <div className={classes.paper}>
                <Avatar className={classes.avatar}>
                  {}<LockOutlinedIcon />
                </Avatar>
                <Typography component="h1" variant="h5">
                  Sign in
                </Typography>
                <form className={classes.form} onSubmit={ (event: any) => handleSubmit(event)}>
                  {error &&
                    <Typography variant="subtitle2" gutterBottom className={classes.error}>
                      {errorMessage}
                    </Typography>
                  }
                  <TextField
                    variant="outlined"
                    margin="normal"
                    required
                    fullWidth
                    id="email"
                    label="Email Address"
                    name="email"
                    autoComplete="email"
                    autoFocus
                    onChange={ (event: any) => handleEmailChange(event)}
                  />
                  {passwordVisible &&
                      <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        name="password"
                        label="Password"
                        type="password"
                        id="password"
                        autoComplete="current-password"
                        onChange={ (event: any) => handlePasswordChange(event)}
                      />
                  }
                  <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    color="primary"
                    id="submitButton"
                    disabled={disableButton}
                    className={classes.submit}
                    >
                    {buttonName}
                  </Button >
                  <Box mt={5}>
                    <Copyright />
                  </Box>
                </form>
              </div>
            </Grid>
          </React.Fragment >
      ) : (
        <Profile user={currentUser}/>
      )}
    </Grid>
  );
}