import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { LiaGlobeAfricaSolid } from "react-icons/lia";
import { MdLightMode, MdDarkMode } from "react-icons/md";
import { IoMenuOutline, IoCloseOutline } from "react-icons/io5";

import styles from './Header.module.css';
import { useTheme } from '../../context/ThemeContext';

const Header = () => {
    const location = useLocation();
    const { isDarkMode, toggleTheme, toggleLanguage } = useTheme();
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

    // Language toggle handler with proper stopPropagation
    const handleLanguageToggle = (e) => {
        e.stopPropagation();
        toggleLanguage();
    };

    return (
        <header className={styles.header}>
            <nav className={styles.navbar}>
                <div className={styles.logo}>
                    CN DevFolio
                </div>

                <ul className={`${styles.navMenu} ${menuOpen ? styles.active : ''}`}>
                    <li className={styles.navItem}>
                        <Link
                            to="/"
                            className={location.pathname === '/' ? styles.active : ''}
                            onClick={() => setMenuOpen(false)}
                        >
                            PROJETOS<span></span><span></span>
                        </Link>
                    </li>
                    <li className={styles.navItem}>
                        <Link
                            to="/about"
                            className={location.pathname === '/about' ? styles.active : ''}
                            onClick={() => setMenuOpen(false)}
                        >
                            SOBRE<span></span><span></span>
                        </Link>
                    </li>
                </ul>

                <div className={styles.navControls}>
                    <button onClick={handleLanguageToggle} className={styles.iconButton} title="Mudar Idioma">
                        <LiaGlobeAfricaSolid />
                    </button>
                    <button onClick={handleThemeToggle} className={styles.iconButton} title="Mudar Tema">
                        {isDarkMode ? <MdLightMode /> : <MdDarkMode />}
                    </button>
                </div>

                <button className={styles.hamburgerMenu} onClick={toggleMenu}>
                    {menuOpen ? <IoCloseOutline /> : <IoMenuOutline />}
                </button>
            </nav>
        </header>
    );
};

export default Header;