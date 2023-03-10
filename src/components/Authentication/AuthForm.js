import React, { useRef ,useState} from "react";
import classes from "./AuthForm.module.css";
import { useDispatch, useSelector } from "react-redux";
import { authActions } from "../../store/auth-slice";
import useHttp from "../../hooks/use-http";
import { useHistory } from "react-router-dom";

const AuthForm = (props) => {
  const { sendRequest } = useHttp();
  const dispatch = useDispatch();
  const history = useHistory();
  const [isLoading,setIsLoading]=useState(false)
  const isLoggedIn = useSelector((state) => state.auth.haveAccount);

  const emailInput = useRef();
  const passwordInput = useRef();

  const loginSignupHandler = () => {
    dispatch(authActions.haveAccount());
  };

  const formSubmitHandler = async (event) => {
    event.preventDefault();
    const enteredEmail = emailInput.current.value;
    const enteredPassword = passwordInput.current.value;
    setIsLoading(true)
    if (!isLoggedIn) {
      sendRequest({
        url: "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyCdVdERwY8R0pWYqhtuP3-j712UDKCGo78",
        method: "POST",
        body: {
          email: enteredEmail,
          password: enteredPassword,
          returnSecureToken: true,
        },
      });
      alert("Your Account Has Been Sucessfully Created You Can Now Login");
      setIsLoading(false)
    } else {
      setIsLoading(false)
      const saveLoginData = (data) => {
        dispatch(
          authActions.login({ token: data.idToken, email: enteredEmail })
        );
      };

      sendRequest(
        {
          url: "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyCdVdERwY8R0pWYqhtuP3-j712UDKCGo78",
          method: "POST",
          body: {
            email: enteredEmail,
            password: enteredPassword,
            returnSecureToken: true,
          },
        },
        saveLoginData
        
      );
      setIsLoading(false)
    }
    emailInput.current.value = "";
    passwordInput.current.value = "";
  };

  const handleForgotPassword = () => {
    history.push("/forgot");
  };
  return (
    <section className={classes.auth}>
    <h1>{isLoggedIn ? "Login" : "Sign Up"}</h1>
    <form onSubmit={formSubmitHandler}>
      <div className={classes.control}>
        <label htmlFor="email">Your Email</label>
        <input type="email"  id="email" required ref={emailInput}/>
      </div>
      <div className={classes.control}>
        <label htmlFor="password">Your Password</label>
        <input
          type="password"
          id="password"
          required
          ref={passwordInput}
        />
      </div>
      <div className={classes.control}>
        <label htmlFor="confirm password">Confirm Password</label>
        <input
          type="password"
          id="confirm password"
          required
        />
      </div>
      <div className={classes.actions}>
      {!isLoading && <button>{isLoggedIn ? "Login" : "Create Account"}</button>} 
      {isLoading && <p>Sending request...</p>}
      <button
          type="button"
          className={classes.toggle}
          onClick={handleForgotPassword}
        >

          {isLoggedIn  ? "Forgot Password?" : ""}

        </button>
        <button
          type="button"
          className={classes.toggle}
          onClick={loginSignupHandler}
        >

          {isLoggedIn  ? "Create new account" : "Already Have account? Click Here"}

        </button>
      </div>
    </form>
  </section>
  );
};

export default AuthForm;