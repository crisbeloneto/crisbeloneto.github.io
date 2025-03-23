import React, { useState, useEffect, useMemo } from 'react';
import { SiMysql, SiSpring, SiGit, SiDocker, SiNodedotjs, SiPython } from "react-icons/si";
import { GrReactjs } from "react-icons/gr";
import { BiLogoPostgresql } from "react-icons/bi";
import { FaJava, FaJs } from 'react-icons/fa';
import { DiScrum, DiVisualstudio } from "react-icons/di";

import styles from './AboutMe.module.css';
import Header from '../components/header/Header';
import Footer from '../components/footer/Footer';

const SKILL_ICON_SIZE = 70;
const CATEGORY_CHANGE_INTERVAL = 5000; // 5 seconds per category
const ICON_ANIMATION_DELAY = 200; // 200ms delay between each icon animation

const AboutMe = () => {
    const [currentCategoryIndex, setCurrentCategoryIndex] = useState(0);
    const [isTransitioning, setIsTransitioning] = useState(false);
    const [visibleIcons, setVisibleIcons] = useState([]);

    // Use useMemo to prevent recreating the array on every render
    const skillsData = useMemo(() => [
        {
            category: 'Linguagem de Programação',
            icons: [
                { Icon: FaJava, name: 'Java' },
                { Icon: FaJs, name: 'JavaScript' },
                { Icon: SiPython, name: 'Python' },
                { Icon: SiNodedotjs, name: 'Node.js' }
            ]
        },
        {
            category: 'Frameworks',
            icons: [
                { Icon: SiSpring, name: 'Spring' },
                { Icon: GrReactjs, name: 'React' }
            ]
        },
        {
            category: 'Databases',
            icons: [
                { Icon: SiMysql, name: 'MySQL' },
                { Icon: BiLogoPostgresql, name: 'PostgreSQL' }
            ]
        },
        {
            category: 'Ferramentas',
            icons: [
                { Icon: SiGit, name: 'Git' },
                { Icon: SiDocker, name: 'Docker' },
                { Icon: DiScrum, name: 'Scrum' },
                { Icon: DiVisualstudio, name: 'VS Code' }
            ]
        }
    ], []); // Empty dependency array means this will only be computed once
    
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
                        <h1>Olá, sou o Crisbelo Neto 👋</h1>
                        <h2>Desenvolvedor de Software</h2>
                        <p>
                            Motivado, orientado a resoluçao de problemas, hábil
                            em tecnologias modernas de frontend e backend, com experiência
                            prática na construção de aplicações web e APIs RESTful.
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
                                        const { Icon, name } = iconData;
                                        return (
                                            <div 
                                                key={name} 
                                                className={`${styles.iconWrapper} ${visibleIcons.includes(index) ? styles.slideIn : styles.hidden}`}
                                            >
                                                <Icon size={SKILL_ICON_SIZE} title={name} />
                                                <span className={styles.iconLabel}>{name}</span>
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>
                        </div>
                    </section>

                    <section className={styles.contactSection}>
                        <h3>Contato</h3>
                        <p>
                            Estou sempre aberto a novas oportunidades e colaborações.
                            Sinta-se à vontade para entrar em contato!
                        </p>
                        <div className={styles.contactLinks}>
                            <a href="mailto:seu-email@exemplo.com">Email</a>
                            <a href="https://linkedin.com/in/seu-perfil" target="_blank" rel="noopener noreferrer">LinkedIn</a>
                            <a href="https://github.com/seu-usuario" target="_blank" rel="noopener noreferrer">GitHub</a>
                        </div>
                    </section>
                </div>
            </main>

            <Footer />
        </div>
    );
};

export default AboutMe;