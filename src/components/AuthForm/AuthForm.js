import { useState, useRef } from "react";
import { useHistory } from "react-router-dom";
import { Link } from "react-router-dom";
import {useDispatch } from "react-redux";
import { authActions } from "../../store/auth-redux";

import classes from "./AuthForm.module.css";

const AuthForm = () => {
    const history=useHistory();
  const emailItnputRef = useRef();
  const passwordInputRef = useRef();

  const dispatch = useDispatch();

  const [isLogin, setIsLogin] = useState(true);
   const [isLoading,setIsLoading] = useState(false)
  const switchAuthModeHandler = () => {
    setIsLogin((prevState) => !prevState);
  };
  const submitHandler = (event) => {
    event.preventDefault();

    const enteredEmail = emailItnputRef.current.value;
    const enteredPassword = passwordInputRef.current.value;
setIsLoading(true)
let url;
    if (isLogin) {
       url= "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyCdVdERwY8R0pWYqhtuP3-j712UDKCGo78"
    } else {
        url="https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyCdVdERwY8R0pWYqhtuP3-j712UDKCGo78"
    }
    fetch(
        url,
        {
          method: 'POST',
          body: JSON.stringify({
            email: enteredEmail,
            password: enteredPassword,
            returnSecureToken: true,
          }),
          headers: {
            'Content-Type': "application/json",
          },
        }
      ).then((res) => {
        setIsLoading(false)
        if (res.ok) {
            return res.json();
        } else {
          return res.json().then((data) => {
           let errorMessage = 'Authentication failed!';
        //    if(data&& data.error && data.error.message){
        //     errorMessage = data.error.message;
           throw new Error(errorMessage);
           });
           
        }
      })
      .then((data)=>{
        // AuthCtx.login(data.idToken)
        dispatch(authActions.login(data.idToken));
          localStorage.setItem("token", data.idToken);
          localStorage.setItem("email", data.email);
          console.log('user has successfully registered!!')
        history.replace('/home')
      })
      .catch((err)=>{
        alert(err.message)
      })
    }


  return (
    <section className={classes.auth}>
      <h1>{isLogin ? "Login" : "Sign Up"}</h1>
      <form onSubmit={submitHandler}>
        <div className={classes.control}>
          <label htmlFor="email">Your Email</label>
          <input type="email"  id="email" required ref={emailItnputRef}/>
        </div>
        <div className={classes.control}>
          <label htmlFor="password">Your Password</label>
          <input
            type="password"
            id="password"
            required
            ref={passwordInputRef}
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
        {!isLoading && <button>{isLogin ? "Login" : "Create Account"}</button>} 
        {isLoading && <p>Sending request...</p>}
        <Link to='/forgot'>Forgot Password?</Link>
          <button
            type="button"
            className={classes.toggle}
            onClick={switchAuthModeHandler}
          >

            {isLogin  ? "Create new account" : "Already Have account? Click Here"}

          </button>
        </div>
      </form>
    </section>
  );
};

export default AuthForm;