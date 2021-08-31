import {React, useState} from "react";
import { Container, Link } from "@material-ui/core";
import CustomInput from "../../components/CustomInput/CustomInput.js";
import LoginButton from "../../components/LoginButton/Button.js";
import { useHistory } from "react-router-dom";

/*const loginInicial = {
  email: "",
  password: "",
};*/

const SignIn = ({}) => {
  const [signIn,setLogin] = useState();

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
    setLogin({...signIn,
      email: e.target.value});
  };

  const handlePasswordChange = (e) => {
    setLogin({...signIn,
      password: e.target.value});
  };

  return (
    <Container maxWidth="xs">
      <form className="form">
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
          color="primary"
          className="form__custom-button"
          onClick={dashboardRedirect}
        >
          Log in
        </LoginButton>
      </form>
      <Link
        component="button"
        variant="body2"
        onClick={signUpRedirect}
      >
        Not an acount yet? Join us now!
      </Link>
    </Container>
  );
};

export default SignIn;
