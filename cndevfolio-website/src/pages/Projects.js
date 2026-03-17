import React, { useRef, useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { FaGithub } from 'react-icons/fa';
import { TbWorldWww } from 'react-icons/tb';
import { IoChevronBack, IoChevronForward } from 'react-icons/io5';

import styles from './Projects.module.css';
import Header from '../components/header/Header';
import Footer from '../components/footer/Footer';

const Projects = () => {
  const { t } = useTranslation();
  const scrollContainerRef = useRef(null);
  const [activeFilter, setActiveFilter] = useState(t('projects.filters.all'));

  const filters = useMemo(() => [
    t('projects.filters.all'),
    t('projects.filters.webApp'),
    // t('projects.filters.website'),
    t('projects.filters.landingPage'),
    // t('projects.filters.mobile'),
    // t('projects.filters.desktop'),
    t('projects.filters.restapi'),
    t('projects.filters.game2D')
  ], [t]);

  const projectCards = useMemo(() => [
    {
      id: 1,
      title: t('projects.projectData.kyonda.title'),
      owner: 'CoisaDigital',
      ownerWebsiteLink: 'https://coisadigital.ao/',
      details: t('projects.projectData.kyonda.details', { returnObjects: true }),
      type: t('projects.filters.webApp'),
      image: '/images/projects-images/kyonda-logo.png',
      websiteLink: 'https://kyonda.com/'
    },
    /*
    {
      id: 2,
      title: t('projects.projectData.chatzinho.title'),
      details: t('projects.projectData.chatzinho.details'),
      type: t('projects.filters.webApp'),
      image: '/images/projects-images/chatzinho-logo.png',
      websiteLink: 'https://chatzinhoweb.vercel.app/',
      //githubRepoLink: 'https://github.com/crisbeloneto/chatzinho'
    },
    {
      id: 3,
      title: t('projects.projectData.onlyfans.title'),
      details: t('projects.projectData.onlyfans.details'),
      type: t('projects.filters.landingPage'),
      image: '/images/projects-images/onlyfans-logo.png',
      websiteLink: 'https://onlyfanslp.vercel.app/',
      githubRepoLink: 'https://github.com/netocrs/onlyfans-lp'
    },
    */
    {
      id: 4,
      title: "Soluções Auto - Landing Page",
      details: t('projects.projectData.solucoesAuto.details'),
      type: t('projects.filters.landingPage'),
      image: '/images/projects-images/solucoes-auto-logo.jpeg',
      websiteLink: 'https://solauto-landing-page.vercel.app/',
      githubRepoLink: 'https://github.com/netocrs/solucoesauto-landing-page'
    },
    {
      id: 5,
      title: t('projects.projectData.libraryApi.title'),
      details: t('projects.projectData.libraryApi.details'),
      type: t('projects.filters.restapi'),
      image: '/images/projects-images/rest-api.png',
      githubRepoLink: 'https://github.com/crisbeloneto/library-api'
    },
    {
      id: 6,
      title: "Klondike Solitaire",
      details: t('projects.projectData.klondike.details'),
      type: t('projects.filters.game2D'),
      image: '/images/projects-images/klondike-game-image.png',
      githubRepoLink: 'https://github.com/netocrs/Klondike'
    },
    {
      id: 7,
      title: t('projects.projectData.snakeGame.title'),
      details: t('projects.projectData.snakeGame.details'),
      type: t('projects.filters.game2D'),
      image: '/images/projects-images/snake-game-image.png',
      githubRepoLink: 'https://github.com/netocrs/SnakeGame'
    }
  ], [t]);

  // Update activeFilter when language changes
  React.useEffect(() => {
    if (activeFilter === filters[0] ||
      activeFilter === 'Tudo' ||
      activeFilter === 'All' ||
      activeFilter === 'Todo' ||
      activeFilter === 'Tout') {
      setActiveFilter(t('projects.filters.all'));
    }
  }, [t, activeFilter, filters]);

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
    if (activeFilter === t('projects.filters.all')) return projectCards;
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
                            {t('projects.owner')} &nbsp;
                            <Link to={card.ownerWebsiteLink} target="_blank" rel="noopener noreferrer" title={t('projects.visitSite')}>
                              <span>{card.owner}</span>
                            </Link>
                          </p>
                        )}
                        <div className={styles.projectLinks}>
                          {card.websiteLink && (
                            <Link className={styles.projectSitesLink} to={card.websiteLink} target="_blank" rel="noopener noreferrer">
                              <TbWorldWww title={t('projects.visitSite')} />
                            </Link>
                          )}
                          {card.githubRepoLink && (
                            <Link className={styles.projectSitesLink} to={card.githubRepoLink} target="_blank" rel="noopener noreferrer">
                              <FaGithub title={t('projects.viewRepository')} />
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
                  {t('projects.noProjects')}
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