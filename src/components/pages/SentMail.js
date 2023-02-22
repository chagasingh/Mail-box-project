
import { Fragment } from "react";
import { useEffect } from "react";
import { Table, Button, Card } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { mailActions } from "../../store/mail-slice";
import Header from "../Layout/Header";
import ViewMail from "./ViewMail";

const SentMail = () => {
  const dispatch = useDispatch();
  const sentMail = useSelector((state) => state.mail.sentMail);
  const senderMail = useSelector((state) => state.auth.email);
  const email = senderMail.replace("@", "").replace(".", "");
  const viewMailHandler = () => {
    dispatch(mailActions.mailHandler());
  };

  const fetchSentMail = async () => {
    const response = await fetch(
      `https://react-movie-c353a-default-rtdb.firebaseio.com/sent${email}.json`
    );
    if (!response.ok) {
      throw new Error("Could not fetch sent mail");
    }
    const data = await response.json();
    const newData = [];
    for (let key in data) {
      newData.push({ id: key, ...data[key] });
    }
    dispatch(mailActions.updateSentMail({ mail: newData }));
    console.log(newData);
  };

  useEffect(() => {
    fetchSentMail();
  }, []);

  return (
    <Fragment>
        <Header/>
    <Card>
      <Card.Header><h1>Sent Mail</h1></Card.Header>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Subject</th>
            <th>Content</th>
            <th>Sent To</th>
          </tr>
        </thead>
        <tbody>
          {sentMail.map((mail) => (
            <tr key={mail.id}>
              <td>{mail.subject}</td>
              <td>{mail.body}</td>
              <td>{mail.sentTo}</td>
              <td>
                <Button variant="success" onClick={viewMailHandler}>
                  View
                </Button>
              </td>
              <ViewMail mail={mail} email={email}  type={'sent'}/>
            </tr>
          ))}
        </tbody>
      </Table>
    </Card>
    </Fragment>
  );
};

export default SentMail;