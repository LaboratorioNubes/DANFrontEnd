import { React, useState } from "react";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import {
  Card,
  CardActionArea,
  CardMedia,
  CardContent,
  CssBaseline,
  CardActions,
  TextField,
  FormControlLabel,
  Checkbox,
  Link,
  Grid,
  Typography,
  makeStyles,
  Container,
  Paper,
} from "@material-ui/core";
//import CssBaseline from '@material-ui/core/CssBaseline';
//import TextField from '@material-ui/core/TextField';
//import FormControlLabel from '@material-ui/core/FormControlLabel';
//import Checkbox from '@material-ui/core/Checkbox';
//import Link from '@material-ui/core/Link';
//import Grid from '@material-ui/core/Grid';
//import Box from '@material-ui/core/Box';
//import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
//import Typography from '@material-ui/core/Typography';
//import { makeStyles } from '@material-ui/core/styles';
//import Container from '@material-ui/core/Container';
import { useHistory } from "react-router-dom";
import signUpBackground from "../../static/images/sign_up.png";
import { lightBlue } from "@material-ui/core/colors";

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(2),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  root: {
    maxWidth: 345,
  },
  rootGrid: {
    flexGrow: 1,
  },
  media: {
    height: 0,
    paddingTop: "56%",
  },
  paperContainer: {
    height: 140,
    backgroundImage: `url(${signUpBackground})`,
  },
  test: {
    display: "flex",
    flexDirection: "column",
    //background: "lightBlue"
  },
}));

const SignUp = () => {
  const classes = useStyles();

  //Form states
  const [signUp, setSignUp] = useState();

  let history = useHistory();
  const signInRedirect = () => {
    history.push("/SignIn");
  };

  const validateForm = () => {
    //Complete with form validations
    history.push("/Dashboard");
  };

  /*const handleFirstNameChange = (e) => {
    setFirstName(e.target.value);
  };

  const handleLastNameChange = (e) => {
    setLastName(e.target.value);
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };*/

  return (
    <div className={classes.test}>
      {/* <div>
        <Paper className={classes.paperContainer} />
      </div> */}
      <div>
        <Paper elevation="5">
          <Container component="main" maxWidth="xs" backgroundColor="primary">
            <CssBaseline />
            <div className={classes.paper}>
              <Avatar className={classes.avatar}></Avatar>
              <Typography component="h1" variant="h5">
                Sign up
              </Typography>
              <form className={classes.form} noValidate>
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      autoComplete="fname"
                      name="firstName"
                      variant="outlined"
                      required
                      fullWidth
                      id="firstName"
                      label="First Name"
                      autoFocus
                      //value={firstName}
                      onChange={(e) =>
                        setSignUp({ ...signUp, firstName: e.target.value })
                      }
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      variant="outlined"
                      required
                      fullWidth
                      id="lastName"
                      label="Last Name"
                      name="lastName"
                      autoComplete="lname"
                      //value={lastName}
                      onChange={(e) =>
                        setSignUp({ ...signUp, lastName: e.target.value })
                      }
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      variant="outlined"
                      required
                      fullWidth
                      id="email"
                      label="Email Address"
                      name="email"
                      autoComplete="email"
                      //value={email}
                      onChange={(e) =>
                        setSignUp({ ...signUp, email: e.target.value })
                      }
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      variant="outlined"
                      required
                      fullWidth
                      name="password"
                      label="Password"
                      type="password"
                      id="password"
                      autoComplete="current-password"
                      //value={password}
                      onChange={(e) =>
                        setSignUp({ ...signUp, password: e.target.value })
                      }
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <FormControlLabel
                      control={
                        <Checkbox value="allowExtraEmails" color="primary" />
                      }
                      label="I want to receive inspiration, marketing promotions and updates via email."
                    />
                  </Grid>
                </Grid>
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  color="primary"
                  className={classes.submit}
                  onClick={validateForm}
                >
                  Sign Up
                </Button>
                <Grid container justifyContent="flex-end">
                  <Grid item>
                    <Link href="#" variant="body2" onClick={signInRedirect}>
                      Already have an account? Sign in
                    </Link>
                  </Grid>
                </Grid>
              </form>
            </div>
          </Container>
        </Paper>
      </div>
    </div>
    /*  <Paper className={classes.paperContainer}>
      Some text to fill the Paper Component
    </Paper> */
    /*     <Card className={classes.root}>
      <CardActionArea>
        <CardMedia
          className={classes.media}
          image={signUpBackground}
          //image= {require ("../../static/images/sign_up.jpg")}
          title="Contemplative Reptile"
        ></CardMedia>
      </CardActionArea>
    </Card> */
  );

  {
    /* */
  }
};

export default SignUp;
