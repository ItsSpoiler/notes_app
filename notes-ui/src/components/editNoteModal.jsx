import React, { Component } from 'react';
import {Modal, Form, Button} from 'react-bootstrap';

class EditNoteModal extends Component {
    state = { 
        isOpen: false,
        note: {
            id: this.props.id,
            subject: this.props.subject,
            body: this.props.body
        }
     } 

    openModal = () => this.setState({isOpen:true});
    closeModal = () => this.setState({isOpen:false});

    render() { 
        return (
            <React.Fragment>
            <button className='btn btn-secondary' onClick={this.openModal}>Edit</button>
            <Modal show={this.state.isOpen}>
                <Modal.Header closeButton>
                    <Modal.Title>Edit Note</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group 
                        className="mb-3" 
                        controlId="Form.ControlInput1"
                        value={this.props.subject}
                        onChange={this.handleChange.bind(this)}
                        >
                            <Form.Label>Subject</Form.Label>
                            <Form.Control
                                placeholder="What is this note about?"
                                name="subject"
                                defaultValue={this.props.subject}
                                onChange={this.handleChange.bind(this)}
                                autoFocus
                            />
                        </Form.Group>
                        <Form.Group
                            className="mb-3"
                            controlId="Form.ControlInput1"
                            
                        >
                            <Form.Label>Body</Form.Label>
                            <Form.Control as="textarea" rows={3} name="body" defaultValue={this.props.body}
                            onChange={this.handleChange.bind(this)}/>
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={this.closeModal}>
                        Close
                    </Button>
                    <Button variant="success" onClick={() => this.updateNoteHandler()}>
                        Save Changes
                    </Button>
                </Modal.Footer>
            </Modal>
        </React.Fragment>  
        );
    }

    updateNoteHandler(event) {
        console.log(this.props)
        this.state.note.id = this.props.id;
        fetch ('https://localhost:5001/note', {
            method:'PUT',
            headers:{
                'content-type': 'application/json'
            },
            body:JSON.stringify(this.state.note)
        }).then(res => res.json()).then(data => {
            this.props.handleUpdateNote(data);
        });
        this.closeModal();
    }

    handleChange(event) {
        let fieldName = event.target.name;
        let fieldVal = event.target.value;
        console.log(fieldName, fieldVal);
        this.setState({note: {...this.state.note, [fieldName]: fieldVal}})
      }
}
 
export default EditNoteModal;