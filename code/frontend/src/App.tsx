import React from 'react';
import { Routes, Route } from 'react-router-dom';
import './App.css';
import PredictPage from './components/PredictPage';
import InitExperiment from './components/InitExperiment';


const App = () => {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<PredictPage />} />
        <Route path="/init_experiment" element={<InitExperiment />} />
      </Routes>
    </div>
  );
}

export default App;
