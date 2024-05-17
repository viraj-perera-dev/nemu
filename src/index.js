import React from 'react';
import { hydrate } from 'react-dom';
import { createRoot } from 'react-dom/client';
import App from './App';
import reportWebVitals from './reportWebVitals';
import SmoothScroll from './components/SmoothScroll';
import Scrollbar from './components/ScrollBar';
import AOS from 'aos';
import 'aos/dist/aos.css'; // You can also use <link> for styles
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import { MenuProvider } from './MenuContext';
AOS.init();

const isDesktop = () => {
  return window.innerWidth >= 768; // Assuming md breakpoint is 768px
};

// Initialize i18n
i18n
  .use(initReactI18next) // passes i18n down to react-i18next
  .use(LanguageDetector) // detect user's language
  .init({
    resources: {
      en: {
        translation: {
          // English translations
        }
      },
      fr: {
        translation: {
          // French translations
        }
      }
      // Add more languages as needed
    },
    fallbackLng: 'en', // fallback language
    interpolation: {
      escapeValue: false // react already safes from xss
    }
  });

const rootElement = document.getElementById('root');
const root = createRoot(rootElement);

if (rootElement.hasChildNodes()) {
  hydrate(
    <React.StrictMode>
      {isDesktop() ? (
        <>
          <Scrollbar />
          <SmoothScroll />
        </>
      ) : (
        <></>
      )}
      <MenuProvider>
        <App />
      </MenuProvider>
    </React.StrictMode>,
    rootElement
  );
} else {
  root.render(
    <React.StrictMode>
      {isDesktop() ? (
        <>
          <Scrollbar />
          <SmoothScroll />
        </>
      ) : (
        <></>
      )}
      <MenuProvider>
        <App />
      </MenuProvider>
    </React.StrictMode>
  );
}

reportWebVitals();
