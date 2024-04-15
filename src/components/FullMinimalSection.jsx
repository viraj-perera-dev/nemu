import React from 'react';
import { ScrollParallax } from 'react-just-parallax';
import { Link } from 'react-router-dom';

function FullMinimalSection({headerImage, logoTransp, title, description, href, logoPosition}) {

  const createMarkup = (htmlContent) => {
    return {__html: htmlContent};
  };

  return (
    <>
      <div className='relative z-20 h-lvh overflow-hidden'>
          <ScrollParallax enableOnTouchDevice={true} isAbsolutelyPositioned={true} lerpEase="0.05">
              <img src={headerImage} alt='header image' className="absolute top-0 left-0 w-full h-full object-cover" style={{ transform: 'scale(1.2)' }} />
          </ScrollParallax>
          <div className="absolute top-0 left-0 bg-black bg-opacity-40 w-full h-full flex justify-center items-center">
              <ScrollParallax enableOnTouchDevice={true} isAbsolutelyPositioned={true} lerpEase="0.08">
                  <img  src={logoTransp}      
                        data-aos="fade-in" data-aos-duration="3000"
                        className={`absolute ${logoPosition} object-contain`}
                        alt='logo careisgold'
                     />
              </ScrollParallax>
              {/* Text container centered and slightly moved to the right */}
              <div className="absolute text-start ps-15 lg:ps-96 ml-[5%]">
                  <h2 className="text-5xl text-white font-semibold uppercase" data-aos="fade-up" data-aos-duration="1000" dangerouslySetInnerHTML={createMarkup(title)}></h2>
                  <p className="text-xl mt-4 mb-10 text-white" data-aos="fade-up" data-aos-duration="1000" dangerouslySetInnerHTML={createMarkup(description)}></p>
                  <Link to={href} rel='noopener noreferrer' className={`px-8 py-2 progress-button-light uppercase border border-slate-50 text-slate-50 transition duration-300 ease-in-out`}>Scopri di più</Link>
              </div>
          </div>
      </div>
    </>
  );
}

export default FullMinimalSection;
