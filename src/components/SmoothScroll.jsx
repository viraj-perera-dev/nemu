import React, { useEffect } from 'react';
import Lenis from '@studio-freight/lenis';

const SmoothScroll = () => {
  useEffect(() => {
    const lenis = new Lenis({
        smoothWheel: true, // enable smooth scrolling for mouse wheel events
        lerp: 0.050, // adjust the linear interpolation intensity for smoother scrolling
        orientation: 'vertical', // scroll orientation
        gestureOrientation: 'vertical', // gesture orientation
        syncTouch: true, // mimic touch device scroll while allowing scroll sync
        syncTouchLerp: 0.1, // adjust the lerp applied during syncTouch inertia
        touchInertiaMultiplier: 50, // manage the strength of syncTouch inertia
        wheelMultiplier: 0.75, // adjust the multiplier for mouse wheel events
        touchMultiplier: 0.75, // adjust the multiplier for touch events
        normalizeWheel: false, // normalize wheel inputs across browsers (not reliable atm)
        infinite: false, // enable infinite scrolling
        autoResize: true // resize instance automatically based on ResizeObserver
  
    });

    const handleLinkClick = (event) => {
      // Check if the clicked element is an anchor link
      if (event.target.tagName === 'A') {
        // Prevent default anchor behavior
        event.preventDefault();
        
        // Scroll to top
        lenis.scrollTo(0);
      }
    };


    lenis.on('scroll', (e) => {
    //   console.log(e);
    });

    const raf = (time) => {
      lenis.raf(time);
      requestAnimationFrame(raf);
    };

    requestAnimationFrame(raf);
    document.addEventListener('click', handleLinkClick);

    return () => {
      // Clean up
      lenis.destroy();
      document.removeEventListener('click', handleLinkClick);

    };
  }, []); // Run only once on component mount

  return null; // Since this component doesn't render anything, return null
};

export default SmoothScroll;
