import React, { useRef } from 'react';
import { MouseParallax } from 'react-just-parallax';
import mountainVideo from "../assets/mouseFollow/Hero.mp4";
import logoTransp from '../assets/mouseFollow/CIGtrasparente.png';
import { SlArrowDown } from "react-icons/sl";


function MouseFollow() {

    const nextSectionRef = useRef(null);

    // Function to scroll to the next section
    const scrollToNextSection = () => {
      nextSectionRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    };

  return (
    <>
    <div className='relative z-20 h-dvh overflow-hidden bg-black'>
        <MouseParallax enableOnTouchDevice={true} isAbsolutelyPositioned={true} strength="0.2">
            <video data-aos="fade-in" data-aos-duration="2000" className="absolute top-0 left-0 w-full h-full object-cover" style={{ transform: 'scale(1.2)' }} autoPlay muted playsInline loop>
                <source src={mountainVideo} type="video/mp4" />
                Your browser does not support the video tag.
            </video>
        </MouseParallax>
        <div className="absolute top-0 left-0 bg-amber-400 bg-opacity-5 w-full h-full">
            <MouseParallax enableOnTouchDevice={true} isAbsolutelyPositioned={true} strength="0.1">
                {/* Adjust the image to be more to the right and cover 100vh without stretching */}
                <img src={logoTransp} data-aos="fade-in" data-aos-duration="3000" className='opacity-30' style={{ position: 'absolute', right: '-60vh', height: '150vh', objectFit: 'contain' }} alt='logo careisgold' />
            </MouseParallax>
            <div className="absolute bottom-0 left-0 text-left p-10 md:p-32"
                data-aos="fade-up"
                data-aos-duration="3000"
            >
                <h2 className="text-7xl text-white font-semibold">L'Oro per tutti, <br/>prima di tutti.</h2>
                <p className="text-xl mt-4 text-white">La prima azienda a rendere l'Oro da investimento<br/> accessibile a ogni famiglia.</p>
            </div>
            <SlArrowDown 
                data-aos="fade-up"
                data-aos-delay="600"
                data-aos-duration="1000"
                onClick={scrollToNextSection} 
                className='cursor-pointer hidden md:block absolute bottom-10 left-1/2 transform -translate-x-1/2 text-slate-50 text-5xl' />
        </div>
    </div>
    <div ref={nextSectionRef}>
    </div>
    </>
  );
}

export default MouseFollow;
