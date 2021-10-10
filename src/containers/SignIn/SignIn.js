import { React, useState } from "react";
import { Container, Link, Button, makeStyles } from "@material-ui/core";
import CustomInput from "../../components/CustomInput/CustomInput.js";
import LoginButton from "../../components/LoginButton/Button.js";
//import BuildCircleIcon from '@mui/icons-material/BuildCircle';
import ConstructionRoundedIcon from "@mui/icons-material/ConstructionRounded";
import { useHistory } from "react-router-dom";

/*const loginInicial = {
  email: "",
  password: "",
};*/

const useStyles = makeStyles((theme) => ({
  signInTitleElements: {
    display: "flex",
    justifyContent: "center",
    alignItems:"center"
  },
  signInTitle: {
    color: "#3f51b5",
    marginBottom: "0rem",
    marginTop: "0rem"
  },
  signInSubTitle: {
    marginTop: "0.5rem",
    backgroundColor: "#3f51b5",
  },
  buildIcon: {
    paddingLeft: "1rem",
    color: "#3f51b5",
    fontSize: "2.5rem!important",
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

const SignIn = ({}) => {
  const [signIn, setLogin] = useState();
  const classes = useStyles();

  /*const actualizarLogin = (atributo,valor) => {
        const clienteNuevo = {...cliente, [atributo]: valor};
        console.log(clienteNuevo);
        setCliente(clienteNuevo);
        }*/

  let history = useHistory();
  const signUpRedirect = () => {
    history.push("/SignUp");
  };

  const dashboardRedirect = () => {
    history.push("/Dashboard");
  };

  const handleEmailChange = (e) => {
    setLogin({ ...signIn, email: e.target.value });
  };

  const handlePasswordChange = (e) => {
    setLogin({ ...signIn, password: e.target.value });
  };

  return (
    <Container maxWidth="xs">
      <form className="form">
        <div className={classes.signInTitleElements}>
          <h2 className={classes.signInTitle}>NEXO</h2>
          <ConstructionRoundedIcon className={classes.buildIcon} />
        </div>
        <h3 className={classes.signInSubTitle}> Construction Materials </h3>
        <CustomInput
          labelText="Email"
          id="email"
          formControlProps={{
            fullWidth: true,
          }}
          handleChange={handleEmailChange}
          type="text"
        />
        <CustomInput
          labelText="Password"
          id="password"
          formControlProps={{
            fullWidth: true,
          }}
          handleChange={handlePasswordChange}
          type="password"
        />

        <LoginButton
          type="button"
          color="#3f51b5"
          style={{ backgroundColor: "#3f51b5" }}
          className="form__custom-button"
          onClick={dashboardRedirect}
        >
          Log in
        </LoginButton>
      </form>
      <Link component="button" variant="body2" onClick={signUpRedirect}>
        Not an acount yet? Join us now!
      </Link>
    </Container>
  );
};

export default SignIn;
