import React, { useEffect, useRef, useState } from 'react';
import YourImage from '../assets/goldBar/lingotto.png';

const titlesAndSubtitles = [
  { title: "Title 1", subtitle: "Subtitle 1" },
  { title: "Title 2", subtitle: "Subtitle 2" },
  { title: "Title 3", subtitle: "Subtitle 3" },
  { title: "Title 4", subtitle: "Subtitle 4" },
];

function ZoomImage() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [title, setTitle] = useState(titlesAndSubtitles[0].title);
  const [subtitle, setSubtitle] = useState(titlesAndSubtitles[0].subtitle);
  const [hasEntered, setHasEntered] = useState(false);
  const [showText, setShowText] = useState(false); // State to manage text visibility
  const imageRef = useRef(null);
  const textTimeoutRef = useRef(null); // Ref to manage the timeout for showing text
  const sectionRef = useRef(null);
  const intervalIdRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          // If section comes into view, start or restart the interval
          if (intervalIdRef.current) clearInterval(intervalIdRef.current);
          
          intervalIdRef.current = setInterval(() => {
            setCurrentIndex((prevIndex) => {
              const newIndex = (prevIndex + 1) % titlesAndSubtitles.length;
              setTitle(titlesAndSubtitles[newIndex].title);
              setSubtitle(titlesAndSubtitles[newIndex].subtitle);
              return newIndex;
            });
          }, 4000);
        } else {
          // If section goes out of view, clear the interval
          if (intervalIdRef.current) clearInterval(intervalIdRef.current);
        }
        
        if (entry.isIntersecting && !hasEntered) {
          // Ensures this code runs only once
          setHasEntered(true);
          
          // Set a timeout to show the text after 3 seconds
          textTimeoutRef.current = setTimeout(() => {
            setShowText(true);
          }, 3000);
          setHasEntered(true);
          if(imageRef.current) {
            imageRef.current.classList.add('animate-image-once');
          }
        }


      });
    }, { threshold: 0.1 });

    if (imageRef.current) {
      observer.observe(imageRef.current);
    }

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    // Clean up: Clear the interval and unobserve when component unmounts
    return () => {
      if (intervalIdRef.current) clearInterval(intervalIdRef.current);
      if (sectionRef.current) observer.unobserve(sectionRef.current);
      if (imageRef.current) {
        observer.unobserve(imageRef.current);
      }
      if (textTimeoutRef.current) {
        clearTimeout(textTimeoutRef.current);
      }

    };
  }, [hasEntered]); // Empty dependency array ensures this effect only runs once on mount

  return (
    <div className="relative w-full">
      <div ref={sectionRef} className="sticky top-0 h-screen w-full flex justify-center items-center z-0">
        <img
          ref={imageRef}
          src={YourImage}
          alt="Zooming Image"
          style={{
            transform: `scale(${hasEntered ? 0.8 : 0})`, // Fallback for browsers not supporting CSS animations
            transformOrigin: 'center left',
          }}
          className="transition-transform duration-300 ease-out"
        />
        <div
          style={{
            position: 'absolute',
            top: '50%',
            right: '30vh', // Align to the right side of the viewport
            transform: 'translateY(-50%)', // Center vertically
            width: '30%', // Adjust the width as needed
            textAlign: 'left', // Align the text to the left within the container
            zIndex: 2, // Ensure it's above the image
            color: '#FFFFFF', // Adjust text color as needed
          }}>
            <h1 data-aos="fade-up" className={`text-5xl fade-up`} key={`title-${currentIndex}`}>{title}</h1>
            <p data-aos="fade-up" className={`text-xl fade-up`} key={`subtitle-${currentIndex}`}>{subtitle}</p>
        </div>
      </div>
    </div>
  );
}

export default ZoomImage;
