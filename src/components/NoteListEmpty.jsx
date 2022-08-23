import PropTypes from 'prop-types';

function NoteListEmpty({ isArchived }) {
  return (
    <div className="section">
      <div className="content">
        <h2>{isArchived ? 'Arsip kosong' : 'Tidak ada catatan'}</h2>
      </div>
    </div>
  );
}

NoteListEmpty.propTypes = {
  isArchived: PropTypes.bool.isRequired,
};

export default NoteListEmpty;
