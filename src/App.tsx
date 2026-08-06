import { Route, Routes } from 'react-router-dom';
import PageShell from './components/layout/PageShell';
import About from './pages/About';
import Armory from './pages/Armory';
import Contact from './pages/Contact';
import Home from './pages/Home';
import Join from './pages/Join';
import Media from './pages/Media';
import Operations from './pages/Operations';
import Roster from './pages/Roster';
import Rules from './pages/Rules';

export default function App() {
  return (
    <PageShell>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/join" element={<Join />} />
        <Route path="/operations" element={<Operations />} />
        <Route path="/armory" element={<Armory />} />
        <Route path="/roster" element={<Roster />} />
        <Route path="/rules" element={<Rules />} />
        <Route path="/media" element={<Media />} />
        <Route path="/contact" element={<Contact />} />
      </Routes>
    </PageShell>
  );
}
