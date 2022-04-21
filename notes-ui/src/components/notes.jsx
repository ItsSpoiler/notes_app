import React, { Component } from 'react';
import EditNoteModal from './editNoteModal';
import CreateNoteModal from './createNoteModal';
import DeleteNoteModal from './deleteNoteModal';
import { Card, Row, Col } from "react-bootstrap";
import axios from 'axios';
import { Container } from 'react-bootstrap';
class Notes extends Component {
    constructor(props) {
        super(props);
        this.state = {
            notes: []
        }
    }
    center = {
        margin: 'auto',
        width: '50%',
        border: '3px solid green',
        padding: '10px',
        marginTop: '1%'
    };

    componentDidMount() {
        axios.get('https://localhost:5001/notes')
            .then(response => {
                this.setState({ notes: response.data });
            });
    }

    updateNoteList = (data) => {
        let tempNotes = [...this.state.notes];
        tempNotes = tempNotes.filter(item => !(item.id === data.id));
        const newNotes = [data, ...tempNotes];
        this.setState({ notes: newNotes });
    }

    deleteFromNoteList = (data) => {
        let tempNotes = [...this.state.notes];
        tempNotes = tempNotes.filter(item => !(item.id === data));
        this.setState({ notes: tempNotes });
    }

    renderNotes() {
        // if (!this.dataIsLoaded) return <p className='alert alert-danger' style={{ textAlign: 'center' }}>Sorry, we are experiencing difficulties loading the NoteMaker. Please restart all applications...</p>

        if (this.state.notes.length === 0) return <p className='alert alert-warning' style={{ textAlign: 'center' }}>There Are No Notes!</p>

        return (
            <Container style={{ listStyle: 'none' }}>
                <Row>
                    {
                        this.state.notes.map(
                            note =>

                                <Col sm={4}>
                                    <Card style={{ width: '18rem', margin: '5%' }} Key={note.id}>
                                        <Card.Body>
                                            <Card.Title>{note.subject}</Card.Title>
                                            <Card.Subtitle className="mb-2 text-muted">{Intl.DateTimeFormat('en-US').format(new Date(note.date))}</Card.Subtitle>
                                            <Card.Text>
                                                {note.body}
                                            </Card.Text>
                                            <div style={{ float: 'right' }}><EditNoteModal id={note.id} subject={note.subject} body={note.body} handleUpdateNote={this.updateNoteList} /><DeleteNoteModal id={note.id} handleDeleteNote={this.deleteFromNoteList} /></div>
                                        </Card.Body>
                                    </Card>
                                </Col>

                        )
                    }
                </Row>
            </Container>
        );
    }
    render() {

        return (
            <React.Fragment>
                <nav className='navbar navbar-light bg-light'>
                    <div className='container-fluid'>
                        <span className='navbar-brand mb-0 h1'>NoteMaker</span>
                        <CreateNoteModal handleAddNote={this.updateNoteList} />
                    </div>
                </nav>
                {this.renderNotes()}
            </React.Fragment>
        );
    }



}

export default Notes;