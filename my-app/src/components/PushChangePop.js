import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import CloudSyncIcon from '@mui/icons-material/CloudSync';
import { Form, Dropdown, Alert } from 'react-bootstrap'

export function PushChangesGit(props) {
  const [show, setShow] = useState(false);
  const [commitMsg, setCommitMsg] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const backendServer = 'http://localhost:8009'

  const handleClose = () => {
    setShow(false)
    setSuccess(false)
    };
  const handleShow = () => setShow(true);

  function handleChange(e){
    e.preventDefault();
    setCommitMsg(e.target.value)
  }

  function handleSubmit(e){
    e.preventDefault();
    setLoading(true)
    let messageToSend = {
        commit_message: commitMsg
    }
    const requestOptions = {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(messageToSend)
    };
    fetch(backendServer + '/push-changes', requestOptions)
    .then(res => res.json())
    .then(data_res => {
        if (data_res.message === 0){
            setError("Push Failed")
        }
        else if(data_res.message === 1){
            setLoading(false)
            setSuccess(true)
        }
    })

  }



  return (
    <>
    <Dropdown.Item onClick={handleShow}>
        Push Changes  <CloudSyncIcon/>
    </Dropdown.Item>
        

      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Push Changes to Github</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <p>Pushing changes at: {props.data.cur_dir}</p>
        <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Add Commit Message</Form.Label>
                    <Form.Control type="text" onChange={handleChange} placeholder="Enter a message to name your commit" />
                </Form.Group>
                <Button variant="success" type="submit">
                    Push
                </Button>
        </Form>
        {error && <Alert variant="danger">{error}</Alert>}
        {loading && <Alert variant="secondary">Pushing Changes...</Alert>}
        {success && <Alert variant="success">Changes Successfully Pushed</Alert>}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="danger" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

//render(<PushChangesGit />);