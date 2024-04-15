import React from 'react';
import Smoke from '../components/SmokeSection';
import { useTrail, animated } from 'react-spring';

function SmokePage() {
  const text = "Andrea ancora non lo sai ma sei gay1";
  const items = text.split('');
  const trail = useTrail(items.length, {
    from: { opacity: 0, transform: 'translateY(20px)' },
    to: { opacity: 1, transform: 'translateY(0px)' },
    config: { mass: 5, tension: 2000, friction: 200 },
  });

  return (
    <div className='h-dvh'>
        <Smoke />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex">
          {trail.map(({...style}, index) => (
            <animated.span key={index} className="text-slate-50 text-center p-4 text-5xl" style={style}>
              {items[index] === ' ' ? '\u00A0' : items[index]}
            </animated.span>
          ))}
        </div>
    </div>
  );
}

export default SmokePage;
