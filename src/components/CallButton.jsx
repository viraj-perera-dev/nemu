import React, { useState, useEffect } from 'react';
import Lottie from 'react-lottie';
import animationData from '../assets/json/phone.json'; // Replace 'your-animation.json' with the path to your Lottie animation JSON file

function CallButton() {
  const [isHovered, setIsHovered] = useState(false);
  const [animationKey, setAnimationKey] = useState(0);

  useEffect(() => {
    let timeoutId;
    if (!isHovered) {
      // Set a timeout to reset animation after 500ms
      timeoutId = setTimeout(() => {
        setAnimationKey(prevKey => prevKey + 1); // Reset animation by changing the key
      }, 0);
    }

    return () => {
      clearTimeout(timeoutId); // Clear timeout on component unmount or when isHovered changes
    };
  }, [isHovered]);

  const defaultOptions = {
    loop: true,
    autoplay: false,
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid slice'
    }
  };

  return (
    <a
      href="tel:+0454567890"
      className="fixed md:bottom-4 md:right-4 right-0 bottom-0 text-white z-40 flex items-center justify-center"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Lottie
        options={defaultOptions}
        height={125}
        width={125}
        isStopped={!isHovered} // Pause animation when not hovered
        isPaused={!isHovered} // Pause animation when not hovered
        key={animationKey} // Re-render Lottie component when animationKey changes
      />
    </a>
  );
}

export default CallButton;
