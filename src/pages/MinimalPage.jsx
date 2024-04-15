import React from 'react'
import HeaderSinglePage from '../components/HeaderSinglePage'
import logoNero from '../assets/mouseFollow/logonero.png';
import headerImage from "../assets/staticSection/family4.jpg";


function templateOne() {

  return (
    <div style={{"height":"1000rem"}} className='text-slate-500'>
      <HeaderSinglePage 
        background='bg-black'
        text='text-slate-50'
        button='border border-slate-50 text-slate-50 progress-button-light'
        href='/'
        title='Lorem ipsum dolor sit amet, consectetur adipiscing elit.'
        description='In tincidunt ut sapien quis auctor. Nulla fringilla congue justo, nec auctor ante efficitur a. Mauris ac elit eget quam mattis pellentesque eget ut enim. Nunc mollis vehicula nisl eget sollicitudin. Vivamus luctus rhoncus pellentesque.'
        image={headerImage}
        opacity='opacity-45'
        translate='md:translate-x-[20%]'
      />
    </div>
  )
}

export default templateOne