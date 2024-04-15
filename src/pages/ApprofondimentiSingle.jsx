import React, { useEffect, useRef, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import axios from 'axios';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { Helmet } from 'react-helmet';
import { ScrollParallax } from "react-just-parallax";
import { SlArrowDown } from 'react-icons/sl';
import { FaLinkedin, FaFacebook, FaWhatsapp } from 'react-icons/fa';


function Post({idCategory, postId}) {

  const [posts,setPosts] = useState([]);
  const cat = useLocation().search;
  const isMobile = window.innerWidth <= 768;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(`https://crm.careholding.it/ws/Call/?Cat=Blog&met=GetPostsBlog&np=0`);
        const filteredPosts = res.data.filter(post => post.IdCategory === idCategory && post.Id != postId);
        const sortedPosts = filteredPosts.sort((a, b) => (b.Rel + b.Share) - (a.Rel + a.Share));
        const limitedPosts = sortedPosts.slice(0, isMobile ? 2 : 3);
        setPosts(limitedPosts);
      } catch (err) {
        console.log(err);
      }
    };
    
    fetchData();

  }, [ cat, idCategory, postId]);

  return (
    <>
    {posts.map( post => {
      if(post.Stato === 1){
        return(
          <Link to={`/notizie/${post.RewriteUrl}`}>
            <div className="flex flex-col justify-center align-center grayscale hover:grayscale-0 transition duration-1000 ease-in- w-72">
              <img src={post.ImgCopertina} alt={post.Titolo} className="w-full object-contain mb-4" />
              <h2 className="text-lg font-semibold mb-2">{post.Titolo}</h2>
              <p className="text-sm text-gray-600 mb-4 line-clamp-2">{post.Subtitle}</p>
            </div>
          </Link>
        )
      }
    })}
    </>
  );
}


const Single = () => {
  const [postNew, setPostNew] = useState({});
  const location = useLocation();
  const postId = location.pathname.split("/")[3]
  const postUrl = `${window.location.origin}/#${location.pathname}`;

  const textRef = useRef(null);

  const createMarkup = (htmlContent) => {
    return {__html: htmlContent};
};

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.post(`https://crm.careholding.it/ws/Call/?Cat=Blog&met=GetPost&np=1`,{
          id: postId
        });
        setPostNew(response.data);
      } catch (error) {
        console.error('An error occurred:', error);
      }
    };
    fetchData();
    console.log(postId)
  }, [postId]);


  useEffect(() => {
    if (textRef.current) {
      const textContainer = textRef.current;
      const parentContainer = textContainer.parentElement;
      const parentHeight = parentContainer.offsetHeight;
      const textHeight = textContainer.offsetHeight;

      if (textHeight > parentHeight) {
        const overflow = textHeight - parentHeight;
        const remainingText = textContainer.innerHTML.substr(0, overflow);
        textContainer.innerHTML = remainingText;
      }
    }
  }, [postNew.Testo]);
      

  const nextSectionRef = useRef(null);

  // Function to scroll to the next section
  const scrollToNextSection = () => {
    nextSectionRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const openShareWindow = (url) => {
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  return (
    <>
      <Helmet >
        <title>{`Careisgold SpA: ${postNew.Metatitle}`}</title>
        <meta name="description" content={postNew.Metadescription} />
        <meta name="keywords" content={postNew.Keyword} />

        <meta property="og:title" content={postNew.Metatitle} />
        <meta property="og:description" content={postNew.Metadescription} />
        <meta property="og:url" content={`https://careisgold.it/notizie/${postNew.RewriteUrl}`} />
        <meta property="og:type" content="article" />
        <meta name="author" content="careisgold s.p.a" />

        <link rel="canonical" href={`https://careisgold.it/notizie/${postNew.RewriteUrl}`} />

        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "http://schema.org",
            "@type": "BlogPosting",
            "headline": postNew.Metatitle,
            "description": postNew.Metadescription,
            "image": postNew.ImgCopertina,
            "url": `https://careisgold.it/notizie/${postNew.RewriteUrl}`,
            "datePublished": postNew.DataInserimento,
            "dateModified": postNew.DataModifica,
            "author": {
              "@type": "Organization",
              "name": "Careisgold S.p.A"
            },
            "publisher": {
              "@type": "Organization",
              "name": "Careisgold S.p.A",
              "logo": {
                "@type": "ImageObject",
                "url": "https://www.careisgold.it/static/media/logo1.25b1cf4e392fc1ad4340.webp"
              }
            }
          })}
        </script>
      </Helmet>
      <Navbar />
      <div className='relative z-20 h-dvh overflow-hidden'>
              <ScrollParallax enableOnTouchDevice={true} isAbsolutelyPositioned={true} lerpEase="0.05">
                <img src={postNew.ImgCopertina} data-aos="fade-in" data-aos-duration="2000" alt='header image' className="absolute top-0 left-0 w-full h-full object-cover" />
              </ScrollParallax>
          <div className="absolute top-0 left-0 bg-black bg-opacity-40 w-full h-full flex justify-center items-center">
              <div className="absolute text-start ps-15 lg:ps-96 ml-[5%]">
                  <h2 className="text-5xl text-white font-semibold uppercase" data-aos="fade-up" data-aos-duration="1000" dangerouslySetInnerHTML={createMarkup(postNew.Titolo)}></h2>
                  <p className="text-xl mt-4 mb-10 text-white" data-aos="fade-up" data-aos-duration="1000" dangerouslySetInnerHTML={createMarkup(postNew.Subtitle)}></p>
              </div>
              <SlArrowDown 
                  data-aos="fade-up"
                  data-aos-delay="600"
                  data-aos-duration="1000"
                  onClick={scrollToNextSection} 
                  className='arrow cursor-pointer hidden md:block absolute bottom-10 left-1/2 transform -translate-x-1/2 text-slate-50 text-5xl' />
          </div>
      </div>
      <section className="relative" ref={nextSectionRef}>
          <div className="h-full flex justify-center items-center">
            <div className="w-full sm:w-3/4 text-slate-50 flex flex-col justify-center items-center p-4 pt-36 z-20">
              <div className="text-left w-full mx-auto md:w-9/12 text-content">
                <h1 className="text-4xl font-semibold uppercase mb-2" data-aos="fade-up" data-aos-duration="900">{postNew.Titolo}</h1>
                <p className="text-gray-400 mb-4">{postNew.Subtitle}</p>
                <div className="text-lg mb-4" data-aos="fade-zoom-in" data-aos-duration="1000" dangerouslySetInnerHTML={{ __html: postNew.html }}></div>
              </div>
              <div className="flex space-x-4 my-10">
                {/* LinkedIn share button */}
                <button onClick={() => openShareWindow(`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(postUrl)}`)} className=" text-blue-600 hover:text-slate-50 border border-[0.5px] border-blue-600 font-semibold py-2 px-4 progress-button-linkedin transition duration-300 ease-in-out">
                  <FaLinkedin className="inline-block mr-2" /> Condividi su LinkedIn
                </button>

                {/* Facebook share button */}
                <button onClick={() => openShareWindow(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(postUrl)}`)} className="text-blue-500 hover:text-slate-50 border border-[0.5px] border-blue-500 font-semibold py-2 px-4 progress-button-facebook transition duration-300 ease-in-out">
                  <FaFacebook className="inline-block mr-2" /> Condividi su Facebook
                </button>

                {/* WhatsApp share button */}
                <button onClick={() => openShareWindow(`https://api.whatsapp.com/send?text=${encodeURIComponent(postUrl)}`)} className="text-green-500 hover:text-slate-50 border border-[0.5px] border-green-500 font-semibold py-2 px-4 progress-button-whatsapp transition duration-300 ease-in-out">
                  <FaWhatsapp className="inline-block mr-2" /> Condividi su WhatsApp
                </button>
              </div>
              <section className="container mx-auto py-8">
                <h2 className="text-2xl font-semibold mb-10">Altri articoli che ti potrebbero piacere...</h2>
                <div className="flex justify-between space-x-4 px-52">
                  {/* Post 1 */}
                  <Post idCategory={postNew.IdCategory} postId={postId}/>
                </div>
              </section>
            </div>
          </div>
      </section>

      <Footer/>

    </>
  )
}

export default Single;
