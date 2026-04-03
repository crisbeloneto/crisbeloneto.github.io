import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { MdLightMode, MdDarkMode } from "react-icons/md";
import { IoMenuOutline, IoCloseOutline } from "react-icons/io5";

import styles from './Header.module.css';
import { useTheme } from '../../context/ThemeContext';
import LanguageDropdown from '../languageDropdown/LanguageDropdown';

const Header = () => {
    const { t } = useTranslation();
    const location = useLocation();
    const { isDarkMode, toggleTheme } = useTheme();
    const [menuOpen, setMenuOpen] = useState(false);

    // Handle window resize - close menu when switching to desktop view
    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth > 768) {
                setMenuOpen(false);
            }
        };

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    // Toggle menu
    const toggleMenu = () => {
        setMenuOpen(prevState => !prevState);
    };

    // Theme toggle handler with proper stopPropagation
    const handleThemeToggle = (e) => {
        e.stopPropagation();
        toggleTheme();
    };

    return (
        <header className={styles.header}>
            <nav className={styles.navbar}>
                <div className={styles.logo}>
                    <span className={styles.logoLabel}> CN Devfolio </span>
                    <img
                        className={styles.logoImage}
                        src="/images/website-logo/cn-devfolio-logo.png"
                        alt="Logo"
                    />
                </div>

                <ul className={`${styles.navMenu} ${menuOpen ? styles.active : ''}`}>
                    <li className={styles.navItem}>
                        <Link
                            to="/"
                            className={location.pathname === '/' ? styles.active : ''}
                            onClick={() => setMenuOpen(false)}
                        >
                            {t('header.projects')}<span></span><span></span>
                        </Link>
                    </li>
                    <li className={styles.navItem}>
                        <Link
                            to="/about"
                            className={location.pathname === '/about' ? styles.active : ''}
                            onClick={() => setMenuOpen(false)}
                        >
                            {t('header.about')}<span></span><span></span>
                        </Link>
                    </li>
                </ul>

                <div className={styles.navControls}>
                    <LanguageDropdown />
                    <button onClick={handleThemeToggle} className={styles.iconButton} title={t('header.changeTheme')}>
                        {isDarkMode ? <MdLightMode /> : <MdDarkMode />}
                    </button>
                </div>

                <button className={styles.hamburgerMenu} onClick={toggleMenu} title="Hamburger Menu">
                    {menuOpen ? <IoCloseOutline /> : <IoMenuOutline />}
                </button>
            </nav>
        </header>
    );
};

export default Header;