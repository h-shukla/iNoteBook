import { useState } from "react";
import NoteContext from "./NoteContext";

const NoteState = (props) => {
    const host = "http://localhost:5000";
    const notesInitial = [];
    const [notes, setNotes] = useState(notesInitial);

    // Get all note
    const getNotes = async () => {
	const response = await fetch(`${host}/api/notes/fetchallnotes`, {
	    method: 'GET',
	    headers: {
		'Content-Type': 'application/json',
		'auth-token': localStorage.getItem('token')
	    },
	});
	const json = await response.json();
	// console.log(json);
	setNotes(json);
    };

    // Add a note
    const addNote = async (title, description, tag) => {
	const response = await fetch(`${host}/api/notes/addnote`, {
	    method: 'POST',
	    headers: {
		'Content-Type': 'application/json',
		'auth-token': localStorage.getItem('token')
	    },
	    body: JSON.stringify({ title, description, tag })
	});
        // eslint-disable-next-line
	const json = response.json();
	const note = {
	    "title": title,
	    "description": description,
	    "tag": tag,
	    "date": "2021-12-02T20:14:11.442Z",
	    "__v": 0
	};
	// push updates an array
	// concat returns an array
	setNotes(notes.concat(note));
    };

    // Delete a note
    const deleteNote = async (id) => {
	// API call
	const url = `${host}/api/notes/deletenote/${id}`;
	const response = await fetch(url, {
	    method: 'DELETE',
	    headers: {
		'Content-Type': 'application/json',
		'auth-token': localStorage.getItem('token')
	    },
	});
        // eslint-disable-next-line
	const json = response.json();
	const newNotes = notes.filter((note) => { return note._id !== id; });
	setNotes(newNotes);
    };

    // Edit a note
    const editNote = async (id, title, description, tag) => {
	// API call done here
	const url = `${host}/api/notes/updatenote/${id}`;
	const response = await fetch(url, {
	    method: 'PUT',
	    headers: {
		'Content-Type': 'application/json',
		'auth-token': localStorage.getItem('token')
	    },
	    body: JSON.stringify({title, description, tag})
	});
        // eslint-disable-next-line
	const json = await response.json();

	for (let i = 0; i < notes.length; i++) {
	    const element = notes[i];
	    if (element._id === id) {
		element.title = title;
		element.description = description;
		element.tag = tag;
	    }
	}
    };

    // exporting notes and setnotes as context to access everywhere
    return (
	<NoteContext.Provider value={{ notes, setNotes, getNotes, addNote, deleteNote, editNote }}>
	  {props.children}
	</NoteContext.Provider>
    );
};

export default NoteState;

