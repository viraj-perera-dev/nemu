// import React, { useState } from 'react';
// import ShareButton from "../assets/logo/share.webp"
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
// import { faFacebookF, faLinkedinIn, faWhatsapp } from '@fortawesome/free-brands-svg-icons'
// import axios from "axios"
// import { FiHeart } from 'react-icons/fi';
// import { FacebookShareButton, WhatsappShareButton, LinkedinShareButton } from 'react-share';




// const MenuButton = ({ postUrl, postTitle, postId, postDescription, postImage }) => {

//     const [likedPosts, setLikedPosts] = useState(false);
//     const [shareButtonClicked, setShareButtonClicked] = useState(false);

//     const handleButtonClick = async () => {
//       setShareButtonClicked(!shareButtonClicked);
//     };
  
//   const handleClickLike = async () => {
//     if (!likedPosts) {
//       setLikedPosts(true);
//       await axios.post(`https://newgest.careholding.it/BLOG_WS.axd?type=IncrementRel&par=${postId}`);
//     } else {
//       setLikedPosts(false);
//     }
//   }; 

//   function formatToUrlFriendly(text) {
//     const cleanedText = text
//       .toLowerCase() // Convert to lowercase
//       .replace(/ /g, '-') // Replace spaces with hyphens
//       .replace(/[àáâãäå]/g, 'a') // Replace "à", "á", "â", "ã", "ä", "å" with "a"
//       .replace(/[èéêë]/g, 'e') // Replace "è", "é", "ê", "ë" with "e"
//       .replace(/[ìíîï]/g, 'i') // Replace "ì", "í", "î", "ï" with "i"
//       .replace(/[òóôõö]/g, 'o') // Replace "ò", "ó", "ô", "õ", "ö" with "o"
//       .replace(/[ùúûü]/g, 'u') // Replace "ù", "ú", "û", "ü" with "u"
//       .replace(/[^a-z0-9-_+]/g, '-') // Remove special characters except hyphens and alphanumeric characters
//       .replace(/-{2,}/g, '-'); // Remove consecutive hyphens

//         if (cleanedText.endsWith('-')) {
//             return cleanedText.slice(0, -1);  
//     }return cleanedText;
//   }

//     return (
//       <>
//         <div className="d-flex align-items-center justify-content-end mb-3">
//             <FiHeart 
//               size={65}
//               className="p-3 me-2 bg-default rounded-circle"
//               onClick={handleClickLike}
//               color={likedPosts ? 'red' : '#F8F9FA'}
//               fill={likedPosts ? 'red' : '#F8F9FA'}
//             />
//         </div>
//       <div className="d-flex align-items-center justify-content-end mb-3">
//                 <div className="custom-overflow">

//                   <FacebookShareButton url={`${postUrl}`} quote={`${postTitle}`} description={`${postDescription}`} hashtag={"#careisgold"}>
//                     <button
//                       className={`bg-facebook border-0 rounded-circle1 mx-2 ${shareButtonClicked ? 'show1' : 'hide1'}`}
//                     >
//                       <FontAwesomeIcon
//                         className="fs-3 text-light"
//                         icon={faFacebookF}
//                       />
//                     </button>                
//                   </FacebookShareButton>

//                   <LinkedinShareButton url={`${postUrl}`} title={postTitle} summary={postDescription}>
//                     <button
//                       className={`bg-linkedin border-0 rounded-circle1 mx-2 ${shareButtonClicked ? 'show2' : 'hide2'}`}
//                     >
//                       <FontAwesomeIcon
//                         className="fs-3 text-light"
//                         icon={faLinkedinIn}
//                       />
//                     </button>       
//                   </LinkedinShareButton>

//                   <WhatsappShareButton  url={`${postUrl}`} title={`${postTitle}\n\n${postDescription}`}>
//                     <button
//                       className={`bg-whatsapp border-0 rounded-circle1 mx-2 ${shareButtonClicked ? 'show3' : 'hide3'}`}>
//                       <FontAwesomeIcon
//                         className="fs-3 text-light"
//                         icon={faWhatsapp}
//                       />
//                     </button>  
//                   </WhatsappShareButton >
//                 </div>
//               <button
//                 onClick={handleButtonClick}
//                 className="bg-default border-0 p-3 rounded-circle me-2 first-button"
//               >
//                 <img src={ShareButton} className="img-fluid icon"></img>
//               </button>
//             <div>
//           </div>
//         </div>
//       </>
//     );
//   };

// export default MenuButton;