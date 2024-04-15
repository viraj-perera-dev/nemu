import React from 'react';
import FullBWSection from '../components/FullBWsection';
import logoNero from '../assets/staticSection/schizzi-oro2.png';
import Navbar from '../components/Navbar';
import Static1 from '../components/Static1';
import BigImage from '../components/BigImage';
import headerImage from "../assets/staticSection/prodotto1.png";
import logoTransp from '../assets/mouseFollow/CIGtrasparente.png';
import big1 from '../assets/staticSection/family1.jpg';
import JustText from '../components/JustText';
import AnimatedTextWord from '../components/AnimatedTextWord';
import { Link } from 'react-router-dom';
import AnimatedTextCharacter from '../components/AnimatedTextCharacter';
import logoBianco from '../assets/staticSection/schizzi-oro3111.png';
import image1 from "../assets/staticSection/prodotto3.png";
import image2 from "../assets/staticSection/prodotto4.png";
import FullMinimalSection from '../components/FullMinimalSection';
import Footer from '../components/Footer';



function Prodotti() {

  return (
    <div className="" data-aos="fade-in" data-aos-duration="2000">
      <Navbar />
      <Static1 
        headerImage={headerImage}
        logoTransp=''
        title='unde omnis iste <br/>natus error.'
        description='doloremque laudantium, totam rem aperiam, eaque.<br/> error sit voluptatem accusantium doloremque laudantium,<br/> totam rem aperiam, eaque ipsa'
        href='/demo'
        logoPosition='left-[-40vh] top-[-30vh] w-[110vh]'
      />  
      {/* <section>
        <div className='mx-auto'>
            <div className='h-dvh flex justify-center items-center'>
                <div className={`h-screen w-full bg-black flex justify-center items-center z-20`}>
                    <div className='text-left w-3/4 mx-auto'>
                          <h1 className={`text-1xl font-semibold uppercase mb-2 text-5xl text-slate-50`} >      
                            <AnimatedTextWord text='Lorem ipsum dolor sit amet, consectetur adipiscing elit. ' />
                          </h1>
                        <div data-aos="fade-zoom-in" data-aos-duration="1000" className={`text-lg mt-10 mb-16 text-slate-50`}>Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore  adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem. Ut enim ad <br/> reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur, vel illum qui dolorem eum fugiat quo voluptas nulla pariatur?</div>
                        <Link to='/' rel='noopener noreferrer' className={`px-8 py-2 uppercase border border-slate-50 text-slate-50 progress-button-light transition duration-300 ease-in-out`}>scopri di più</Link>
                    </div>
                </div>   
            </div>
        </div>
    </section> */}
      <FullBWSection 
        background='bg-slate-50'
        text='text-black'
        button='border border-black text-black progress-button-dark'
        href='/demo2'
        title='Lorem ipsum dolor sit amet, consectetur adipiscing elit.'
        description='In tincidunt ut sapien quis auctor. Nulla fringilla congue justo, nec auctor ante efficitur a. Mauris ac elit eget quam mattis pellentesque eget ut enim. Nunc mollis vehicula nisl eget sollicitudin. Vivamus luctus rhoncus pellentesque.'
        image={logoNero}
        opacity='opacity-100'
        translate='md:translate-x-[20%]'
      />
      <FullMinimalSection 
        headerImage={image1}
        logoTransp=''
        title='auctor. Nulla, <br/>fringilla.'
        description='Nulla fringilla congue justo, nec auctor<br/> ante efficitur a. Mauris ac elit <br/>eget quam mattis'
        href='/azienda'
        logoPosition='left-[-40vh] top-[-30vh] w-[110vh]'
      />
      <FullBWSection 
        background='bg-black'
        text='text-slate-50'
        button='border border-slate-50 text-slate-50 progress-button-light'
        href='/'
        title='Lorem ipsum dolor sit amet, consectetur adipiscing elit.'
        description='In tincidunt ut sapien quis auctor. Nulla fringilla congue justo, nec auctor ante efficitur a. Mauris ac elit eget quam mattis pellentesque eget ut enim. Nunc mollis vehicula nisl eget sollicitudin. Vivamus luctus rhoncus pellentesque.'
        image={logoBianco}
        opacity='opacity-100'
        translate='xl:translate-x-[80%]'
      />
      <FullMinimalSection 
        headerImage={image2}
        logoTransp=''
        title='auctor. Nulla, <br/>fringilla.'
        description='Nulla fringilla congue justo, nec auctor<br/> ante efficitur a. Mauris ac elit <br/>eget quam mattis'
        href='/azienda'
        logoPosition='left-[-40vh] top-[-30vh] w-[110vh]'
      />
      {/* <section>
        <div className='mx-auto'>
            <div className='h-dvh flex justify-center items-center'>
                <div className={`h-screen w-full bg-black flex justify-center items-center z-20`}>
                    <div className='text-left w-3/4 mx-auto'>
                          <h1 className={`text-1xl font-semibold uppercase mb-2 text-5xl text-slate-50`} >      
                            <AnimatedTextCharacter text='Lorem ipsum dolor sit amet, consectetur adipiscing elit. ' />
                          </h1>
                        <div data-aos="fade-zoom-in" data-aos-duration="1000" className={`text-lg mt-10 mb-16 text-slate-50`}>Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore  adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem. Ut enim ad <br/> reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur, vel illum qui dolorem eum fugiat quo voluptas nulla pariatur?</div>
                        <Link to='/' rel='noopener noreferrer' className={`px-8 py-2 uppercase border border-slate-50 text-slate-50 progress-button-light transition duration-300 ease-in-out`}>scopri di più</Link>
                    </div>
                </div>   
            </div>
        </div>
    </section>
      <BigImage
        grid='flex'
        background={big1}
        text='text-slate-50'
        button='border border-slate-50 text-slate-50 progress-button-light'
        href='/'
        title='Lorem ipsum'
        description='In tincidunt ut sapien quis auctor. Nulla fringilla congue justo, nec auctor ante efficitur a. Mauris ac elit eget quam mattis pellentesque eget ut enim. Nunc mollis vehicula nisl eget sollicitudin. Vivamus luctus rhoncus pellentesque.'
        image=''
        opacity='opacity-100 left-0 top-[-40vh] h-[100vh] w-full md:w-[100vh]'
        bgOpacity='bg-black opacity-65 xl:w-3/4 w-1/6'
        translate='xl:translate-x-[10%] xl:w-1/4 w-5/6'
        orientation='right'
      /> */}
      <Footer/>
    </div>
  )
}

export default Prodotti