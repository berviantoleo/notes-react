import PropTypes from 'prop-types';
import NoteItem from './NoteItem';
import NoteListEmpty from './NoteListEmpty';

function NoteList({ isArchived, notes, onDelete, onArchive }) {
  if (notes === null || notes.length === 0) {
    return <NoteListEmpty isArchived={isArchived} />;
  }
  return (
    <div className="columns is-multiline">
      {notes.map((note) => (
        <NoteItem
          key={note.id}
          onArchive={onArchive}
          onDelete={onDelete}
          {...note}
        />
      ))}
    </div>
  );
}

NoteList.prototype = {
  isArchived: PropTypes.bool.isRequired,
  notes: PropTypes.arrayOf({
    id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    body: PropTypes.string.isRequired,
    createdAt: PropTypes.string.isRequired,
    archived: PropTypes.bool.isRequired,
  }),
  onArchive: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
};

export default NoteList;
