import React from 'react';
import { ScrollParallax } from "react-just-parallax";
import { Link } from 'react-router-dom';

function MinimalSection({ orientation, background, title, description, href, imageUrl, buttonClass, titleClass, descriptionClass, buttonText, strength, lerp, imgOpacity }) {

const createMarkup = (htmlContent) => {
    return {__html: htmlContent};
};

  return (
    <>
    {orientation === 'left' ? (
        <>
            <section>
                <div className='mx-auto'>
                    <div className='h-lvh flex justify-center items-center'>
                        <div className={`${imgOpacity} h-lvh hidden sm:block sm:w-1/4 z-0`}>
                            <ScrollParallax lerpEase={lerp} zIndex='0' enableOnTouchDevice={false} strength={strength}>
                                <img src={imageUrl} alt={title} className='w-full h-full object-cover' />
                            </ScrollParallax>
                        </div> 
                        <div className={`h-lvh w-full sm:w-3/4 ${background} flex justify-center items-center p-4 z-20`}>
                            <div className='text-left w-full sm:max-w-md lg:max-w-lg xl:max-w-xl mx-auto'>
                                <h1 className={`text-xl md:text-5xl font-semibold uppercase mb-2 ${titleClass}`} data-aos="fade-up" data-aos-duration="900">{title}</h1>
                                <div data-aos="fade-zoom-in" data-aos-duration="1000" className={`text-sm md:text-lg mb-4 ${descriptionClass}`} dangerouslySetInnerHTML={createMarkup(description)}></div>
                                <Link to={href} rel='noopener noreferrer' className={`px-8 py-2 uppercase  ${buttonClass} transition duration-300 ease-in-out`}>{buttonText}</Link>
                            </div>
                        </div>   
                    </div>
                </div>
            </section>
        </>
    ) : (
        <>
            <section>
                <div className='mx-auto'>
                    <div className='h-lvh flex justify-center items-center'>
                        <div className={`h-screen w-full sm:w-3/4 ${background} flex justify-center items-center p-4 z-20`}>
                            <div className='text-left w-full sm:max-w-md lg:max-w-lg xl:max-w-xl mx-auto'>
                                <h1 className={`text-xl md:text-5xl font-semibold uppercase mb-2 ${titleClass}`} data-aos="fade-up" data-aos-duration="900">{title}</h1>
                                <div data-aos="fade-zoom-in" data-aos-duration="1000" className={`text-sm md:text-lg mb-4 ${descriptionClass}`} dangerouslySetInnerHTML={createMarkup(description)}></div>
                                <Link to={href} rel='noopener noreferrer' className={`px-8 py-2 uppercase  ${buttonClass} transition duration-300 ease-in-out`}>{buttonText}</Link>
                            </div>
                        </div>  
                        <div className={`${imgOpacity} h-lvh hidden sm:block sm:w-1/4 z-0`}>
                            <ScrollParallax lerpEase={lerp} zIndex='0' enableOnTouchDevice={false} strength={strength}>
                                <img src={imageUrl} alt={title} className='w-full h-full object-cover' />
                            </ScrollParallax>
                        </div>  
                    </div>
                </div>
            </section>
        </>
    )}
    </>
  );
}

export default MinimalSection;


