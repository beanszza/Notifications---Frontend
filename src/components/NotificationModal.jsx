import { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import NotificationCard from "./NotificationCard";

function NotificationModal() {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const noOfNotification = 5;
  return (
    <>
      <Button variant="primary" onClick={handleShow}>
        NotificationModal
      </Button>

      <Modal show={show} onHide={handleClose} className="mh-5">
        <Modal.Header closeButton>
          <Modal.Title>Notification</Modal.Title>
        </Modal.Header>
        <Modal.Body style={{ maxHeight: "450px", overflowY: "auto" }}>
          {[...Array(noOfNotification)].map((_, i) => (
            <NotificationCard key={i} />
          ))}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={handleClose}>
            Mark all as read{" "}
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default NotificationModal;
