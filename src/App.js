import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import './index.css';
import HomePage from './pages/HomePage';
import MenuType from './pages/MenuType';
import SingleMenu from './pages/SingleMenu';
import MenuCategory from './pages/CategoryMenu';


function App() {

  return (
    <div className="App">
      <Router>
        <Routes>
          <Route exact path="/" element={<HomePage />} />
          <Route exact path="/menu/:menuType" element={<MenuType />} />
          <Route exact path="/menu/:menuType/:menuId" element={<SingleMenu />} />
          <Route exact path="/menu/:menuType/:menuId/:categoryId" element={<MenuCategory />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
 