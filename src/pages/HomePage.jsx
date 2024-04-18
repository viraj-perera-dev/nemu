import React from 'react';
import { Link } from 'react-router-dom';

function HomePage() {

  return (
    <>
      <div className='grid grid-cols-6 gap-'>
        <div className='col-start-1 col-span-7'>
          <p className='text-center fw-semibold text-5xl text-slate-50 my-20'>Hello world!</p>
          <Link to='/menu/661b65b05a951a7f96968200/' className='rounded bg-slate-50 text-black px-3 py-2'>test menu</Link>
        </div>
      </div>
    </>
  );
}

export default HomePage;
