import React, { useContext, useEffect, useRef, useState } from 'react';
import { Navigate } from 'react-router-dom';
import noteContext from "../context/notes/NoteContext";
import NoteItem from "./NoteItem";
import AddNote from "./AddNote";

const Notes = (props) => {
    const context = useContext(noteContext);
    const { notes, getNotes, editNote } = context;
    // const navigate = useNavigate();
    const [note, setNote] = useState({ id: "", etitle: "", edescription: "", etag: "" });

    useEffect(() => {
      /*
      if (localStorage.getItem('token')) {
        getNotes();
      } else {
        navigate('../login', { replace: true})
      }
      */
      getNotes();
      // eslint-disable-next-line
    }, []);

    const openRef = useRef(null);
    const closeRef = useRef(null);

    const updateNote = (currentNote) => {
        openRef.current.click();
        getNotes();
        setNote({ id: currentNote._id, etitle: currentNote.title, edescription: currentNote.description, etag: currentNote.tag });
        props.showAlert('Note updated successfully', 'success');
    };

    const handleClick = (e) => {
        // console.log("Updating the note " + note);
        editNote(note.id, note.etitle, note.edescription, note.etag);
        getNotes();
        closeRef.current.click();
    };

    const onChange = (e) => {
        // setting the target's names to the value being typed in realtime
        setNote({ ...note, [e.target.name]: e.target.value });
    };

    return (
        <>
          <AddNote showAlert={props.showAlert} />
          <button ref={openRef} type="button" className="btn btn-primary d-none" data-bs-toggle="modal" data-bs-target="#exampleModal">
            Launch demo modal
          </button>

          <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div className="modal-dialog">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title" id="exampleModalLabel">Edit Note</h5>
                </div>
                <div className="modal-body">
                  <form className="my-3">
                    <div className="mb-3">
                      <label htmlFor="etitle" className="form-label">Title</label>
                      <input type="text" className="form-control" id="etitle" name="etitle" value={note.etitle} onChange={onChange} minLength={5} required />
                    </div>
                    <div className="mb-3">
                      <label htmlFor="edescription" className="form-label">Description</label>
                      <input type="text" className="form-control" id="edescription" name="edescription" value={note.edescription} onChange={onChange} minLength={5} required />
                    </div>
                    <div className="mb-3">
                      <label htmlFor="etag" className="form-label">Tag</label>
                      <input type="text" className="form-control" id="etag" name="etag" value={note.etag} onChange={onChange} />
                    </div>
                  </form>

                </div>
                <div className="modal-footer">
                  <button ref={closeRef} type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                  <button type="button" className="btn btn-primary" onClick={handleClick}>Save changes</button>
                </div>
              </div>
            </div>
          </div>

          <div className="container my-3">
            <h2>Your Notes</h2>
            <div className="container row">
              {(localStorage.getItem('token')!==null) ? (notes.map((note) => {
                  return <NoteItem key={note._id} updateNote={updateNote} note={note} />;
              })) : <Navigate to="/login" replace={true} />}
            </div>
          </div>
        </>
    );
};

export default Notes;

// minLength is required to resolve cors policy error
