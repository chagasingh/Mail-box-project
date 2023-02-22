import { Modal, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { mailActions } from "../../store/mail-slice";

const ViewMail = (props) => {
  const viewMail = useSelector((state) => state.mail.viewMail);
  const dispatch = useDispatch();
  const viewMailHandler = () => {
    dispatch(mailActions.mailHandler());
  };

  const deleteMailHandler = async () => {
    let url;
    if (props.type === "recevied") {
      url = `https://react-movie-c353a-default-rtdb.firebaseio.com/rec${props.email}/${props.mail.id}.json`;
    } else{
      url = `https://react-movie-c353a-default-rtdb.firebaseio.com/sent${props.email}/${props.mail.id}.json`;
    }

    await fetch(url, { method: "DELETE" });
    if(props.type === "recevied") {
      dispatch(mailActions.deleteReceivedMail(props.mail.id));
    }else{
      dispatch(mailActions.deleteSentMail(props.mail.id));
    }
    
    dispatch(mailActions.mailHandler());
  };
  return (
    <Modal
      show={viewMail}
      onHide={viewMailHandler}
      backdrop="static"
      keyboard={false}
    >
      <Modal.Header closeButton>
        <Modal.Title>Mail</Modal.Title>
      </Modal.Header>
      <Modal.Body>{props.mail.body}</Modal.Body>
      <Modal.Footer>
        <Button variant="danger" onClick={deleteMailHandler}>
          Delete
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ViewMail;