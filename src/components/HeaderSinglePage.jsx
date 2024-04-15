import React from 'react';
import { ScrollParallax } from 'react-just-parallax';
import { Link } from 'react-router-dom';

function HeaderSinglePage({background, text, button, href, title, description, image, translate, opacity}) {

    const createMarkup = (htmlContent) => {
        return {__html: htmlContent};
    };    

  return (
    <>
        <div className={`relative z-20 h-dvh overflow-hidden ${background} flex justify-center items-center`}>
            <div className={`w-full h-full grid grid-cols-1`}>
                <ScrollParallax enableOnTouchDevice={true} isAbsolutelyPositioned={true} lerpEase="0.05">
                    <img src={image}
                        className={`absolute top-0 left-0 w-full h-full object-cover ${opacity}`} style={{ transform: 'scale(1.5)' }}
                        alt='logo careisgold'
                    />
                </ScrollParallax>
                <div className={`flex justify-center items-center px-10 md:px-56 xl:px-[25%] z-0`}>
                    <div className={`text-justify mx-auto`}>
                        <h2 className={`text-7xl ${text} font-semibold`} data-aos="fade-up" data-aos-duration="1000" dangerouslySetInnerHTML={createMarkup(title)}></h2>
                        <div className={`text-xl mt-4 mb-10 ${text}`} data-aos="fade-up" data-aos-duration="1000" dangerouslySetInnerHTML={createMarkup(description)}></div>
                        <Link to={href} rel='noopener noreferrer' className={`px-8 py-2 uppercase ${button} transition duration-300 ease-in-out`}>Scopri di più</Link>
                    </div>
                </div>
            </div>
        </div>
    </>
  );
}

export default HeaderSinglePage;
