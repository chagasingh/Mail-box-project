import { useEffect ,Fragment} from "react";
import { Table, Button, Card } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { mailActions } from "../../store/mail-slice";
import ViewMail from "./ViewMail";
import useHttp from "../../hooks/use-http";
import Header from "../Layout/Header";

const Inbox = () => {
  const { sendRequest } = useHttp();
  const dispatch = useDispatch();
  const { receivedMail, changed } = useSelector((state) => state.mail);
  const senderMail = useSelector((state) => state.auth.email);
  const email = senderMail.replace("@", "").replace(".", "");
  console.log(receivedMail);

  const viewMailHandler = (mail) => {
    sendRequest({
      url: `https://react-movie-c353a-default-rtdb.firebaseio.com/rec${email}/${mail.id}.json`,
      method: "PUT",
      body: { ...mail, isRead: true },
    });
    console.log(mail.id);
    dispatch(mailActions.viewMailHandle({ id: mail.id }));
  };

  useEffect(() => {
    const transformData = (data) => {
      const newData = [];
      for (let key in data) {
        newData.push({ id: key, ...data[key] });
      }
      dispatch(mailActions.updateReceivedMail({ mail: newData }));
    };
    sendRequest(
      {
        url: `https://react-movie-c353a-default-rtdb.firebaseio.com/rec${email}.json`,
      },
      transformData
    );
  }, [sendRequest]);

  return (
    <Fragment>
        <Header/>
    <Card>
      <Card.Header><h1>Inbox</h1></Card.Header>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>new</th>
            <th>Subject</th>
            <th>Content</th>
            <th>Sender</th>
          </tr>
        </thead>
        <tbody>
          {receivedMail.map((mail) => (
            <tr key={mail.id}>
              <td style={{ color: "blue", fontSize: "40px" }}>
                {!mail.isRead && "."}
              </td>
              <td>{mail.subject}</td>
              <td>{mail.body}</td>
              <td>{mail.sender}</td>
              <td>
                <Button variant="success" onClick={() => viewMailHandler(mail)}>
                  View
                </Button>
              </td>
              <ViewMail mail={mail} email={email} type={'recevied'}/>
            </tr>
          ))}
        </tbody>
      </Table>
    </Card>
    </Fragment>
  );
};

export default Inbox;