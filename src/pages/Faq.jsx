import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import Static1 from '../components/Static1';
import headerImage from "../assets/staticSection/forme-oro5.png";
import logoTransp from '../assets/mouseFollow/CIGtrasparente.png';
import { FiChevronLeft, FiChevronRight, FiSearch } from 'react-icons/fi';
import { FiChevronDown } from 'react-icons/fi'; 
import faqData from '../assets/json/faq.json';
import Footer from '../components/Footer';


function Faq() {
  const [searchQuery, setSearchQuery] = useState('');
  const [isOpen, setIsOpen] = useState(null); // State to track which dropdown is open

  // Filter FAQ items based on search query
  const filteredFaq = faqData.filter(item =>
    item.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.answer.toLowerCase().includes(searchQuery.toLowerCase())
  );
  

  // Function to handle toggling dropdown
  const handleToggle = (index) => {
    setIsOpen(isOpen === index ? null : index); // If clicked on same index, close it, otherwise open it
  };

  return (
    <div className="">
      <Navbar />
      <Static1 
        headerImage={headerImage}
        logoTransp={logoTransp}
        title='error sit voluptatem, <br/>accusantium sit.'
        description='accusantium doloremque laudantium, <br/>accusantium doloremque laudantium, totam rem aperiam,<br/> eaque totam rem aperiam, eaque'
        href='/'
        logoPosition='left-[-40vh] top-[-30vh] w-[110vh]'
      />
      <div className='flex flex-col items-center justify-start flex-grow pb-20'>
        <div className='relative mt-20 w-11/12 md:w-1/2'>
          <input 
            type='text' 
            placeholder='Domande frequenti . . .' 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className=' bg-neutral-800 text-slate-50 px-4 py-2 focus:outline-none focus:border-blue-500 w-full'
          />
          <FiSearch className='search-icon absolute top-1/2 right-4 transform -translate-y-1/2 text-gray-400' />
        </div>
        
        <div className='mt-8 w-11/12 md:w-1/2'>
          {filteredFaq.map((item, index) => (
            <div key={index} className='faq-item border border-2 border-neutral-800 p-4 mb-4'>
              <div 
                className='faq-question text-lg font-semibold cursor-pointer text-start text-slate-100 flex justify-between align-center'
                onClick={() => handleToggle(index)} 
              >
                {item.question}
                <FiChevronRight className={`text-slate-50 transition-transform duration-300 my-auto transform ${isOpen === index ? 'rotate-90' : ''}`} />

              </div>
              {isOpen === index && ( 
                <div className='faq-answer text-start text-slate-100 mt-6'>{item.answer}</div>
              )}
            </div>
          ))}
        </div>
      </div>
      <Footer/>
    </div>
  );
}

export default Faq;
