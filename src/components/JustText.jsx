import React from 'react';
import { Link } from 'react-router-dom';

function JustText({ background, title, description, href, buttonClass, titleClass, descriptionClass, buttonText }) {

const createMarkup = (htmlContent) => {
    return {__html: htmlContent};
};

  return (
        <>
            <section>
                <div className='mx-auto'>
                    <div className='h-dvh flex justify-center items-center'>
                        <div className={`h-screen w-full ${background} flex justify-center items-center z-20`}>
                            <div className='text-left w-3/4 mx-auto'>
                                <h1 className={`text-1xl font-semibold uppercase mb-2 ${titleClass}`} data-aos="fade-up" data-aos-duration="900" dangerouslySetInnerHTML={createMarkup(title)}></h1>
                                <div data-aos="fade-zoom-in" data-aos-duration="1000" className={`text-lg mt-10 mb-16 ${descriptionClass}`} dangerouslySetInnerHTML={createMarkup(description)}></div>
                                <Link to={href} rel='noopener noreferrer' className={`px-8 py-2 uppercase  ${buttonClass} transition duration-300 ease-in-out`}>{buttonText}</Link>
                            </div>
                        </div>   
                    </div>
                </div>
            </section>
        </>
  );
}

export default JustText;


