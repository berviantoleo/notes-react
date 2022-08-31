import { Routes, Route } from 'react-router-dom';
import Navigation from './components/Navigation';
import NoteDetailPage from './Pages/NoteDetailPage';
import NewNotePage from './Pages/NewNotePage';
import NotFoundPage from './Pages/NotFoundPage';
import HomePage from './Pages/HomePage';
import ArchivePage from './Pages/ArchivePage';
import RegisterPage from './Pages/RegisterPage';
import LoginPage from './Pages/LoginPage';
import { useEffect, useState } from 'react';
import { getUserLogged, putAccessToken } from './utils/network-data';
import { ThemeProvider } from './contexts/ThemeContext';
import { LocaleProvider } from './contexts/LocaleContext';

function App() {
  const [authedUser, setAuthedUser] = useState(null);
  const [isInit, setIsInit] = useState(true);
  const [theme, setTheme] = useState(localStorage.getItem('theme') || 'light');
  const [locale, setLocale] = useState(localStorage.getItem('locale') || 'id');

  useEffect(() => {
    async function setupUser() {
      const { data } = await getUserLogged();
      setAuthedUser(data);
      setIsInit(false);
    }
    setupUser();
  }, []);

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  function toggleTheme() {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    localStorage.setItem('theme', newTheme);
  }

  function toggleLocale() {
    const newLocale = locale === 'id' ? 'en' : 'id';
    setLocale(newLocale);
    localStorage.setItem('locale', newLocale);
  }

  async function onLoginSuccess({ accessToken }) {
    putAccessToken(accessToken);
    const { data } = await getUserLogged();
    setAuthedUser(data);
  }

  function onLogout() {
    setAuthedUser(null);
    putAccessToken('');
  }

  if (isInit) {
    return (
      <p className="has-text-centered title">
        {locale === 'id'
          ? 'Sedang menginisiasi...'
          : 'Initiate App. Please wait...'}
      </p>
    );
  }

  return (
    <ThemeProvider value={{ theme, toggleTheme }}>
      <LocaleProvider value={{ locale, toggleLocale }}>
        <Navigation isLogin={!!authedUser} logout={onLogout} />
        <main>
          {!authedUser ? (
            <Routes>
              <Route
                path="/*"
                element={<LoginPage loginSuccess={onLoginSuccess} />}
              />
              <Route path="/register" element={<RegisterPage />} />
            </Routes>
          ) : (
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/register" element={<RegisterPage />} />
              <Route path="/notes/archived" element={<ArchivePage />} />
              <Route path="/notes/new" element={<NewNotePage />} />
              <Route path="/notes/:id" element={<NoteDetailPage />} />
              <Route path="*" element={<NotFoundPage />} />
            </Routes>
          )}
        </main>
      </LocaleProvider>
    </ThemeProvider>
  );
}

export default App;
