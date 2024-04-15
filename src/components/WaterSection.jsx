import React from 'react';
import WaterWave from 'react-water-wave'; 
import image from '../assets/staticSection/gold.jpg';
import { Link } from 'react-router-dom';

function WaterSection() {

  return (
    <div className="w-full h-screen overflow-hidden">
        <WaterWave
          imageUrl={image}
          style={{ width: '100%', height: '100%', backgroundSize: 'cover' }}
          dropRadius={50} // Adjust the drop radius for smoother effect
          perturbance={0.01} // Adjust perturbance for smoother effect
        >
          {({ pause, play }) => (
            <div className="container">
              <div className="absolute top-0 left-0 bg-slate-900 bg-opacity-35 w-full h-full flex justify-start items-center">
                <div className="absolute text-start ps-15 lg:ps-20 ml-[5%]">
                  <h2 className="text-7xl text-black font-semibold" data-aos="fade-up" data-aos-duration="1000">Italian company, <br/>Swiss gold.</h2>
                  <p className="text-xl mt-4 mb-10 text-black" data-aos="fade-up" data-aos-duration="1000">Explore the beauty of Viraj.</p>
                  <Link to="/" rel='noopener noreferrer' className={`px-8 py-2 progress-button-dark uppercase border border-black text-black transition duration-300 ease-in-out`}>Scopri di più</Link>
                </div>
              </div>
            </div>
          )}
        </WaterWave>
    </div>
  );
}

export default WaterSection;
