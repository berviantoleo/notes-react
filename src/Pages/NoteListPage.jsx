import React from 'react';
import { useSearchParams } from 'react-router-dom';
import PropTypes from 'prop-types';
import NoteList from '../components/NoteList';
import SearchInput from '../components/SearchInput';
import {
  archiveNote,
  deleteNote,
  getNotesByArchived,
  unarchiveNote,
} from '../utils/network-data';
import Loading from '../components/Loading';

function NoteListPageWrapper({ isArchived }) {
  const [searchParams, setSearchParams] = useSearchParams();
  const keyword = searchParams.get('keyword');
  function changeSearchParams(keyword) {
    setSearchParams({ keyword });
  }

  return (
    <NoteListPage
      defaultKeyword={keyword}
      isArchived={isArchived}
      keywordChange={changeSearchParams}
    />
  );
}

class NoteListPage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      notes: [],
      keyword: props.defaultKeyword || '',
      isLoading: true,
    };
    this.onDeleteHandler = this.onDeleteHandler.bind(this);
    this.onArchiveHandler = this.onArchiveHandler.bind(this);
    this.onKeywordChangeHandler = this.onKeywordChangeHandler.bind(this);
  }

  async componentDidMount() {
    const { data: notes } = await getNotesByArchived(this.props.isArchived);
    this.setState({ notes, isLoading: false });
  }

  async componentDidUpdate(prevProps) {
    if (prevProps.isArchived !== this.props.isArchived) {
      const { data: notes } = await getNotesByArchived(this.props.isArchived);
      // update the notes based on updated isArchiveds
      this.setState(() => {
        return {
          notes,
        };
      });
    }
    if (prevProps.defaultKeyword !== this.props.defaultKeyword) {
      this.setState(() => {
        return {
          keyword: this.props.defaultKeyword || '',
        };
      });
    }
  }

  async onArchiveHandler(id, isArchivedNote) {
    const { error } = await (isArchivedNote
      ? unarchiveNote(id)
      : archiveNote(id));
    if (!error) {
      const { error, data: notes } = await getNotesByArchived(
        this.props.isArchived
      );
      if (!error) {
        this.setState(() => {
          return { notes };
        });
      }
    }
  }

  onKeywordChangeHandler(keyword) {
    this.setState(() => {
      return {
        keyword,
      };
    });

    this.props.keywordChange(keyword);
  }

  async onDeleteHandler(id) {
    const { error } = await deleteNote(id);

    if (!error) {
      const { error, data: notes } = await getNotesByArchived(
        this.props.isArchived
      );
      if (!error) {
        this.setState(() => {
          return { notes };
        });
      }
    }
  }

  render() {
    if (this.state.isLoading) {
      return <Loading />;
    }
    const notes = this.state.notes.filter((note) => {
      const keywordLowerCase = this.state.keyword.toLowerCase();
      return (
        note.title.toLowerCase().includes(keywordLowerCase) ||
        note.body.toLowerCase().includes(keywordLowerCase)
      );
    });
    return (
      <section className="section">
        <SearchInput
          keyword={this.state.keyword}
          keywordChange={this.onKeywordChangeHandler}
        />
        <section className="section">
          <NoteList
            isArchived={this.props.isArchived}
            notes={notes}
            onDelete={this.onDeleteHandler}
            onArchive={this.onArchiveHandler}
          />
        </section>
      </section>
    );
  }
}

NoteListPage.propTypes = {
  defaultKeyword: PropTypes.string,
  isArchived: PropTypes.bool,
  keywordChange: PropTypes.func.isRequired,
};

NoteListPageWrapper.propTypes = {
  isArchived: PropTypes.bool,
};

export default NoteListPageWrapper;
