import React, { useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import styles from './Projects.module.css';
import { FaGithub } from 'react-icons/fa';
import { IoChevronBack, IoChevronForward } from 'react-icons/io5';
import { TbWorldWww } from 'react-icons/tb';
import Header from '../components/header/Header';
import Footer from '../components/footer/Footer';

const Projects = () => {
  const scrollContainerRef = useRef(null);
  const [activeFilter, setActiveFilter] = useState('Tudo');

  const filters = ['Tudo', 'Web App', 'Website',
    'Landing Page', 'Mobile', 'Desktop', 'Jogo 2D'];

  const projectCards = [
    {
      id: 1,
      title: 'Kyonda',
      owner: 'CoisaDigital',
      ownerWebsiteLink: 'https://coisadigital.ao/',
      details: ['Um mercado digital de agronegócio que aproxima os produtores e consumidores de toda a parte do país.',
        '', 'Fiz parte da equipa de desenvolvimento desta plataforma atuando como desenvolvedor web full-stack.',
      ],
      type: 'Web App',
      image: '/images/projects-images/kyonda-logo.png',
      websiteLink: 'https://kyonda.ao/'
    },
    {
      id: 2,
      title: 'Cnvrstn @pp',
      details: 'Aplicativo web de chat/conversação em tempo real construído com React.js no front-end e Java Spring Boot no back-end, permitindo comunicação instantânea e compartilhamento de mídia.',
      type: 'Web App',
      image: '/api/placeholder/64/64',
      githubRepoLink: 'https://github.com/crisbeloneto/conversation'
    },
    {
      id: 3,
      title: 'Soluções Auto - Landing Page',
      details: 'Landing page para uma oficina automotiva fictícia, que presta serviços de reparação de automóveis e venda de peças.',
      type: 'Landing Page',
      image: '/images/projects-images/solucoes-auto-logo.jpeg',
      websiteLink: 'https://solauto-landing-page.vercel.app/',
      githubRepoLink: 'https://github.com/netocrs/solucoesauto-landing-page'
    },
    {
      id: 4,
      title: 'Desktop App',
      details: 'Aplicativo desktop desenvolvido com Electron para aumentar a produtividade, incluindo gerenciamento de tarefas e lembretes.',
      type: 'Desktop',
      image: '/api/placeholder/64/64'
    },
    {
      id: 5,
      title: 'Klondike Solitaire',
      details: 'Jogo clássico de cartas (solitário), desenvolvido em Java, que usa dos recuros da API Java 2D para desenvolvimento de jogos e animações.',
      type: 'Jogo 2D',
      image: '/images/projects-images/klondike-game-image.png',
      githubRepoLink: 'https://github.com/netocrs/Klondike'
    },
    {
      id: 6,
      title: 'Snake Game',
      details: 'Jogo clássico da cobra, desenvolvido em linguegem C.',
      type: 'Jogo 2D',
      image: '/images/projects-images/snake-game-image.png',
      githubRepoLink: 'https://github.com/netocrs/SnakeGame'
    },
  ];


  const scroll = (direction) => {
    if (scrollContainerRef.current) {
      const scrollAmount = 300;
      const newScrollPosition =
        scrollContainerRef.current.scrollLeft + (direction === 'left' ? -scrollAmount : scrollAmount);

      scrollContainerRef.current.scrollTo({
        left: newScrollPosition,
        behavior: 'smooth'
      });
    }
  };

  const filteredProjects = () => {
    if (activeFilter === 'Tudo') return projectCards;
    return projectCards.filter(project => project.type === activeFilter);
  };

  return (
    <div className={styles.mainContainer}>
      <Header />
      <main className={styles.mainContent}>
        <div className={styles.filtersSection}>
          <div className={styles.filtersList}>
            {filters.map(filter => (
              <span
                key={filter}
                className={`${styles.filterTag} ${activeFilter === filter ? styles.activeFilter : ''}`}
                onClick={() => setActiveFilter(filter)}
              >
                {filter}
              </span>
            ))}
          </div>
        </div>

        <section className={styles.cardsSection}>
          <div className={styles.sliderContainer}>
            <button
              className={`${styles.scrollButton} ${styles.scrollButtonLeft}`}
              onClick={() => scroll('left')}
            >
              <IoChevronBack />
            </button>

            <div className={styles.cardsContainer} ref={scrollContainerRef}>
              {filteredProjects().length > 0 ? (
                filteredProjects().map((card) => (
                  <div key={card.id} className={styles.card}>
                    <div className={styles.cardHeader}>
                      <div className={styles.projectImage}>
                        <img src={card.image} alt={card.title} />
                      </div>
                      <div className={styles.projectInfo}>
                        <h3>{card.title}</h3>
                        {card.owner && (
                          <p className={styles.owner}>
                            Proprietário: &nbsp;
                            <Link to={card.ownerWebsiteLink} target="_blank" rel="noopener noreferrer" title="Visitar site">
                              <span>{card.owner}</span>
                            </Link>
                          </p>
                        )}
                        <div className={styles.projectLinks}>
                          {card.websiteLink && (
                            <Link className={styles.projectSitesLink} to={card.websiteLink} target="_blank" rel="noopener noreferrer">
                              <TbWorldWww title="Visitar site" />
                            </Link>
                          )}
                          {card.githubRepoLink && (
                            <Link className={styles.projectSitesLink} to={card.githubRepoLink} target="_blank" rel="noopener noreferrer">
                              <FaGithub title="Ver repositório github deste projeto" />
                            </Link>
                          )}
                        </div>
                      </div>
                    </div>
                    <div className={styles.projectDetailsContainer}>
                      <p className={styles.projectDetails}>
                        {Array.isArray(card.details)
                          ? card.details.map((paragraph, index) => (
                            <React.Fragment key={index}>
                              {paragraph}
                              {index < card.details.length - 1 && <br />}
                            </React.Fragment>
                          ))
                          : card.details}
                      </p>
                    </div>
                  </div>
                ))
              ) : (
                <div className={styles.noProjects}>
                  Sem projetos desenvolvidos para esta categoria
                </div>
              )}
            </div>

            <button
              className={`${styles.scrollButton} ${styles.scrollButtonRight}`}
              onClick={() => scroll('right')}
            >
              <IoChevronForward />
            </button>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Projects;