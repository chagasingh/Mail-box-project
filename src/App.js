import React from "react";
import "./App.css";
import { Route, Switch } from "react-router-dom";
import AuthForm from "./components/Authentication/AuthForm"
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import Header from "./components/Layout/Header"
import ForgotPassword from "./components/Authentication/ForgotPassword"
import Inbox from "./components/pages/Inbox"
import { authActions } from "./store/auth-slice";
import SentMail from "./components/pages/SentMail"

function App() {
  const { isAuthenticated, token, email } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  console.log(email);
  useEffect(() => {
    const savedToken = localStorage.getItem("token");
    const savedEmail = localStorage.getItem("email");
    if (savedToken && savedEmail) {
      dispatch(authActions.login({ token: savedToken, email: savedEmail }));
    }
  }, [dispatch]);

  useEffect(() => {
    if (isAuthenticated) {
      localStorage.setItem("token", token);
      localStorage.setItem("email", email);
    } else {
      localStorage.removeItem("token");
      localStorage.removeItem("email");
    }
  }, [token, email, isAuthenticated]);


  return (
    <Switch>
      <Route path="/" exact>
        {!isAuthenticated && <AuthForm />}
        {isAuthenticated && <Header />}
      </Route>
      <Route path="/forgot">
        <ForgotPassword />
      </Route>

      <Route path="/inbox">
        <Inbox />
      </Route>
      <Route path="/sent">
        <SentMail/>
      </Route>
    </Switch>
  );
}

export default App;

