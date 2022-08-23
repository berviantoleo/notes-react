import { Routes, Route } from 'react-router-dom';
import Navigation from './components/Navigation';
import NoteDetailPage from './Pages/NoteDetailPage';
import NewNotePage from './Pages/NewNotePage';
import NotFoundPage from './Pages/NotFoundPage';
import HomePage from './Pages/HomePage';
import ArchivePage from './Pages/ArchivePage';

function App() {
  return (
    <>
      <Navigation />
      <main>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/notes/archived" element={<ArchivePage />} />
          <Route path="/notes/new" element={<NewNotePage />} />
          <Route path="/notes/:id" element={<NoteDetailPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </main>
    </>
  );
}

export default App;
