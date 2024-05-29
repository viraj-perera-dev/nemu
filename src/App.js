import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import './index.css';
import HomePage from './pages/HomePage';
import MenuType from './pages/MenuType';
import SingleMenu from './pages/SingleMenu';
import Restourant from './pages/Restourant';


function App() {

  return (
    <div className="App">
      <Router>
        <Routes>
          <Route exact path="/" element={<HomePage />} />
          <Route exact path="/menu" element={<Restourant />} />
          <Route exact path="/menu/:menuType" element={<MenuType />} />
          <Route exact path="/menu/:menuType/:menuId" element={<SingleMenu />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
 