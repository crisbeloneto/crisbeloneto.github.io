import React, { useState, useEffect, useMemo } from 'react';
import { useTranslation } from 'react-i18next';

import styles from './AboutMe.module.css';
import Header from '../components/header/Header';
import Footer from '../components/footer/Footer';

const SKILL_ICON_SIZE = 70;
const CATEGORY_CHANGE_INTERVAL = 5000; // 5 seconds per category
const ICON_ANIMATION_DELAY = 200; // 200ms delay between each icon animation

const useTypewriter = (text, speed = 50, startDelay = 0, pauseDuration = 2000) => {
    const [displayedText, setDisplayedText] = useState('');
    const [isComplete, setIsComplete] = useState(false);

    useEffect(() => {
        if (!text) return;

        let timeoutId;
        let intervalId;

        const startTyping = () => {
            let index = 0;
            setDisplayedText('');
            setIsComplete(false);

            intervalId = setInterval(() => {
                if (index < text.length) {
                    setDisplayedText(text.slice(0, index + 1));
                    index++;
                } else {
                    setIsComplete(true);
                    clearInterval(intervalId);

                    // After completing, wait then restart the animation
                    timeoutId = setTimeout(() => {
                        startTyping();
                    }, pauseDuration);
                }
            }, speed);
        };

        // Initial delay before starting
        timeoutId = setTimeout(startTyping, startDelay);

        return () => {
            clearTimeout(timeoutId);
            clearInterval(intervalId);
        };
    }, [text, speed, startDelay, pauseDuration]);

    return { displayedText, isComplete };
};

const AboutMe = () => {
    const { t } = useTranslation();
    const [currentCategoryIndex, setCurrentCategoryIndex] = useState(0);
    const [isTransitioning, setIsTransitioning] = useState(false);
    const [visibleIcons, setVisibleIcons] = useState([]);

    // Get translated texts
    const titleText = useMemo(() => t('about.greeting'), [t]);
    const descriptionText = useMemo(() => t('about.description'), [t]);

    const { displayedText: displayedTitle } = useTypewriter(titleText, 80, 500, 3000);
    const { displayedText: displayedDescription } = useTypewriter(descriptionText, 30, 2000, 4000);

    // Updated skillsData with translated categories
    const skillsData = useMemo(() => [
        {
            category: t('about.skillCategories.databases'),
            icons: [
                { image: 'postgresql.png', name: 'PostgreSQL' },
                { image: 'mysql.png', name: 'MySQL' }
            ]
        },
        {
            category: t('about.skillCategories.programming'),
            icons: [
                { image: 'java.png', name: 'Java' },
                { image: 'javascript.png', name: 'JavaScript' },
                { image: 'python.png', name: 'Python' }
            ]
        },
        {
            category: t('about.skillCategories.frameworks'),
            icons: [
                { image: 'spring-boot.png', name: 'Spring Boot' },
                { image: 'reactjs.png', name: 'Reactjs' },
                { image: 'angularjs.png', name: 'Angularjs' }
            ]
        },
        {
            category: t('about.skillCategories.tools'),
            icons: [
                { image: 'git.png', name: 'Git' },
                { image: 'postman.png', name: 'Postman' },
                { image: 'vs-code.png', name: 'VS Code' }
            ]
        }
    ], [t]);

    // Handle cycling through categories
    useEffect(() => {
        const cycleCategory = () => {
            // Start transition out
            setIsTransitioning(true);
            setVisibleIcons([]);

            // After transition out completes, change category and transition back in
            setTimeout(() => {
                setCurrentCategoryIndex((prevIndex) =>
                    (prevIndex + 1) % skillsData.length
                );
                setIsTransitioning(false);
            }, 500); // Half of transition time for fade out
        };

        // Set interval for cycling
        const intervalId = setInterval(cycleCategory, CATEGORY_CHANGE_INTERVAL);

        // Cleanup interval on component unmount
        return () => clearInterval(intervalId);
    }, [skillsData.length]);

    // Handle icon animations when category changes
    useEffect(() => {
        if (isTransitioning) return;

        const currentIcons = skillsData[currentCategoryIndex].icons;
        setVisibleIcons([]);

        // Animate icons one by one with delay
        currentIcons.forEach((icon, index) => {
            setTimeout(() => {
                setVisibleIcons(prev => [...prev, index]);
            }, index * ICON_ANIMATION_DELAY);
        });
    }, [currentCategoryIndex, isTransitioning, skillsData]);

    return (
        <div className={styles.mainContainer}>
            <Header />

            <main className={styles.mainContent}>
                <div className={styles.profileSection}>
                    <div className={styles.profileInfo}>
                        <h1 className={styles.typewriter}>
                            {displayedTitle}
                            <span className={styles.cursor}>|</span>
                        </h1>
                        <h2>{t('about.jobTitle')}</h2>
                        <p className={styles.typewriter}>
                            {displayedDescription}
                        </p>
                    </div>
                </div>

                <div className={styles.contentSection}>
                    <section className={styles.skillsSection}>
                        <div className={styles.skillsDisplay}>
                            <div className={styles.skillCategoryContainer}>
                                <div className={styles.skillCategory}>
                                    <p className={`${styles.categoryLabel} ${isTransitioning ? styles.fadeOut : styles.fadeIn}`}>
                                        {skillsData[currentCategoryIndex].category}
                                    </p>
                                </div>
                                <div className={styles.skillIconsContainer}>
                                    {skillsData[currentCategoryIndex].icons.map((iconData, index) => {
                                        const { image, name } = iconData;
                                        return (
                                            <div
                                                key={name}
                                                className={`${styles.iconWrapper} ${visibleIcons.includes(index) ? styles.slideIn : styles.hidden}`}
                                            >
                                                <img
                                                    src={`/images/tools-icons/${image}`}
                                                    alt={name}
                                                    title={name}
                                                    width={SKILL_ICON_SIZE}
                                                    height={SKILL_ICON_SIZE}
                                                    className={styles.skillIcon}
                                                />
                                                <span className={styles.iconLabel}>{name}</span>
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>
                        </div>
                    </section>

                    {/* 
                    <section className={styles.contactSection}>
                        <h3>{t('about.contact')}</h3>
                        <p>
                            {t('about.contactDescription')}
                        </p>
                        <div className={styles.contactLinks}>
                            <a href="mailto:seu-email@exemplo.com">Email</a>
                            <a href="https://linkedin.com/in/seu-perfil" target="_blank" rel="noopener noreferrer">LinkedIn</a>
                            <a href="https://github.com/seu-usuario" target="_blank" rel="noopener noreferrer">GitHub</a>
                        </div>
                    </section>
                    */}
                </div>
            </main>

            <Footer />
        </div>
    );
};

export default AboutMe;