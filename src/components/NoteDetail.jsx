import moment from 'moment';
import PropTypes from 'prop-types';
import { LocaleConsumer } from '../contexts/LocaleContext';

function NoteDetail({
  id,
  title,
  body,
  createdAt,
  archived,
  onDelete,
  onArchive,
}) {
  return (
    <LocaleConsumer>
      {({ locale }) => {
        return (
          <div className="section">
            <div className="content">
              <h2>{title}</h2>
              <p>{moment(createdAt).format('LLLL')}</p>
              <p>{body}</p>
              <p>{archived}</p>
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
        );
      }}
    </LocaleConsumer>
  );
}

NoteDetail.propTypes = {
  id: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  body: PropTypes.string.isRequired,
  createdAt: PropTypes.string.isRequired,
  archived: PropTypes.bool.isRequired,
  onDelete: PropTypes.func.isRequired,
  onArchive: PropTypes.func.isRequired,
};

export default NoteDetail;
