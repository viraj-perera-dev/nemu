import React, { useEffect, useState } from 'react';
import FlagIT from '../assets/Bandiere/ITA - Italiano.jpg';
import FlagFR from '../assets/Bandiere/FRA - Francese.jpg';
import FlegARA from '../assets/Bandiere/ARA - Arabo.svg.png';
import FlegCMN from '../assets/Bandiere/CMN - Cinese (Mandarino).jpg';
import FlegDEU from '../assets/Bandiere/DEU - Tedesco.jpg';
import FlegENG from '../assets/Bandiere/ENG - Inglese.jpg';
import FlegJPN from '../assets/Bandiere/JPN - Giapponese.jpg';
import FlegNLD from '../assets/Bandiere/NLD - Olandese.jpg';
import FlegPOR from '../assets/Bandiere/POR - Portoghese.jpg';
import FlegRUS from '../assets/Bandiere/RUS - Russo.jpg';
import FlegSPA from '../assets/Bandiere/SPA - Spagnolo.jpg';
import FlegSWE from '../assets/Bandiere/SWE - Svedese.jpg';

const allFlags = {
  it: FlagIT,
  fr: FlagFR,
  ar: FlegARA,
  cmn: FlegCMN,
  deu: FlegDEU,
  eng: FlegENG,
  jpn: FlegJPN,
  nld: FlegNLD,
  por: FlegPOR,
  rus: FlegRUS,
  spa: FlegSPA,
  swe: FlegSWE,
  // Add more flags as needed
};

const LanguageSelector = ({ selectedFlags, onLanguageChange }) => {
  const [isLanguageMenuOpen, setIsLanguageMenuOpen] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState('it'); // Set the default language to Italian
  const [flags, setFlags] = useState({ it: FlagIT }); // Initialize flags state with the Italian flag

  const changeLanguage = (lng) => {
    setSelectedLanguage(lng); // Update the selected language
    setIsLanguageMenuOpen(false);
    onLanguageChange(lng); // Notify the parent component of the selected language
  };

  useEffect(() => {
    if (selectedFlags === '') {
      return; // If selectedFlags is empty, return early
    }

    const selectedLanguages = selectedFlags.split(', '); // Split the string into an array of languages

    const filteredFlags = {};

    selectedLanguages.forEach((lang) => {
      if (allFlags.hasOwnProperty(lang)) {
        filteredFlags[lang] = allFlags[lang]; // Add the flag to the filteredFlags object if it exists in the flags object
      }
    });

    setFlags(filteredFlags); // Update flags state with filteredFlags
  }, [selectedFlags]);

  return (
    <div className="relative">
      <div className="absolute top-0 right-0 mr-2 z-10">
        <button
          onClick={() => setIsLanguageMenuOpen(!isLanguageMenuOpen)}
          className="flex items-center space-x-2 px-3 py-1"
        >
          <span className="flex items-center space-x-2">
            <img src={flags[selectedLanguage]} alt={`${selectedLanguage.toUpperCase()} Flag`} className="w-9 h-6 rounded" />
          </span>
        </button>
        {isLanguageMenuOpen && (
          <div className="absolute top-10 right-0 bg-white shadow-md rounded-lg mt-2">
            {Object.keys(flags).map((key) => (
              <button
                key={key}
                onClick={() => changeLanguage(key)}
                className="block w-full text-start ps-3 pe-8 py-2 hover:bg-gray-100 rounded-lg flex items-center space-x-2"
              >
                <img src={flags[key]} alt={`${key.toUpperCase()} Flag`} className="w-5 h-5 rounded-full" />
                <span>{key.toUpperCase()}</span>
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default LanguageSelector;
