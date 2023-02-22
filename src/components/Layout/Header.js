import { Link} from "react-router-dom";
import classes from "./Header.module.css";
import { authActions } from "../../store/auth-slice";
import { useDispatch } from "react-redux";
import ComposeMail from "../pages/ComposeMail";
import { uiActions } from "../../store/ui-slice";
const Header = () => {
  const dispatch = useDispatch();

  return (
    <main>
      <header className={classes.header}>
        <h1 className={classes["header-title"]}>Mailbox</h1>
        <div className={classes.actions}>
          <Link to="/inbox">Inbox</Link>
        </div>
        <div className={classes.actions}>
          <Link to="/sent">Sent Mail</Link>
        </div>
        <div className={classes.actions}>
          <button onClick={() => dispatch(uiActions.handleShow())}>Compose</button>
        </div>
        <div className={classes.actions2}>
          <button onClick={() => dispatch(authActions.logout())}>Logout</button>
        </div>
      </header>
      <ComposeMail/>
    </main>
    
  );
};

export default Header;