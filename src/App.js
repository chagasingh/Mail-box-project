import AuthForm from './components/AuthForm/AuthForm'
import Home from './components/home/home';
import Layout from './components/Layout/Layout'
import { Fragment } from 'react';
import { Route,Switch } from 'react-router-dom';


function App() {

  return (
    <Fragment>
      <Layout />
      <Switch>
        <Route path="/" exact>
          <AuthForm />
        </Route>
        <Route path="/login">
          <AuthForm />
        </Route>
        <Route path="/welcome">
          <Home/>
        </Route>
      </Switch>
    </Fragment>
  );
}

export default App;

