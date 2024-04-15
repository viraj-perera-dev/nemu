import React, { useEffect, useState } from 'react';
import GoldChart from '../components/GoldPrice'; 
import FixingPrice from '../components/FixingGoldPrice';
import SpotPrice from '../components/SpotPrice';

function HomePage() {

  return (
    <>
      <GoldChart/>
      <SpotPrice/>
      <div className='grid grid-cols-6 gap-'>
        <div className='col-start-1 col-span-7'>
          <FixingPrice/>
        </div>
      </div>
    </>
  );
}

export default HomePage;
