import { useRef } from "react";
import { Button, Modal, Form } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";

import { uiActions } from "../../store/ui-slice";

const ComposeMail = (props) => {
  const show = useSelector(state => state.ui.show)
  const email = useSelector(state => state.auth.email)
  const senderMail = email.replace('@', '').replace('.', '')
  const dispatch = useDispatch()
  const emailRef = useRef();
  const subjectRef = useRef();
  const mailBodyRef = useRef();


  const composeMailHandler = async(event) => {
    event.preventDefault();
    const receiverMail = emailRef.current.value.replace('@', '').replace('.', '')
    const recevierMailData = {
      sender: email,
      subject: subjectRef.current.value,
      body: mailBodyRef.current.value,
    };
    const senderMailData = {
      sentTo: emailRef.current.value,
      subject: subjectRef.current.value,
      body: mailBodyRef.current.value,
    }
    try {
      await fetch(`https://react-movie-c353a-default-rtdb.firebaseio.com/rec${receiverMail}.json`,{
        method: 'POST',
        body: JSON.stringify(recevierMailData)
      })
      await fetch(`https://react-movie-c353a-default-rtdb.firebaseio.com/sent${senderMail}.json`,{
        method: 'POST',
        body: JSON.stringify(senderMailData)
      })
      
      dispatch(uiActions.handleShow())
    }catch(error) {
      alert(error)
    }
  };

  return (
    <Modal show={show} onHide={() => dispatch(uiActions.handleShow())}>
      <Modal.Header closeButton>
        <Modal.Title>New Message</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={composeMailHandler}>
          <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
            <Form.Label>Email address</Form.Label>
            <Form.Control
              type="email"
              placeholder="name@example.com"
              autoFocus
              ref={emailRef}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="exampleForm.ControlInput2">
            <Form.Label>Subject</Form.Label>
            <Form.Control
              type="text"
              placeholder="subject"
              autoFocus
              ref={subjectRef}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
            <Form.Label>Message</Form.Label>
            <Form.Control as="textarea" rows={3} ref={mailBodyRef}/>
          </Form.Group>
          <Button variant="primary" type="submit">Send</Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default ComposeMail;