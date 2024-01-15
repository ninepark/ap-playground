import logo from './logo.svg';
import './App.css';
import { Route, Routes } from 'react-router-dom';
import TakePhotos from './pages/TakePhotos';

function App() {
  return (
    <div>
      <Routes>
        <Route path='/' element={<TakePhotos />} />
      </Routes>
    </div>
  );
}

export default App;
