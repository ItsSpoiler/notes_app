import React, { Component } from 'react';
import { Modal, Form, Button } from 'react-bootstrap';
class CreateNoteModal extends Component {
    state = {
        isOpen: false,
        note: {
            subject: "",
            body: ""
        }
    };

    openModal = () => this.setState({ isOpen: true });
    closeModal = () => this.setState({ isOpen: false });
    render() {
        return (
            <React.Fragment>
                <button className='btn btn-success' style={{ float: 'right' }} onClick={this.openModal}>Create Note</button>
                <Modal show={this.state.isOpen}>
                    <Modal.Header closeButton>
                        <Modal.Title>Create Note</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form>
                            <Form.Group
                                className="mb-3"
                                controlId="Form.ControlInput1"
                                value={this.state.note.subject}
                                onChange={this.handleChange.bind(this)}
                                required>
                                <Form.Label>Subject</Form.Label>
                                <Form.Control
                                    placeholder="What is this note about?"
                                    name="subject"
                                    autoFocus
                                    required
                                />
                            </Form.Group>
                            <Form.Group
                                className="mb-3"
                                controlId="Form.ControlInput1"
                                value={this.state.note.body}
                                onChange={this.handleChange.bind(this)}
                                required
                            >
                                <Form.Label>Body</Form.Label>
                                <Form.Control as="textarea" rows={3} name="body" required/>
                            </Form.Group>
                        </Form>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={this.closeModal}>
                            Close
                        </Button>
                        <Button variant="success" onClick={() => this.CreateNoteHandler()}>
                            Save Changes
                        </Button>
                    </Modal.Footer>
                </Modal>
            </React.Fragment>
        );
    }

    CreateNoteHandler() {

        fetch('https://localhost:5001/Note', {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(this.state.note)
        }).then(res => res.json()).then(data => {
            this.props.handleAddNote(data);
        });
        this.closeModal();
    }

    handleChange(event) {
        let fieldName = event.target.name;
        let fieldVal = event.target.value;
        console.log(fieldName, fieldVal);
        this.setState({ note: { ...this.state.note, [fieldName]: fieldVal } })
    }
}

export default CreateNoteModal;

