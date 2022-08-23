import moment from 'moment';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

function NoteItem({
  id,
  title,
  createdAt,
  body,
  archived,
  onDelete,
  onArchive,
}) {
  return (
    <div className="column is-4" key={id}>
      <div className="card">
        <div className="card-content">
          <div className="content">
            <Link to={`/notes/${id}`}>
              <h2>{title}</h2>
            </Link>
            <p>{moment(createdAt).format('LLLL')}</p>
            <p>{body}</p>
            <div className="buttons">
              <button
                className="button is-link"
                onClick={() => onArchive(id, archived)}
              >
                {archived ? 'Batal Arsip' : 'Arsip'}
              </button>
              <button className="button is-danger" onClick={() => onDelete(id)}>
                Delete
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

NoteItem.propTypes = {
  id: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  body: PropTypes.string.isRequired,
  createdAt: PropTypes.string.isRequired,
  archived: PropTypes.bool.isRequired,
  onDelete: PropTypes.func.isRequired,
  onArchive: PropTypes.func.isRequired,
};

export default NoteItem;
