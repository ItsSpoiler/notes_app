import React, { Component } from 'react';
import { Modal, Form, Button } from 'react-bootstrap';

class DeleteNoteModal extends Component {
    state = {  } 
    openModal = () => this.setState({isOpen:true});
    closeModal = () => this.setState({isOpen:false});
    render() { 
        return (
            <React.Fragment>
                <button className='btn btn-danger' style={{float: 'right'}} onClick={this.openModal}>Delete</button>
                <Modal show={this.state.isOpen}>
                    <Modal.Header closeButton>
                        <Modal.Title>Delete Note</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        Are you sure you want to delete this note?
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={this.closeModal}>
                            Cancel
                        </Button>
                        <Button variant="danger" onClick={() => this.deleteNoteHandler()}>
                            Delete Forever
                        </Button>
                    </Modal.Footer>
                </Modal>
            </React.Fragment>
        );
    }
    deleteNoteHandler(event) {
        fetch (`https://localhost:5001/Note/${this.props.id}`, {
            method:'Delete',
            headers:{
                'content-type': 'application/json'
            },
            body:JSON.stringify(this.state.note)
        })
        this.props.handleDeleteNote(this.props.id);
        this.closeModal();
    }
}
 
export default DeleteNoteModal;