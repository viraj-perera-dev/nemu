import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import './index.css';
import HomePage from './pages/HomePage';


function App() {

  return (
    <div className="App">
      <Router>
        <Routes>
          <Route exact path="/" element={<HomePage />} />
            {/* dynamic routes */}
            {/* {posts.map(post => (
                <Route key={post.Id} exact path={`/notizie/approfondimenti/${post.Id}/${formatToUrlFriendly(post.Metatitle)}`} element={<Approfondimenti/>} />
            ))}
            {posts.map(post => (
                <Route key={post.Id} exact path={`/notizie/rassegna-stampa/${post.Id}/${formatToUrlFriendly(post.Metatitle)}`} element={<RassegnaStampa/>} />
            ))} */}
        </Routes>
      </Router>
    </div>
  );
}

export default App;
 