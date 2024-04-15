import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";


function Menu({idCategory, postId}) {

  const [posts,setPosts] = useState([]);
  const cat = useLocation().search;
  const isMobile = window.innerWidth <= 768;
  const [isUpdating, setIsUpdating] = useState(false);



  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(`https://crm.careholding.it/ws/Call/?Cat=Blog&met=GetPostsBlog&np=0`);
        const filteredPosts = res.data.filter(post => post.IdCategory === idCategory && post.Id != postId);
        const sortedPosts = filteredPosts.sort((a, b) => (b.Rel + b.Share) - (a.Rel + a.Share));
        const limitedPosts = sortedPosts.slice(0, isMobile ? 2 : 3);
        setPosts(limitedPosts);
        handleReloadClick();
      } catch (err) {
        console.log(err);
      }
      setIsUpdating(false);
    };
    
    fetchData();

  }, [ cat, idCategory, postId]);



  const handleUpdateClick = async () => {
    try {
      const res = await axios.get(`https://crm.careholding.it/ws/Call/?Cat=Blog&met=GetPostsBlog&np=0`);
      const filteredPosts = res.data.filter(post => post.IdCategory === idCategory && post.Id != postId);
      const sortedPosts = filteredPosts.sort((a, b) => b.Rel - a.Rel);
      const limitedPosts = sortedPosts.slice(0, isMobile ? 2 : 3);
      setPosts(limitedPosts);
    } catch (err) {
      console.log(err);
    }
  };
  

  const handleReloadClick = async () => {
    window.scrollTo(0, 0);  
    setIsUpdating(true);
    await handleUpdateClick();
    setIsUpdating(false);
  };

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
  <div>
      <div className="text-center mt-4 mt-md-0">
          <p className="text-dark fs-5 text-opacity-75">Altri articoli che ti potrebbero piacere...</p>
      </div>

          <div className="container-fluid">
            <div className="row d-flex justify-content-center align-items-center">
              {posts.map( post => {
                if(post.Stato === 1){
                  return(
                    <div className="col-md-2 col-6 text-center m-md-5 my-3" key={post.Id}>
                      <Link className="text-decoration-none" onClick={handleReloadClick} to={`/notizie/approfondimenti/${post.Id}/${formatToUrlFriendly(post.Metatitle)}`}>
                      <img src={`${post?.ImgCopertina}`} className="img-fluid rounded" alt="immagine copertina" />  
                      <p className="text-default mt-4 fs-4 fw-bold collapsed2">{post.Titolo}</p>
                      <p className="text-dark collapsed">{post.Subtitle}</p>
                      <button className="btn btn-default py-2 px-4">Leggi di più</button>
                      </Link>
                    </div>
                  )
                }
              })}
            </div>    
          </div>          
  </div>
)
}

export default Menu