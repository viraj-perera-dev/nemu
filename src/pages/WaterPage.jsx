import React, { useEffect, useRef, useState } from 'react'
import WaterSection from '../components/WaterSection'

function WaterPage() {

    const [inViewport, setInViewport] = useState(false);
    const sectionRef = useRef(null);
  
    useEffect(() => {
      const observer = new IntersectionObserver(
        ([entry]) => {
          setInViewport(entry.isIntersecting);
          if (entry.isIntersecting) {
            // alert('Component is in the viewport');
          } else {
            // alert('Component is not in the viewport');
          }
        },
        { threshold: 0 } // Adjust the threshold as needed
      );
  
      observer.observe(sectionRef.current);
  
      return () => {
        observer.unobserve(sectionRef.current);
      };
    }, []);

  return (
    <>
      <div ref={sectionRef}>
        {inViewport && (
          <WaterSection />
        )}
      </div>
    </>
  )
}

export default WaterPage