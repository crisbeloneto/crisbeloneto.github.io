import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { LiaGlobeAfricaSolid } from "react-icons/lia";
import { MdLightMode, MdDarkMode } from "react-icons/md";
import { useTheme } from '../../context/ThemeContext';
import styles from './Header.module.css';

const Header = () => {
    const location = useLocation();
    const { isDarkMode, toggleTheme, toggleLanguage } = useTheme();

    return (
        <header className={styles.header}>
            <nav className={styles.navbar}>
                <div className={styles.logo}>CN DevFolio</div>
                <ul className={styles.navMenu}>
                    <li className={styles.navItem}>
                        <Link
                            to="/"
                            className={location.pathname === '/' ? styles.active : ''}
                        >
                            PROJETOS<span></span><span></span>
                        </Link>
                    </li>
                    <li className={styles.navItem}>
                        <Link
                            to="/about"
                            className={location.pathname === '/about' ? styles.active : ''}
                        >
                            SOBRE<span></span><span></span>
                        </Link>
                    </li>
                </ul>
                <div className={styles.navControls}>
                    <button onClick={toggleLanguage} className={styles.iconButton} title="Switch Language">
                        <LiaGlobeAfricaSolid />
                    </button>
                    <button onClick={toggleTheme} className={styles.iconButton} title="Switch Theme">
                        {isDarkMode ? <MdLightMode /> : <MdDarkMode />}
                    </button>
                </div>
            </nav>
        </header>
    );
};

export default Header;