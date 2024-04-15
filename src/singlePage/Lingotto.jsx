import React, { useState, useEffect } from 'react';
import logo from '../assets/staticSection/gold.jpg';

function Lingotto() {
    const [scrollPosition, setScrollPosition] = useState(0);
  
    useEffect(() => {
        function handleScroll() {
            setScrollPosition(window.scrollY);
        }
  
        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    const imageStyle = {
        position: 'fixed',
        top: `${scrollPosition > window.innerHeight ? '50%' : 0}`,
        left: `${scrollPosition > window.innerHeight ? '50%' : 0}`,
        transform: `${scrollPosition > window.innerHeight ? 'translate(-50%, -50%)' : 'none'}`,
        transition: 'left 0.5s, right 0.5s',
        zIndex: 9999,
    };
  
    return (
        <div className='bg-white' style={{ height: '1000vh' }}>
            <img src={logo} className='' alt='' style={imageStyle} />
        </div>
    );
}
  
export default Lingotto;
