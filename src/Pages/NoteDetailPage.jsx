import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import PropTypes from 'prop-types';
import NoteDetail from '../components/NoteDetail';
import {
  getNote,
  deleteNote,
  unarchiveNote,
  archiveNote,
} from '../utils/local-data';
import NoteDetailEmpty from '../components/NoteDetailEmpty';

function NoteDetailPageWrapper() {
  const { id } = useParams();
  const navigate = useNavigate();
  return <NoteDetailPage id={id} navigate={navigate} />;
}

class NoteDetailPage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      note: getNote(props.id),
    };
    this.onDeleteHandler = this.onDeleteHandler.bind(this);
    this.onArchiveHandler = this.onArchiveHandler.bind(this);
  }

  onDeleteHandler(id) {
    deleteNote(id);
    this.props.navigate('/');
  }

  onArchiveHandler(id, archived) {
    if (archived) {
      unarchiveNote(id);
    } else {
      archiveNote(id);
    }
    this.setState(() => {
      return {
        note: getNote(this.props.id),
      };
    });
  }

  render() {
    if (!this.state.note) {
      return <NoteDetailEmpty />;
    }

    return (
      <section>
        <NoteDetail
          {...this.state.note}
          onDelete={this.onDeleteHandler}
          onArchive={this.onArchiveHandler}
        />
      </section>
    );
  }
}

NoteDetailPage.propTypes = {
  id: PropTypes.string.isRequired,
  navigate: PropTypes.func.isRequired,
};

export default NoteDetailPageWrapper;
