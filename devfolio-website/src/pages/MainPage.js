import React, { useRef } from 'react';
import styles from './MainPage.module.css';

const MainPage = () => {
  const scrollContainerRef = useRef(null);

  const projectCards = [
    { id: 1, title: 'Project 1', description: 'Description 1' },
    { id: 2, title: 'Project 2', description: 'Description 2' },
    { id: 3, title: 'Project 3', description: 'Description 3' },
    { id: 4, title: 'Project 4', description: 'Description 4' },
    { id: 5, title: 'Project 5', description: 'Description 5' },
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

  return (
    <div className={styles.mainContainer}>
      <header className={styles.header}>
        <nav className={styles.navbar}>
          <div className={styles.logo}>CN DevFolio</div>
          <ul className={styles.navMenu}>
            <li className={styles.navItem}>
              <a href="#projects">Projetos</a>
            </li>
            <li className={styles.navItem}>
              <a href="#about">Sobre</a>
            </li>
          </ul>
        </nav>
      </header>

      <main className={styles.mainContent}>
        <section className={styles.cardsSection}>
          <div className={styles.sliderContainer}>
            <button 
              className={`${styles.scrollButton} ${styles.scrollButtonLeft}`}
              onClick={() => scroll('left')}
            >
              &#8592;
            </button>
            
            <div className={styles.cardsContainer} ref={scrollContainerRef}>
              {projectCards.map((card) => (
                <div key={card.id} className={styles.card}>
                  <h3>{card.title}</h3>
                  <p>{card.description}</p>
                </div>
              ))}
            </div>

            <button 
              className={`${styles.scrollButton} ${styles.scrollButtonRight}`}
              onClick={() => scroll('right')}
            >
              &#8594;
            </button>
          </div>
        </section>
      </main>

      <footer className={styles.footer}>
        <p>© 2024 Crisbelo Neto. Todos os direitos reservados.</p>
      </footer>
    </div>
  );
};

export default MainPage;