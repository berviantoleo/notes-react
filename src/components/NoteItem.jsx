import moment from 'moment';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { LocaleConsumer } from '../contexts/LocaleContext';

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
    <LocaleConsumer>
      {({ locale }) => {
        return (
          <div className="column is-4" key={id}>
            <div className="card">
              <div className="card-content">
                <div className="content">
                  <Link to={`/notes/${id}`}>
                    <h2 className="card-title-content">{title}</h2>
                  </Link>
                  <p>{moment(createdAt).format('LLLL')}</p>
                  <p>{body}</p>
                  <div className="buttons">
                    <button
                      className="button is-link"
                      onClick={() => onArchive(id, archived)}
                    >
                      {archived
                        ? locale === 'id'
                          ? 'Batal Arsip'
                          : 'Unarchive'
                        : locale === 'id'
                        ? 'Arsip'
                        : 'Archive'}
                    </button>
                    <button
                      className="button is-danger"
                      onClick={() => onDelete(id)}
                    >
                      {locale === 'id' ? 'Hapus' : 'Delete'}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      }}
    </LocaleConsumer>
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
