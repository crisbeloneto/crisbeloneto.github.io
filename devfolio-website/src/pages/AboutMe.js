import React from 'react';
import styles from './AboutMe.module.css';
import Header from '../components/header/Header';
import Footer from '../components/footer/Footer';

const AboutMe = () => {

    return (
        <div className={styles.mainContainer}>
            <Header />

            <main className={styles.mainContent}>
                <div className={styles.profileSection}>
                    <div className={styles.profileImage}>
                        <img src="/api/placeholder/200/200" alt="Profile" />
                    </div>
                    <div className={styles.profileInfo}>
                        <h1>Crisbelo Neto</h1>
                        <h2>Desenvolvedor Full Stack</h2>
                    </div>
                </div>

                <div className={styles.contentSection}>
                    <section className={styles.aboutSection}>
                        <h3>Sobre Mim</h3>
                        <p>
                            Olá! Sou um desenvolvedor full stack apaixonado por criar soluções inovadoras
                            e experiências digitais envolventes. Com experiência em diversas tecnologias
                            web modernas, busco constantemente aprender e evoluir na minha jornada
                            profissional.
                        </p>
                    </section>

                    <section className={styles.skillsSection}>
                        <h3>Habilidades</h3>
                        <div className={styles.skillsGrid}>
                            <div className={styles.skillCategory}>
                                <h4>Frontend</h4>
                                <ul>
                                    <li>React.js</li>
                                    <li>JavaScript/TypeScript</li>
                                    <li>HTML5/CSS3</li>
                                    <li>Tailwind CSS</li>
                                </ul>
                            </div>
                            <div className={styles.skillCategory}>
                                <h4>Backend</h4>
                                <ul>
                                    <li>Node.js</li>
                                    <li>Java Spring Boot</li>
                                    <li>PostgreSQL</li>
                                    <li>MongoDB</li>
                                </ul>
                            </div>
                            <div className={styles.skillCategory}>
                                <h4>Ferramentas</h4>
                                <ul>
                                    <li>Git</li>
                                    <li>Docker</li>
                                    <li>AWS</li>
                                    <li>Jira</li>
                                </ul>
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