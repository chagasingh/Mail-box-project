import { Link } from 'react-router-dom';
import { useHistory } from "react-router-dom";
import React, {useEffect} from "react";
import { useDispatch, useSelector } from "react-redux";
import { authActions } from '../../store/auth-redux';

import classes from './MainNavigation.module.css';

const MainNavigation = () => {
    const  dispatch = useDispatch()
    const history=useHistory();
    // const token = useSelector((state)=>state.expenseitem.token)
    const isLoggedIn = useSelector((state)=>state.auth.isLoggedIn)


  const logoutHandler=()=>{
    dispatch(authActions.logout(null))
      history.replace('/login')
      }



  const idtoken = useSelector((state)=>state.auth.token)
      useEffect(() => {
        fetch(
          "https://identitytoolkit.googleapis.com/v1/accounts:lookup?key=AIzaSyCdVdERwY8R0pWYqhtuP3-j712UDKCGo78",
          {
            method: "POST",
            body: JSON.stringify({
              //idToken: authCtx.tokenid,
              idToken:idtoken,
            }),
            headers: {
              "Content-Type": "application/json",
            },
          }
        )
          .then((res) => {
            if (res.ok) {
              return res.json();
            } else {
              return res.json().then((data) => {
                let errorMessage = "Authentication failed";
                if (data && data.error && data.error.message) {
                  errorMessage = data.error.message;
                }
                throw new Error(errorMessage);
              });
            }
          })
          .then((data) => {
           // authCtx.ProfileDetails(data);
            const get =JSON.stringify(data)
            localStorage.setItem('data',get)
            console.log('data is saved to local storange')
          })
          .catch((err) => {
            console.log(err.message);
          });
      }, []);

  return (
    <header className={classes.header}>
      <Link to='/'>
        <div className={classes.logo}>Mail Box Client</div>
      </Link>
      <nav>
        <ul>{
            !isLoggedIn && (<li>
                <Link to='/login'>Login</Link>
              </li>)}
              {isLoggedIn &&(<li>
            <Link to='/profile'>Profile</Link>
          </li>)}
          {isLoggedIn && (<li>
            <button onClick={logoutHandler}>Logout</button>
          </li>)}
          
        </ul>
      </nav>
    </header>
  );
};

export default MainNavigation;