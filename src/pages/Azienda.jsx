import React from 'react';
import Static from '../components/Static1';
import FullTransparentSection from '../components/FullTransparent';
import diagonally from '../assets/mouseFollow/diagonalley_nero.png';
import diagonallyWR from '../assets/mouseFollow/diagonalley_strana_bianco.png';
import pattern from '../assets/staticSection/forme-oro4.png';
import acqua from '../assets/staticSection/forme-oro3.png';
import Navbar from '../components/Navbar';
import headerImage from "../assets/staticSection/sede_crop2.jpg";
import logoTransp from '../assets/mouseFollow/CIGtrasparente.png';
import JustText from '../components/JustText';
import Footer from "../components/Footer";
import image1 from '../assets/staticSection/collabora1.png'
import image2 from '../assets/staticSection/collabora2.png'
import FullMinimalSection from '../components/FullMinimalSection';


function Azienda() {

  return (
    <div className="" data-aos="fade-in" data-aos-duration="2000">
      <Navbar />
      <Static 
        headerImage={headerImage}
        logoTransp={logoTransp}
        title='sapien quis auctor.<br/> Nulla congue justo.'
        description='tincidunt ut sapien quis auctor. Nulla fringilla congue justo.'
        href='/'
        logoPosition='left-[130vh] top-[30vh] w-[110vh]'
      />
      <FullTransparentSection 
        grid='grid grid-cols-1 lg:grid-cols-2'
        background={acqua}
        text='text-black'
        button='border border-black text-black progress-button-dark'
        href='/'
        title='Lorem ipsum dolor sit amet, consectetur adipiscing elit.'
        description='In tincidunt ut sapien quis auctor. Nulla fringilla congue justo, nec auctor ante efficitur a. Mauris ac elit eget quam mattis pellentesque eget ut enim. Nunc mollis vehicula nisl eget sollicitudin. Vivamus luctus rhoncus pellentesque.'
        image={diagonallyWR}
        opacity='opacity-100 left-0 top-[-40vh] h-[100vh] w-full md:w-[100vh]'
        bgOpacity='bg-white'
        translate='xl:translate-x-[30%]'
        backgroundColor='bg-white'
        orientation="right"
      />
      <FullMinimalSection 
        headerImage={image1}
        logoTransp=''
        title='auctor. Nulla, <br/>fringilla.'
        description='Nulla fringilla congue justo, nec auctor<br/> ante efficitur a. Mauris ac elit <br/>eget quam mattis'
        href='/azienda'
        logoPosition='left-[-40vh] top-[-30vh] w-[110vh]'
      />
      <FullTransparentSection 
        grid='grid grid-cols-1 lg:grid-cols-2'
        background={pattern}
        text='text-slate-50'
        button='border border-slate-50 text-slate-50 progress-button-light'
        href='/'
        title='Lorem ipsum dolor sit amet, consectetur adipiscing elit.'
        description='In tincidunt ut sapien quis auctor. Nulla fringilla congue justo, nec auctor ante efficitur a. Mauris ac elit eget quam mattis pellentesque eget ut enim. Nunc mollis vehicula nisl eget sollicitudin. Vivamus luctus rhoncus pellentesque.'
        image={diagonally}
        opacity='opacity-100 left-0 top-[-40vh] h-[100vh] w-full md:w-[100vh]'
        bgOpacity='bg-black opacity-85'
        translate='xl:translate-x-[-25%]'
        backgroundColor='bg-black'
        orientation="left"
      />
            <FullMinimalSection 
        headerImage={image2}
        logoTransp=''
        title='auctor. Nulla, <br/>fringilla.'
        description='Nulla fringilla congue justo, nec auctor<br/> ante efficitur a. Mauris ac elit <br/>eget quam mattis'
        href='/azienda'
        logoPosition='left-[-40vh] top-[-30vh] w-[110vh]'
      />
      <Footer/>
    </div>
  )
}

export default Azienda