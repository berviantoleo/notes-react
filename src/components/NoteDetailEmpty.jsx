import { LocaleConsumer } from '../contexts/LocaleContext';
export default function NoteDetailEmpty() {
  return (
    <LocaleConsumer>
      {({ locale }) => {
        return (
          <div className="section">
            <div className="content">
              <h1>
                {locale === 'id' ? 'Catatan Tidak Ditemukan' : 'Note Not Found'}
              </h1>
            </div>
          </div>
        );
      }}
    </LocaleConsumer>
  );
}
