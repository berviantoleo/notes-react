import PropTypes from 'prop-types';
import { LocaleConsumer } from '../contexts/LocaleContext';

function NoteListEmpty({ isArchived }) {
  return (
    <LocaleConsumer>
      {({ locale }) => {
        return (
          <div className="section">
            <div className="content">
              <h2>
                {isArchived
                  ? locale === 'id'
                    ? 'Arsip kosong'
                    : 'Empty Archives'
                  : locale === 'id'
                  ? 'Tidak ada catatan'
                  : 'Empty Notes'}
              </h2>
            </div>
          </div>
        );
      }}
    </LocaleConsumer>
  );
}

NoteListEmpty.propTypes = {
  isArchived: PropTypes.bool,
};

export default NoteListEmpty;
