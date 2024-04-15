import React from 'react';
import { ScrollParallax } from 'react-just-parallax';
import { Link } from 'react-router-dom';

function FullBWSection({background, text, button, href, title, description, image, translate, opacity}) {

    const createMarkup = (htmlContent) => {
        return {__html: htmlContent};
    };

    return (
        <>
            <div className={`relative z-20 h-dvh overflow-hidden ${background} flex justify-center items-center`}>
                <div className={`w-full h-full grid grid-cols-1 md:grid-cols-2`}>
                    <ScrollParallax enableOnTouchDevice={true} isAbsolutelyPositioned={true} lerpEase="0.05">
                        <img src={image}
                            className={`absolute left-0 top-[-40vh] h-[200vh] w-full md:w-[200vh] object-contain ${opacity}`}
                            alt='logo careisgold'
                            style={{ transform: 'scale(1.2)' }}
                        />
                    </ScrollParallax>
                    {/* Adjust the text container to be more responsive */}
                    <div className={`flex justify-center items-center ps-4 md:ps-32 lg:ps-32 xl:ps-48`}>
                        <div className={`text-justify mx-auto ${translate}`}>
                            <h2 className={`text-7xl ${text} font-semibold`} data-aos="fade-up" data-aos-duration="1000">{title}</h2>
                            <div className={`text-xl mt-4 mb-10 ${text}`} data-aos="fade-up" data-aos-duration="1000" dangerouslySetInnerHTML={createMarkup(description)}></div>
                            <Link to={href} rel='noopener noreferrer' className={`px-8 py-2 uppercase ${button} transition duration-300 ease-in-out`}>Scopri di più</Link>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default FullBWSection;
