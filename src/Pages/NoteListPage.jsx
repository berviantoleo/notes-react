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
} from '../utils/local-data';

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
      notes: getNotesByArchived(props.isArchived),
      keyword: props.defaultKeyword || '',
    };
    this.onDeleteHandler = this.onDeleteHandler.bind(this);
    this.onArchiveHandler = this.onArchiveHandler.bind(this);
    this.onKeywordChangeHandler = this.onKeywordChangeHandler.bind(this);
  }

  componentDidUpdate(prevProps) {
    if (prevProps.isArchived !== this.props.isArchived) {
      // update the notes based on updated isArchiveds
      this.setState(() => {
        return {
          notes: getNotesByArchived(this.props.isArchived),
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

  onArchiveHandler(id, isArchivedNote) {
    if (isArchivedNote) {
      unarchiveNote(id);
    } else {
      archiveNote(id);
    }

    this.setState(() => {
      return {
        notes: getNotesByArchived(this.props.isArchived),
      };
    });
  }

  onKeywordChangeHandler(keyword) {
    this.setState(() => {
      return {
        keyword,
      };
    });

    this.props.keywordChange(keyword);
  }

  onDeleteHandler(id) {
    deleteNote(id);

    // update the notes state from data.js
    this.setState(() => {
      return {
        notes: getNotesByArchived(this.props.isArchived),
      };
    });
  }

  render() {
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
  isArchived: PropTypes.bool.isRequired,
  keywordChange: PropTypes.func.isRequired,
};

NoteListPageWrapper.propTypes = {
  isArchived: PropTypes.bool.isRequired,
};

export default NoteListPageWrapper;
