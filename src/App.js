import React, { useState } from 'react';
import './App.css';
import Menu from './components/Steps';
import data from './data/dishes.json';

function App() {
  const [dishes] = useState(data.dishes);

  return (
    <div className="App">
      <Menu dishes={dishes} />
    </div>
  );
}

export default App;
