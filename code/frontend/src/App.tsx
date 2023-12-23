import React from 'react';
import { Routes, Route } from 'react-router-dom';
import './App.css';
import PredictPage from './components/PredictPage';


const App = () => {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<PredictPage />} />
      </Routes>
    </div>
  );
}

export default App;
