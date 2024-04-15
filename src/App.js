import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import HomePage from './pages/HomePage';
import MinimalPage from './pages/MinimalPage';
import SmokePage from './pages/SmokePage';
import WaterPage from './pages/WaterPage';
import Azienda from './pages/Azienda';
import Notizie from './pages/Notizie';
import Prodotti from './pages/Prodotti';
import CollaboraConNoi from './pages/CollaboraConNoi';
import Faq from './pages/Faq';
import Contatti from './pages/Contatti';
import Lingotto from './singlePage/Lingotto'; 
import Demo from './pages/Demo';
import Demo2 from './pages/Demo2';
import Approfondimenti from './pages/ApprofondimentiSingle';
import RassegnaStampa from './pages/RassegnaStampaSingle';
import axios from "axios";


function App() {

  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(`https://newgest.careholding.it/blog_ws.axd/?type=GetPosts`,{
              port: 8800
            });
        setPosts(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }, []);

  function formatToUrlFriendly(text) {
    const cleanedText = text
      .toLowerCase() // Convert to lowercase
      .replace(/ /g, '-') // Replace spaces with hyphens
      .replace(/[àáâãäå]/g, 'a') // Replace "à", "á", "â", "ã", "ä", "å" with "a"
      .replace(/[èéêë]/g, 'e') // Replace "è", "é", "ê", "ë" with "e"
      .replace(/[ìíîï]/g, 'i') // Replace "ì", "í", "î", "ï" with "i"
      .replace(/[òóôõö]/g, 'o') // Replace "ò", "ó", "ô", "õ", "ö" with "o"
      .replace(/[ùúûü]/g, 'u') // Replace "ù", "ú", "û", "ü" with "u"
      .replace(/[^a-z0-9-_+]/g, '-') // Remove special characters except hyphens and alphanumeric characters
      .replace(/-{2,}/g, '-'); // Remove consecutive hyphens

        if (cleanedText.endsWith('-')) {
            return cleanedText.slice(0, -1);  
    }return cleanedText;
  }


  return (
    <div className="App">
      <Router>
        <Routes>
          <Route exact path="/" element={<HomePage />} />
          <Route exact path="/azienda" element={<Azienda />} />
          <Route exact path="/notizie" element={<Notizie />} />
          <Route exact path="/prodotti" element={<Prodotti />} />
          <Route exact path="/collabora-con-noi" element={<CollaboraConNoi />} />
          <Route exact path="/faq" element={<Faq />} />
          <Route exact path="/contatti" element={<Contatti />} />
          <Route exact path="/template-minimal" element={<MinimalPage />} />
          <Route exact path="/template-smoke" element={<SmokePage />} />
          <Route exact path="/template-water" element={<WaterPage />} />
          <Route exact path="/lingotto" element={<Lingotto />} />
          <Route exact path="/demo" element={<Demo />} />
          <Route exact path="/demo2" element={<Demo2 />} />

            {/* dynamic routes */}
            {posts.map(post => (
                <Route key={post.Id} exact path={`/notizie/approfondimenti/${post.Id}/${formatToUrlFriendly(post.Metatitle)}`} element={<Approfondimenti/>} />
            ))}
            {posts.map(post => (
                <Route key={post.Id} exact path={`/notizie/rassegna-stampa/${post.Id}/${formatToUrlFriendly(post.Metatitle)}`} element={<RassegnaStampa/>} />
            ))}

        </Routes>
      </Router>
    </div>
  );
}

export default App;
