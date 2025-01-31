import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import AppFrame from './components/AppFrame';
import Map from './pages/Map';
import Report from './pages/Report';
import SOS from './pages/SOS';
import About from './pages/About';
import Donate from './pages/Donate';
import Account from './pages/Account';

function App() {
  return (
    <Router>
      <AppFrame>
        <Routes>
          <Route path="/" element={<Map />} />
          <Route path="/report" element={<Report />} />
          <Route path="/sos" element={<SOS />} />
          <Route path="/about" element={<About />} />
          <Route path="/donate" element={<Donate />} />
          <Route path="/account" element={<Account />} />
        </Routes>
      </AppFrame>
    </Router>
  );
}

export default App;
