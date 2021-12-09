import React, { useContext } from 'react';
import noteContext from "../context/notes/NoteContext";

const NoteItem = (props) => {
    // context import
    const context = useContext(noteContext);
    const { deleteNote } = context;
    const { note, updateNote } = props;
    return (
        <>
          <div className="card m-3" style={{ width: "24rem" }}>
            <div className="card-body">
              <h5 className="card-title">{note.title}</h5>
              <p className="card-text">{note.description}</p>
              <i className="far fa-trash-alt m-2" onClick={() => { deleteNote(note._id); }}></i>
              <i className="far fa-edit" onClick={() => { updateNote(note); }}></i>
            </div>
          </div>
        </>
    );
};

export default NoteItem;
