import { useState } from "react";
import NoteContext from "./NoteContext";

const NoteState = (props) => {
    const host = "http://localhost:5000";
    // hard coding the notes till the frontend is complete
    const notesInitial = [
        {
            "_id": "61a929028bd58779c03ba66e",
            "user": "61a928086da1512a7be0144d",
            "title": "Note 1",
            "description": "this is a note here just testing",
            "tag": "General",
            "date": "2021-12-02T20:13:54.063Z",
            "__v": 0
        },
        {
            "_id": "61a929138bd58779c03ba670",
            "user": "61a928086da1512a7be0144d",
            "title": "Note 2",
            "description": "this is another note here just testing again",
            "tag": "General",
            "date": "2021-12-02T20:14:11.442Z",
            "__v": 0
        },
        {
            "_id": "61a92f028bd58779c03ba66e",
            "user": "61a928086da1512a7be0144d",
            "title": "Note 1",
            "description": "this is a note here just testing",
            "tag": "General",
            "date": "2021-12-02T20:13:54.063Z",
            "__v": 0
        },
        {
            "_id": "61a92913wbd58779c03ba670",
            "user": "61a928086da1512a7be0144d",
            "title": "Note 2",
            "description": "this is another note here just testing again",
            "tag": "General",
            "date": "2021-12-02T20:14:11.442Z",
            "__v": 0
        },
        {
            "_id": "61a929028bd58779c03aa66e",
            "user": "61a928086da1512a7be0144d",
            "title": "Note 1",
            "description": "this is a note here just testing",
            "tag": "General",
            "date": "2021-12-02T20:13:54.063Z",
            "__v": 0
        },
        {
            "_id": "61a929138bd58779cd3ba670",
            "user": "61a928086da1512a7be0144d",
            "title": "Note 2",
            "description": "this is another note here just testing again",
            "tag": "General",
            "date": "2021-12-02T20:14:11.442Z",
            "__v": 0
        },
    ];
    const [notes, setNotes] = useState(notesInitial);

    // Add a note
    const addNote = (title, description, tag) => {
        // TODO: API call
        // hardcoding for now
        console.log('adding a new note');
        const note = {
            "_id": "61a929138bd58772cd3ba670",
            "user": "61a928086da1512a7be0144d",
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
    const deleteNote = (id) => {
        // TODO: API call 
        console.log('deleting the note with id ' + id);
        const newNotes = notes.filter((note)=>{return note._id!==id;});
        setNotes(newNotes);
    };

    // Edit a note
    const editNote = async (id, title, description, tag) => {
        // API call
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });
        return response.json();


        for(let i=0; i<notes.length; i++) {
            const element = notes[i];
            if(element._id === id) {
                elemnet.title = title;
                elemnet.description = description;
                elemnet.tag = tag;
            }
        }
    };

    // exporting notes and setnotes as context to access everywhere
    return (
        <NoteContext.Provider value={{notes, setNotes, addNote, deleteNote, editNote}}>
          {props.children}
        </NoteContext.Provider>
    );
};

export default NoteState;
