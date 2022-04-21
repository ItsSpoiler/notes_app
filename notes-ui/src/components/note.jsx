import React, { Component, useEffect } from 'react';
import { useState, setState } from 'react';
import { Link } from "react-router-dom";
import {
    useParams,
    useNavigate,
    useLocation,
} from "react-router-dom";
import { Card } from "react-bootstrap";
import EditNoteModal from './editNoteModal';
import DeleteNoteModal from './deleteNoteModal';



export default function Note() {
    useEffect(() => {
        fetchNote();
    }, []);
    let [note, setNote] = useState({});
    let navigate = useNavigate();
    let location = useLocation();
    let params = useParams();
    const fetchNote = async () => {
        const fetchNote = await fetch(`https://localhost:5001/note/${params.id}`).then((note) => 
            note.json()
        ).then((note) => {
            console.log(note);
            setNote(note);
        });
    }

    let center = {
        margin: 'auto',
        width: '50%',
        border: '3px solid green',
        padding: '10px',
        marginTop: '1%'
    };

    const updateNote = (data) => {
        const newNote = data;
        note = data;
        window.location.reload(false);
    }

    const deleteNote = (data) => {
        note = {};
        window.location.reload(false);
    }

    if (note.status === 404) {

        return (
            <React.Fragment>
                <nav className='navbar navbar-light bg-light'>
                    <div className='container-fluid'>
                        <Link style={{ textDecoration: 'none' }} to='/'><span className='navbar-brand mb-0 h1'>NoteMaker</span></Link>
                    </div>
                </nav>
                <p className='alert alert-danger' style={{ textAlign: 'center' }}> This Note Does Not Exist...</p>
            </React.Fragment>
        );
    } else {
        return (

            <React.Fragment>
                <nav className='navbar navbar-light bg-light'>
                    <div className='container-fluid'>
                        <Link style={{ textDecoration: 'none' }} to='/'><span className='navbar-brand mb-0 h1'>NoteMaker</span></Link>
                    </div>
                </nav>
                <Card style={center}>
                    <Card.Title>{note.subject}</Card.Title>
                    <Card.Subtitle className="mb-2 text-muted">{Intl.DateTimeFormat('en-US').format(new Date(note.date ?? new Date()))}</Card.Subtitle>
                    <Card.Text>
                        {note.body}
                    </Card.Text>
                    <div style={{ float: 'right' }}><EditNoteModal id={note.id} subject={note.subject} body={note.body} handleUpdateNote={updateNote} /><DeleteNoteModal id={note.id} handleDeleteNote={deleteNote} /></div>
                </Card>
            </React.Fragment>

        );

    }
}



// componentDidMount() {
//     axios.get(`https://localhost:5001/note/${this.props.id}`)
//         .then(response => {
//             this.setState({ note: response.data });
//         });
// }