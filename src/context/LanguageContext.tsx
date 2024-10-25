import React, { createContext, useContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Localization from 'expo-localization';
import { I18n } from 'i18n-js';

// Define available languages
const translations = {
  en: {
    home: 'Home',
    history: 'History',
    contact: 'Contact',
    settings: 'Settings',
    generateStory: 'Generate Story',
    theme: 'Theme',
    language: 'Language',
    account: 'Account',
    aboutUs: 'About Us',
    privacyPolicy: 'Privacy Policy',
    termsOfUse: 'Terms of Use',
  },
  es: {
    home: 'Inicio',
    history: 'Historial',
    contact: 'Contacto',
    settings: 'Ajustes',
    generateStory: 'Generar Historia',
    theme: 'Tema',
    language: 'Idioma',
    account: 'Cuenta',
    aboutUs: 'Sobre Nosotros',
    privacyPolicy: 'Política de Privacidad',
    termsOfUse: 'Términos de Uso',
  },
  // Add more languages as needed
};

const i18n = new I18n(translations);

// Set the default locale
i18n.locale = Localization.locale;
i18n.enableFallback = true;
i18n.defaultLocale = 'en';

interface LanguageContextType {
  language: string;
  setLanguage: (lang: string) => Promise<void>;
  t: (key: string) => string;
  availableLanguages: { label: string; value: string }[];
}

const LanguageContext = createContext<LanguageContextType>({
  language: 'en',
  setLanguage: async () => {},
  t: (key: string) => key,
  availableLanguages: [],
});

export const useLanguage = () => useContext(LanguageContext);

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [language, setLanguageState] = useState(Localization.locale.split('-')[0]);

  const availableLanguages = [
    { label: 'English', value: 'en' },
    { label: 'Español', value: 'es' },
    // Add more languages as needed
  ];

  useEffect(() => {
    loadLanguage();
  }, []);

  const loadLanguage = async () => {
    try {
      const savedLanguage = await AsyncStorage.getItem('language');
      if (savedLanguage) {
        setLanguageState(savedLanguage);
        i18n.locale = savedLanguage;
      }
    } catch (error) {
      console.error('Error loading language:', error);
    }
  };

  const setLanguage = async (lang: string) => {
    try {
      await AsyncStorage.setItem('language', lang);
      setLanguageState(lang);
      i18n.locale = lang;
    } catch (error) {
      console.error('Error saving language:', error);
    }
  };

  const t = (key: string) => i18n.t(key);

  return (
    <LanguageContext.Provider
      value={{
        language,
        setLanguage,
        t,
        availableLanguages,
      }}
    >
      {children}
    </LanguageContext.Provider>
  );
};