import React, { useContext } from 'react';
import noteContext from "../context/notes/NoteContext";
import NoteItem from "./NoteItem";

const Notes = () => {
    const context = useContext(noteContext);
    const {notes} = context;
    return(
        <>
            <div className="container my-3">
                <h2>Your Notes</h2>
                <div className="row">
                    {notes.map((note)=> {
                        return <NoteItem key={note._id} note={note}/>;
                    })}
                </div>
            </div>
        </>
    );
};

export default Notes;
