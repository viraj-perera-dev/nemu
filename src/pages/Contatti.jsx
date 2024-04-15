import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import ContactForm from '../components/ContactForm';
import GoogleMaps from '../components/GoogleMaps'; 
import { Wrapper } from "@googlemaps/react-wrapper";
import FullMinimalSection from '../components/FullMinimalSection';
import headerImage from "../assets/staticSection/collabora2.png";
import logoTransp from '../assets/mouseFollow/CIGtrasparente.png';
import { FaMapMarkerAlt, FaPhone, FaEnvelope } from 'react-icons/fa';



function Contatti() {
  return (
    <div className="bg-black">
      <Navbar />
      <FullMinimalSection 
        headerImage={headerImage}
        logoTransp={logoTransp}
        title='auctor. Nulla, <br/>fringilla.'
        description='Nulla fringilla congue justo, nec auctor<br/> ante efficitur a. Mauris ac elit <br/>eget quam mattis'
        href='/'
        logoPosition='left-[-40vh] top-[-30vh] w-[110vh]'
      />
      <div className='h-auto lg:h-dvh flex items-center justify-center'>
        <div className='w-full px-4 lg:px-0'>
          <div className="flex flex-col lg:flex-row items-start justify-evenly">
              <div className='w-full lg:w-2/6 py-8 lg:py-16'>
                  <div className='w-full bg-slate-50'>
                    <Wrapper apiKey="AIzaSyCZyoDZ5eFh61i2vM3zyDXUI3WVp3J4E9Y">
                      <GoogleMaps />
                    </Wrapper>
                  </div>
                  <div className='w-full text-start text-slate-50 py-10'>
                    <ul className="list-group list-group-flush">
                      <li className="list-group-item bg-light ms-0 ps-0 flex items-center mb-3">
                        <FaMapMarkerAlt className="me-5" />
                        <a className="text-decoration-none text-dark font-medium opacity-75" rel="noreferrer noopener" href="https://goo.gl/maps/y7ADbUdXX1ZZppbK9" target="_blank">
                          <p className="m-0">Via monte baldo, 14/D INT. 3 37069 VILLAFRANCA DI VERONA (VR)</p>
                        </a>
                      </li>
                      <li className="list-group-item bg-light ms-0 ps-0 flex items-center mb-3">
                        <FaPhone className="me-5" />
                        <a className="text-decoration-none text-dark font-medium opacity-75" href="tel:045 2457421" rel="noreferrer noopener">
                          <p className="m-0">045 2457421</p>
                        </a>
                      </li>
                      <li className="list-group-item bg-light ms-0 ps-0 flex items-center mb-3">
                        <FaEnvelope className="me-5" />
                        <a className="text-decoration-none text-dark font-medium opacity-75" href="mailto:info@careisgold.it" rel="noreferrer noopener">
                          <p className="m-0">INFO@CAREISGOLD.IT</p>
                        </a>
                      </li>
                    </ul>
                    <p className="text-lg font-semibold mt-4">
                      Sede legale:
                    </p>
                    <p className="mt-2 pb-4">
                      Via Monte Baldo 14/D, Villafranca di Verona <br />
                      C.F./P.Iva 04598560235 - REA VR-433912<br />
                      CAP. SOCIALE € 2.000.000,00 i.v.<br />
                      <a className="text-decoration-none text-dark" href="mailto:careisgoldspa@pec.careisgold.it" rel="noreferrer noopener">careisgoldspa@pec.careisgold.it</a><br />
                      Operatore Professionale Oro - Codice n° 5008578
                    </p>
                  </div>
              </div>
              <div className='w-full lg:w-3/6'>
                {/* Content on the left */}
                <ContactForm 
                  Name={true}
                  NameClass='text-slate-50'
                  NameText='Nome e Cognome:'
                  Tel={true}
                  TelClass='text-slate-50'
                  TelText='Telefono:'
                  Email={true}
                  EmailClass='text-slate-50'
                  EmailText='Email:'
                  Dropdown={true}
                  DropdownItem={['Acquisto di un piano rateale', 'Acquisto unico', 'Lavorare con noi']}
                  DropdownClass='text-slate-50'
                  DropdownText='Interessato a:'
                  SendText='Invia'
                  SendClass='progress-button-light border border-slate-50 text-slate-50 w-full md:w-6/12 '
                  Message={true}
                  MessageClass='text-slate-50'
                  MessageText='Messaggio:'
                  successText='Messaggio inviato con successo!'  
                  successLink='/contatti'
                  errorText='Si è verificato un errore, Riprova!'
                />
              </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  )
}

export default Contatti;
