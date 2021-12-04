import React, { useState, useContext } from "react";
import noteContext from "../context/notes/NoteContext";

const AddNote = (props) => {
    const context = useContext(noteContext);
    const { addNote } = context;

    const [note, setNote] = useState({title: "", description: "", tag: "default"});

    const handleClick = (e) => {
        e.preventDefault();
        addNote(note.title, note.description, note.tag);
    };

    const onChange = (e) => {
        // setting the target's names to the value being typed in realtime
        setNote({...note, [e.target.name]: e.target.value});
    };
    return (
        <>
          <div className="container m-2">
            <h2>Add a Note</h2>
            <form className="my-3">
              <div className="mb-3">
                <label htmlFor="title" className="form-label">Title</label>
                <input type="text" className="form-control" id="title" name="title" onChange={onChange} />
              </div>
              <div className="mb-3">
                <label htmlFor="description" className="form-label">Description</label>
                <input type="text" className="form-control" id="description" name="description" onChange={onChange} />
              </div>
              <div className="mb-3">
                <label htmlFor="tag" className="form-label">Tag</label>
                <input type="text" className="form-control" id="tag" name="tag" onChange={onChange} />
              </div>
              <button type="submit" className="btn btn-primary" onClick={handleClick}>Add Note</button>
            </form>
          </div>
        </>
    );
};

export default AddNote;
