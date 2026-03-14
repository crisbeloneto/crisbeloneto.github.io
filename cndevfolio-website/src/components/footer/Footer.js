import React, { useState, useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { FiLinkedin, FiGithub, FiMail } from 'react-icons/fi';
import styles from './Footer.module.css';

const Footer = () => {
    const { t } = useTranslation();
    const [showGithubModal, setShowGithubModal] = useState(false);
    const modalRef = useRef(null);

    // Close modal on outside click
    useEffect(() => {
        const handleClickOutside = (e) => {
            if (modalRef.current && !modalRef.current.contains(e.target)) {
                setShowGithubModal(false);
            }
        };
        if (showGithubModal) {
            document.addEventListener('mousedown', handleClickOutside);
        }
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, [showGithubModal]);

    // Close modal on Escape key
    useEffect(() => {
        const handleKeyDown = (e) => {
            if (e.key === 'Escape') setShowGithubModal(false);
        };
        document.addEventListener('keydown', handleKeyDown);
        return () => document.removeEventListener('keydown', handleKeyDown);
    }, []);

    return (
        <footer className={styles.footer}>
            <p className={styles.paragraph}>
                {t('footer.paragraph', { currentYear: new Date().getFullYear() })}
            </p>

            <div className={styles.socials}>

                {/* GitHub — triggers modal */}
                <div className={styles.githubWrapper} ref={modalRef}>
                    <button
                        className={styles.iconLink}
                        onClick={() => setShowGithubModal((prev) => !prev)}
                        aria-label="GitHub"
                        aria-expanded={showGithubModal}
                    >
                        <FiGithub />
                    </button>

                    {showGithubModal && (
                        <div className={styles.modal} role="dialog" aria-label="GitHub profiles">
                            <a
                                href="https://github.com/crisbeloneto"
                                target="_blank"
                                rel="noopener noreferrer"
                                className={styles.modalLink}
                                onClick={() => setShowGithubModal(false)}
                            >
                                <FiGithub className={styles.modalIcon} />
                                @crisbeloneto
                            </a>
                            <a
                                href="https://github.com/netocrs"
                                target="_blank"
                                rel="noopener noreferrer"
                                className={styles.modalLink}
                                onClick={() => setShowGithubModal(false)}
                            >
                                <FiGithub className={styles.modalIcon} />
                                @netocrs
                            </a>
                        </div>
                    )}
                </div>

                {/* Email */}
                <a
                    href="mailto:crisbelobarneyneto@gmail.com"
                    className={styles.iconLink}
                    aria-label="Email"
                >
                    <FiMail />
                </a>

                {/* LinkedIn */}
                <a
                    href="https://www.linkedin.com/in/crisbeloneto/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className={styles.iconLink}
                    aria-label="LinkedIn"
                >
                    <FiLinkedin />
                </a>
            </div>
        </footer>
    );
};

export default Footer;