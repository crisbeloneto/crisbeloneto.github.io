import React, { useState, useRef, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { LiaGlobeAfricaSolid } from "react-icons/lia";
import { IoChevronDownOutline } from "react-icons/io5";

import styles from './LanguageDropdown.module.css';

const languages = [
  { code: 'pt-PT', name: 'languages.pt-PT', flag: 'pt' },
  { code: 'en-US', name: 'languages.en-US', flag: '🇺🇸' },
  { code: 'es-ES', name: 'languages.es-ES', flag: '🇪🇸' },
  { code: 'fr-FR', name: 'languages.fr-FR', flag: '🇫🇷' }
];

const LanguageDropdown = () => {
  const { t, i18n } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  const currentLanguage = languages.find(lang => lang.code === i18n.language) || languages[0];

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleLanguageChange = (langCode) => {
    i18n.changeLanguage(langCode);
    setIsOpen(false);
  };

  const toggleDropdown = (e) => {
    e.stopPropagation();
    setIsOpen(prev => !prev);
  };

  return (
    <div className={styles.languageDropdown} ref={dropdownRef}>
      <button
        onClick={toggleDropdown}
        className={styles.dropdownButton}
        title={t('header.changeLanguage')}
        aria-label={t('header.changeLanguage')}
      >
        <LiaGlobeAfricaSolid />
        <IoChevronDownOutline 
          className={`${styles.chevron} ${isOpen ? styles.chevronUp : ''}`} 
        />
      </button>

      {isOpen && (
        <div className={styles.dropdownMenu}>
          {languages.map((language) => (
            <button
              key={language.code}
              onClick={() => handleLanguageChange(language.code)}
              className={`${styles.dropdownItem} ${
                currentLanguage.code === language.code ? styles.active : ''
              }`}
            >
              <span className={styles.flag}>{language.flag}</span>
              <span className={styles.languageName}>
                {t(language.name)}
              </span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default LanguageDropdown;