import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { IoClose } from "react-icons/io5";
import { RxHamburgerMenu } from "react-icons/rx";
import logo from "../assets/logo/logo1.png";

function Navbar() {
    const [isVisible, setIsVisible] = useState(true);
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [menuTransition, setMenuTransition] = useState(false);
    const [hideLink, setHideLink] = useState(false);
    const [negativeClass, setNegativeClass] = useState('text-negative-remove');

    let lastScrollY = window.scrollY;

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 850 && window.innerWidth > 768) {
                setNegativeClass('text-negative');
                if (!isMenuOpen) {
                    setIsVisible(window.scrollY < lastScrollY);
                    lastScrollY = window.scrollY;
                    document.body.style.overflow = 'auto';
                } else if (isMenuOpen){
                    document.body.style.overflow = 'hidden';
                }
            }else if(window.scrollY > 710 && window.innerWidth < 768){
                setNegativeClass('text-negative');
                if (!isMenuOpen) {
                    setIsVisible(window.scrollY < lastScrollY);
                    lastScrollY = window.scrollY;
                    document.body.style.overflow = 'auto';
                } else if (isMenuOpen){
                    document.body.style.overflow = 'hidden';
                }
            }else{
                setNegativeClass('text-negative-remove');
            }
        };


        window.addEventListener('scroll', handleScroll, { passive: true });

        return () => window.removeEventListener('scroll', handleScroll);
    }, [isMenuOpen]); 
    

    const handleMenuOpen = () => {
        setNegativeClass('text-negative-remove');
        setIsMenuOpen(true);
        setHideLink(false);
        setTimeout(() => {
            setMenuTransition(true);
        }, 1000);
    };

    const handleMenuClose = () => {
        setHideLink(true);
        setTimeout(() => {
            setMenuTransition(false);
            setIsMenuOpen(false);
        }, 900);
        setTimeout(() => {
            setNegativeClass('text-negative');
        }, 2000);
    };

    const handleClickForm = () => {
        const element = document.querySelector('.background-form-image');
        element.scrollIntoView({ behavior: 'smooth' });
      };

    return (
    <>
        <div className={`fixed z-30 top-0 left-0 w-full bg-black transition-transform duration-300 ${isVisible ? 'translate-y-0' : '-translate-y-full'}`}>
            <div className={`flex justify-start lg:justify-between items-center text-slate-50 lg:px-40`}>
                <a href="/"><img src={logo} alt="logo" className='w-1/2 py-3 md: lg:w-80'/></a>
                <div className='flex-wrap text-end hidden lg:block'>
                    <a href="tel:+0454567890" className="uppercase font-medium mb-10">Tel. +39 045 4567890 (24h su 24)</a><br/><br/>
                    <button onClick={handleClickForm} className="uppercase font-medium">Aperto tutti i giorni dalle 9.00 alle 20.00</button>
                </div>
                {/* <div className="hidden lg:block">
                    <nav className="flex justify-end items-center">
                        <Link to="/" className="uppercase font-medium mx-6">Home</Link>
                        <Link to="/azienda" className="uppercase font-medium mx-6">Azienda</Link>
                        <Link to="/notizie" className="uppercase font-medium mx-6">Notizie</Link>
                        <Link to="/prodotti" className="uppercase font-medium mx-6">Prodotti</Link>
                        <Link to="/collabora-con-noi" className="uppercase font-medium mx-6">Collabora con noi</Link>
                        <Link to="/faq" className="uppercase font-medium mx-6">FAQ</Link>
                        <Link to="/contatti" className="uppercase font-medium mx-6">Contatti</Link>
                    </nav>
                </div> */}
                {/* <div className="lg:hidden">
                    <button className="w-6 h-6" onClick={handleMenuOpen}>
                       <div className=''><RxHamburgerMenu className='text-3xl' /></div>
                    </button>
                    <nav className={`flex flex-col justify-center items-center absolute top-0 right-0 w-full h-full bg-black transition-all duration-[1000ms] ease-in ${isMenuOpen ? 'opacity-100' : 'opacity-0'} ${isMenuOpen ? 'translate-y-0' : '-translate-y-full'} ${isMenuOpen && 'h-screen'}`}>
                        {menuTransition && (
                            <>
                                <Link to="/" data-aos="fade-right" data-aos-duration="250" className={`${hideLink ? 'link-hidden' : ''} text-slate-50 uppercase mx-6 my-2`}>Home</Link>
                                <Link to="/azienda" data-aos="fade-right" data-aos-duration="500" className={`${hideLink ? 'link-hidden' : ''} text-slate-50 uppercase mx-6 my-2`}>Azienda</Link>
                                <Link to="/notizie" data-aos="fade-right" data-aos-duration="750" className={`${hideLink ? 'link-hidden' : ''} text-slate-50 uppercase mx-6 my-2`}>Notizie</Link>
                                <Link to="/prodotti" data-aos="fade-right" data-aos-duration="1000" className={`${hideLink ? 'link-hidden' : ''} text-slate-50 uppercase mx-6 my-2`}>Prodotti</Link>
                                <Link to="/collabora-con-noi" data-aos="fade-right" data-aos-duration="1250" className={`${hideLink ? 'link-hidden' : ''} text-slate-50 uppercase mx-6 my-2`}>Collabora con noi</Link>
                                <Link to="/faq" data-aos="fade-right" data-aos-duration="1500" className={`${hideLink ? 'link-hidden' : ''} text-slate-50 uppercase mx-6 my-2`}>FAQ</Link>
                                <Link to="/contatti" data-aos="fade-right" data-aos-duration="1750" className={`${hideLink ? 'link-hidden' : ''} text-slate-50 uppercase mx-6 my-2`}>Contatti</Link>
                                <button className="absolute top-0 right-0 w-6 h-6 text-white m-10" onClick={handleMenuClose}>
                                    <IoClose className='text-3xl'/>
                                </button>
                            </>
                        )}
                    </nav>
                </div> */}
            </div>
        </div>
    </>
    );
}

export default Navbar;
