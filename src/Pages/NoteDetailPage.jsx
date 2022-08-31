import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import PropTypes from 'prop-types';
import NoteDetail from '../components/NoteDetail';
import {
  getNote,
  deleteNote,
  unarchiveNote,
  archiveNote,
} from '../utils/network-data';
import NoteDetailEmpty from '../components/NoteDetailEmpty';
import Loading from '../components/Loading';

function NoteDetailPageWrapper() {
  const { id } = useParams();
  const navigate = useNavigate();
  return <NoteDetailPage id={id} navigate={navigate} />;
}

class NoteDetailPage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      note: null,
      isLoading: true,
    };
    this.onDeleteHandler = this.onDeleteHandler.bind(this);
    this.onArchiveHandler = this.onArchiveHandler.bind(this);
  }

  async componentDidMount() {
    const { error, data: note } = await getNote(this.props.id);
    if (!error) {
      this.setState(() => {
        return {
          note,
          isLoading: false,
        };
      });
    } else {
      this.setState(() => {
        return {
          isLoading: false,
        };
      });
    }
  }

  async onDeleteHandler(id) {
    const { error } = await deleteNote(id);
    if (!error) {
      this.props.navigate('/');
    }
  }

  async onArchiveHandler(id, archived) {
    const { error } = await (archived ? unarchiveNote(id) : archiveNote(id));
    if (!error) {
      const { error, data: note } = await getNote(this.props.id);
      if (!error) {
        this.setState(() => {
          return {
            note,
          };
        });
      }
    }
  }

  render() {
    if (this.state.isLoading) {
      return <Loading />;
    }

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
