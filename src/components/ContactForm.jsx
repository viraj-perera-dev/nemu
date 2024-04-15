import React, { useState } from 'react';
import { Link } from 'react-router-dom';


function ContactForm({ Name, NameClass, NameText, Tel, TelClass, TelText, Email, EmailClass, EmailText, Dropdown, DropdownClass, DropdownText, DropdownItem, Message, MessageClass, MessageText, SendText, SendClass, successText,  successLink, errorText
}) {
    const [showPopup, setShowPopup] = useState(false);
    const [modalFade, setModalFade] = useState('fadeIn');
    const [status, setStatus] = useState(false);

    const handleSubmit = (event) => {
      event.preventDefault(); // Prevent page reload
  
      // Access form elements and log their values
      const nomeCognome = event.target.nome_cognome.value;
      const telefono = event.target.telefono.value;
      const email = event.target.email.value;
  
      console.log('Nome e Cognome:', nomeCognome);
      console.log('Telefono:', telefono);
      console.log('Email:', email);
      setModalFade('fadeIn');
      setShowPopup(true);
      setStatus(true)

        event.target.reset();
  
    };



    const handleClosePopup = () => {
        setModalFade('fadeOut');
        setTimeout(() => {
            setShowPopup(false);
        }, 1500);
      };
    

  return (
    <form className='w-full p-10 text-start' onSubmit={handleSubmit}>
      <div className="mb-5 text-start">
        {/* <label htmlFor="nome_cognome" className={`block ${NameClass}`}>{NameText}</label> */}
        <input type="text" id="nome_cognome" name="nome_cognome" placeholder={NameText} className="w-full ps-2 py-2 mt-1 bg-slate-50 text-black focus:outline-none focus:border-indigo-500" required />
      </div>
      <div className="mb-5 text-start">
        {/* <label htmlFor="telefono" className={`block ${TelClass}`}>{TelText}</label> */}
        <input type="tel" id="telefono" name="telefono" placeholder={TelText} className="w-full ps-2 py-2 mt-1 bg-slate-50 text-black focus:outline-none focus:border-indigo-500" required />
      </div>
      <div className="mb-5 text-start">
        {/* <label htmlFor="email" className={`block ${EmailClass}`}>{EmailText}</label> */}
        <input type="email" id="email" name="email" placeholder={EmailText} className="w-full ps-2 py-2 mt-1 bg-slate-50 text-black focus:outline-none focus:border-indigo-500" required />
      </div>
      {Dropdown && (
        <>
          <div className="mb-4 text-start">
            <label htmlFor="interesse" className={`block ${DropdownClass}`}>{DropdownText}</label>
            <select id="interesse" name="interesse" className="w-full ps-2 py-2 mt-1 bg-slate-50 text-black focus:outline-none focus:border-indigo-500" required>
                {DropdownItem.map((item, index) => (
                <option className='' key={index} value={item}>{item}</option>
                ))}
            </select>
          </div>        
        </>
      )}
      {Message && (
        <>
          <div className="mb-10 text-start">
            <label htmlFor="free_text" className={`block ${MessageClass}`}>{MessageText}</label>
            <textarea id="free_text" name="free_text" rows="4" className="w-full p-2 pb-10 mt-1 bg-slate-50 text-black focus:outline-none focus:border-indigo-500"></textarea>
          </div>
        </>
      )}
      <div className="my-10 text-start">
        <button type="submit" className={`py-2 uppercase ${SendClass} transition duration-300 ease-in-out`}>{SendText}</button>
      </div>
      {showPopup && (
        <div className={`fixed top-0 left-0 w-full h-full flex items-center justify-center text-center glassmorphism ${modalFade}`}>
          <div className={`bg-white p-8 shadow-md`}>
            <p className={`${status ? 'text-green-600' : 'text-rose-700'} text-center font-semibold text-xl mb-6`}>{status ? successText : errorText }</p>
            {status ? 
            <>
                <button onClick={handleClosePopup} className={`px-4 py-2 progress-button-dark border border-black text-black transition duration-300 ease-in-out`}>
                    Back
                </button>
            </> 
            : 
            <>
                <button onClick={handleClosePopup} className={`px-4 py-2 progress-button-dark border border-black text-black transition duration-300 ease-in-out`}>Riprova</button>
            </>}
          </div>
        </div>
      )}


    </form>
  );
}

export default ContactForm;
