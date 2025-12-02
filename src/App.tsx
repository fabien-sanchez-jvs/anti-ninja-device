import { BrowserRouter, Routes, Route } from 'react-router-dom';
import StarView from './pages/StarView';
import Settings from './pages/Settings';
import './App.css';

/**
 * Composant principal de l'application Anti Nija Device
 * Configure le router avec les deux pages principales
 */
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<StarView />} />
        <Route path="/settings" element={<Settings />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

