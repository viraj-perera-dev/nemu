import React, { useEffect, useRef, useState } from 'react';
import goldbar from '../assets/goldBar/gold-bar.png';
import { Link } from 'react-router-dom';
import Navbar from './Navbar';
import FullMinimalSection from './FullMinimalSection';
import headerImage from "../assets/staticSection/family7.jpg";

const ImageFollow = () => {
  const containerRef = useRef(null);
  const [imageLeft, setImageLeft] = useState('10%');
  const transitionDuration = '1s';
  const [section, setSection] = useState('');
  const sectionRef = useRef(section);

  useEffect(() => {
    sectionRef.current = section;
  }, [section]);

  useEffect(() => {
    const handleScrollStop = () => {
      setTimeout(() => {
          const sectionElement = document.querySelector(sectionRef.current); // Use the ref here
        if (sectionElement) {
          sectionElement.scrollIntoView({
            behavior: 'smooth',
            block: 'start',
          });
        }

      }, 100);
    };

    let scrollTimeout = null;

    const onScroll = () => {
      if (scrollTimeout !== null) {
        clearTimeout(scrollTimeout);
      }
        scrollTimeout = setTimeout(handleScrollStop, 150);
      
    };

    window.addEventListener('scroll', onScroll);

    return () => {
      window.removeEventListener('scroll', onScroll);
      if (scrollTimeout !== null) {
        clearTimeout(scrollTimeout);
      }
    };
  }, []); 


  useEffect(() => {
      const sections = containerRef.current.querySelectorAll('div[id^="section"]');
      const image = containerRef.current.querySelector('img');
      image.style.transition = transitionDuration; 

      const observerCallback = (entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const newPosition = entry.target.id === 'section1' || entry.target.id === 'section3' || entry.target.id === 'section5' || entry.target.id === 'section7' ? '20%' : '80%';
                setSection('#'+ entry.target.id);
                setImageLeft(newPosition); 

            }
        });
    };
    
    

      const observerOptions = {
          root: null,
          threshold: 0.5,
          rootMargin: "0px"
      };
      const observer = new IntersectionObserver(observerCallback, observerOptions);

      sections.forEach(section => {
          observer.observe(section);
      });

      return () => {
          sections.forEach(section => {
              observer.unobserve(section);
          });
      };
  }, []);

    return (
      <>
      <Navbar />

        <div ref={containerRef}                          
          data-aos="fade-in"
          data-aos-duration="3000"
        >
            <img
                src={goldbar}
                style={{
                    width: '25%',
                    position: 'fixed',
                    top: '50%',
                    left: imageLeft,
                    transform: 'translateY(-50%) translateX(-50%)',
                    transition: `left ${transitionDuration} ease `,
                }}
                className='hidden md:block'
                alt='lingotto argor herause'
            />
            <div id="section1" className='bg-black h-dvh text-slate-50 flex items-center justify-end'>
              <div class="w-full lg:w-2/3 text-left pe-56">
                  <h2 className={`text-3xl lg:text-6xl text-slate-50 font-semibold`} data-aos="fade-up" data-aos-duration="3000">Lorem ipsum dolor sit amet, consectetur adipiscing elit.</h2>
                  <div className={`text-md lg:text-lg mt-4 mb-10 text-slate-50`} data-aos="fade-in" data-aos-duration="3000">In tincidunt ut sapien quis auctor. Nulla fringilla congue justo, nec auctor ante efficitur a. Mauris ac elit eget quam mattis pellentesque eget ut enim. Nunc mollis vehicula nisl eget sollicitudin. Vivamus luctus rhoncus pellentesque.</div>
                  <Link to='/' rel='noopener noreferrer' className={`px-8 py-2 uppercase border border-slate-50 text-slate-50 progress-button-light transition duration-300 ease-in-out`}>Scopri di più</Link>
              </div>
            </div>
            <div id="section2" className='bg-black h-dvh text-slate-50 flex items-center justify-start'>
              <div class="w-full lg:w-2/3 text-left ps-56">
                  <h2 className={`text-3xl lg:text-6xl text-slate-50 font-semibold`} data-aos="fade-up" data-aos-duration="3000">Lorem ipsum dolor sit amet, consectetur adipiscing elit.</h2>
                  <div className={`text-md lg:text-lg mt-4 mb-10 text-slate-50`} data-aos="fade-in" data-aos-duration="3000">In tincidunt ut sapien quis auctor. Nulla fringilla congue justo, nec auctor ante efficitur a. Mauris ac elit eget quam mattis pellentesque eget ut enim. Nunc mollis vehicula nisl eget sollicitudin. Vivamus luctus rhoncus pellentesque.</div>
                  <Link to='/' rel='noopener noreferrer' className={`px-8 py-2 uppercase border border-slate-50 text-slate-50 progress-button-light transition duration-300 ease-in-out`}>Scopri di più</Link>
              </div>
            </div>
            <div id="section3" className='bg-black h-dvh text-slate-50 flex items-center justify-end'>
              <div class="w-full lg:w-2/3 text-left pe-56">
                  <h2 className={`text-3xl lg:text-6xl text-slate-50 font-semibold`} data-aos="fade-up" data-aos-duration="3000">Lorem ipsum dolor sit amet, consectetur adipiscing elit.</h2>
                  <div className={`text-md lg:text-lg mt-4 mb-10 text-slate-50`} data-aos="fade-in" data-aos-duration="3000">In tincidunt ut sapien quis auctor. Nulla fringilla congue justo, nec auctor ante efficitur a. Mauris ac elit eget quam mattis pellentesque eget ut enim. Nunc mollis vehicula nisl eget sollicitudin. Vivamus luctus rhoncus pellentesque.</div>
                  <Link to='/' rel='noopener noreferrer' className={`px-8 py-2 uppercase border border-slate-50 text-slate-50 progress-button-light transition duration-300 ease-in-out`}>Scopri di più</Link>
              </div>
            </div>
            <div id="section4" className='bg-black h-dvh text-slate-50 flex items-center justify-start'>
              <div class="w-full lg:w-2/3 text-left ps-56">
                  <h2 className={`text-3xl lg:text-6xl text-slate-50 font-semibold`} data-aos="fade-up" data-aos-duration="3000">Lorem ipsum dolor sit amet, consectetur adipiscing elit.</h2>
                  <div className={`text-md lg:text-lg mt-4 mb-10 text-slate-50`} data-aos="fade-in" data-aos-duration="3000">In tincidunt ut sapien quis auctor. Nulla fringilla congue justo, nec auctor ante efficitur a. Mauris ac elit eget quam mattis pellentesque eget ut enim. Nunc mollis vehicula nisl eget sollicitudin. Vivamus luctus rhoncus pellentesque.</div>
                  <Link to='/' rel='noopener noreferrer' className={`px-8 py-2 uppercase border border-slate-50 text-slate-50 progress-button-light transition duration-300 ease-in-out`}>Scopri di più</Link>
              </div>
            </div>
            <div id="section5" className='bg-black h-dvh text-slate-50 flex items-center justify-end'>
              <div class="w-full lg:w-2/3 text-left pe-56">
                  <h2 className={`text-3xl lg:text-6xl text-slate-50 font-semibold`} data-aos="fade-up" data-aos-duration="3000">Lorem ipsum dolor sit amet, consectetur adipiscing elit.</h2>
                  <div className={`text-md lg:text-lg mt-4 mb-10 text-slate-50`} data-aos="fade-in" data-aos-duration="3000">In tincidunt ut sapien quis auctor. Nulla fringilla congue justo, nec auctor ante efficitur a. Mauris ac elit eget quam mattis pellentesque eget ut enim. Nunc mollis vehicula nisl eget sollicitudin. Vivamus luctus rhoncus pellentesque.</div>
                  <Link to='/' rel='noopener noreferrer' className={`px-8 py-2 uppercase border border-slate-50 text-slate-50 progress-button-light transition duration-300 ease-in-out`}>Scopri di più</Link>
              </div>
            </div>
            <div id="section6" className='bg-black h-dvh text-slate-50 flex items-center justify-start'>
              <div class="w-full lg:w-2/3 text-left ps-56">
                  <h2 className={`text-3xl lg:text-6xl text-slate-50 font-semibold`} data-aos="fade-up" data-aos-duration="3000">Lorem ipsum dolor sit amet, consectetur adipiscing elit.</h2>
                  <div className={`text-md lg:text-lg mt-4 mb-10 text-slate-50`} data-aos="fade-in" data-aos-duration="3000">In tincidunt ut sapien quis auctor. Nulla fringilla congue justo, nec auctor ante efficitur a. Mauris ac elit eget quam mattis pellentesque eget ut enim. Nunc mollis vehicula nisl eget sollicitudin. Vivamus luctus rhoncus pellentesque.</div>
                  <Link to='/' rel='noopener noreferrer' className={`px-8 py-2 uppercase border border-slate-50 text-slate-50 progress-button-light transition duration-300 ease-in-out`}>Scopri di più</Link>
              </div>
            </div>
            <div id="section7" className='bg-black h-dvh text-slate-50 flex items-center justify-end'>
              <div class="w-full lg:w-2/3 text-left pe-56">
                  <h2 className={`text-3xl lg:text-6xl text-slate-50 font-semibold`} data-aos="fade-up" data-aos-duration="3000">Lorem ipsum dolor sit amet, consectetur adipiscing elit.</h2>
                  <div className={`text-md lg:text-lg mt-4 mb-10 text-slate-50`} data-aos="fade-in" data-aos-duration="3000">In tincidunt ut sapien quis auctor. Nulla fringilla congue justo, nec auctor ante efficitur a. Mauris ac elit eget quam mattis pellentesque eget ut enim. Nunc mollis vehicula nisl eget sollicitudin. Vivamus luctus rhoncus pellentesque.</div>
                  <Link to='/' rel='noopener noreferrer' className={`px-8 py-2 uppercase border border-slate-50 text-slate-50 progress-button-light transition duration-300 ease-in-out`}>Scopri di più</Link>
              </div>
            </div>
            <div id="section8" className='bg-black h-dvh text-slate-50 flex items-center justify-star'>
              <div class="w-full lg:w-2/3 text-left ps-56">
                  <h2 className={`text-3xl lg:text-6xl text-slate-50 font-semibold`} data-aos="fade-up" data-aos-duration="3000">Lorem ipsum dolor sit amet, consectetur adipiscing elit.</h2>
                  <div className={`text-md lg:text-lg mt-4 mb-10 text-slate-50`} data-aos="fade-in" data-aos-duration="3000">In tincidunt ut sapien quis auctor. Nulla fringilla congue justo, nec auctor ante efficitur a. Mauris ac elit eget quam mattis pellentesque eget ut enim. Nunc mollis vehicula nisl eget sollicitudin. Vivamus luctus rhoncus pellentesque.</div>
                  <Link to='/' rel='noopener noreferrer' className={`px-8 py-2 uppercase border border-slate-50 text-slate-50 progress-button-light transition duration-300 ease-in-out`}>Scopri di più</Link>
              </div>
            </div>
        </div>
        </>

    );
}

export default ImageFollow;
