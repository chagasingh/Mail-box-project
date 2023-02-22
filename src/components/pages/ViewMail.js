import { Modal, Button } from "react-bootstrap"
import { useDispatch, useSelector } from "react-redux"
import { mailActions } from "../../store/mail-slice"

const ViewMail = (props) => {
    const viewMail = useSelector(state => state.mail.viewMail)
    const dispatch = useDispatch()
    const viewMailHandler = () => {
        dispatch(mailActions.mailHandler())
    }
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
        <Modal.Body>
          {props.message}
        </Modal.Body>
        <Modal.Footer>
          
          <Button variant="danger">Delete</Button>
        </Modal.Footer>
      </Modal>
    )
}


export default ViewMail