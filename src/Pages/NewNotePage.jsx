import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { addNote } from '../utils/local-data';

function NewNotePage() {
  const navigate = useNavigate();
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');

  function onSubmit() {
    addNote({ title, body });
    navigate('/');
  }

  return (
    <section className="section">
      <div className="card">
        <div className="card-header">
          <div className="card-header-title">
            <h2>Add New Note</h2>
          </div>
        </div>
        <div className="card-content">
          <div className="content">
            <form onSubmit={onSubmit}>
              <div className="field">
                <label className="label">Title</label>
                <div className="control">
                  <input
                    className="input"
                    type="text"
                    name="title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    required
                  />
                </div>
              </div>
              <div className="field">
                <label className="label">Body</label>
                <textarea
                  className="textarea"
                  name="body"
                  value={body}
                  onChange={(e) => setBody(e.target.value)}
                  required
                />
              </div>
              <input
                className="button is-success"
                type="submit"
                value="Add Note"
              />
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}

export default NewNotePage;
