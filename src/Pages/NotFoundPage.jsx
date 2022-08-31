import { LocaleConsumer } from '../contexts/LocaleContext';

function NotFoundPage() {
  return (
    <LocaleConsumer>
      {({ locale }) => {
        return (
          <div className="section">
            <div className="content">
              <h1>
                {locale === 'id' ? 'Halaman Tidak Ditemukan' : 'Page Not Found'}
              </h1>
            </div>
          </div>
        );
      }}
    </LocaleConsumer>
  );
}

export default NotFoundPage;
