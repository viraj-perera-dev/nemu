import React from 'react';
import { ScrollParallax } from 'react-just-parallax';
import { Link } from 'react-router-dom';

function FulltransparentSection({orientation, background, text, button, href, title, description, image, backgroundColor, bgOpacity, translate, grid}) {

    const createMarkup = (htmlContent) => {
        return {__html: htmlContent};
    };

    return (
        <>
          {orientation === 'left' ? (
            <>
            <div className={`relative z-20 h-lvh overflow-hidden flex justify-center items-center ${backgroundColor}`}>
                <div className={`w-full h-full ${grid}`}>
                    <div className={`relative overflow-hidden flex justify-start items-center ${bgOpacity}`}>
                        <ScrollParallax enableOnTouchDevice={true} lerpEase="0.05" className="absolute inset-0">
                            <img src={background} className="h-full w-full object-cover" alt="background" style={{ transform: 'scale(1.2)' }} />
                        </ScrollParallax>
                        {image !== '' ? 
                            <img src={image} className="absolute h-full w-full object-cover" style={{"right":"-1px"}} alt="foreground" />
                        : ''}
                    </div>
                    <div className={`flex flex-col justify-center items-start px-4 md:px-8 lg:px-52 text-left z-10 h-lvh ${translate}`}>
                        <h2 className={`text-3xl lg:text-5xl ${text} font-semibold`} data-aos="fade-up" data-aos-duration="1000">{title}</h2>
                        <div className={`text-md lg:text-lg mt-4 mb-10 ${text}`} data-aos="fade-up" data-aos-duration="1000" dangerouslySetInnerHTML={createMarkup(description)}></div>
                        <Link to={href} rel='noopener noreferrer' className={`px-8 py-2 uppercase ${button} transition duration-300 ease-in-out`}>Prenota consulenza</Link>
                    </div>
                </div>
            </div>
            </>
          ):(
            <>
            <div className={`relative z-20 h-lvh overflow-hidden flex justify-center items-center ${backgroundColor}`}>
                <div className={`w-full h-full ${grid}`}>
                    <div className={`flex flex-col justify-center items-start px-4 md:px-8 lg:px-52 text-left z-10 h-lvh ${translate}`}>
                        <h2 className={`text-3xl lg:text-5xl ${text} font-semibold`} data-aos="fade-up" data-aos-duration="1000">{title}</h2>
                        <div className={`text-md lg:text-lg mt-4 mb-10 ${text}`} data-aos="fade-up" data-aos-duration="1000" dangerouslySetInnerHTML={createMarkup(description)}></div>
                        <Link to={href} rel='noopener noreferrer' className={`px-8 py-2 uppercase ${button} transition duration-300 ease-in-out`}>Prenota consulenza</Link>
                    </div>
                    <div className={`relative overflow-hidden flex justify-start items-center border ${bgOpacity}`}>
                        <ScrollParallax enableOnTouchDevice={true} lerpEase="0.05" className="absolute inset-0">
                            <img src={background} className="h-full w-full object-cover pe-1" alt="background" style={{ transform: 'scale(1.2)' }}/>
                        </ScrollParallax>
                        {image !== '' ? 
                            <img src={image} className="absolute h-full w-full object-cover" style={{"left":"-1px"}} alt="foreground" />
                        : ''}
                    </div>
                </div>
            </div>
            </>
          )}

        </>
    );
}

export default FulltransparentSection;
