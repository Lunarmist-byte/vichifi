import { motion } from 'framer-motion';
import { Heart, Github, Linkedin } from 'lucide-react';
import '../styles/index.css';

const Footer = () => {
  return (
    <motion.footer 
      className="footer-container glass-panel"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 1 }}
    >
      <div className="footer-content">
        <p className="credit-text">
          Made with <Heart size={16} className="heart-icon" /> by <span className="author-name">Lunarmist-byte</span>
        </p>
        <div className="social-links">
          <a 
            href="https://github.com/Lunarmist-byte" 
            target="_blank" 
            rel="noopener noreferrer"
            className="social-link interactive"
          >
            <Github size={20} />
          </a>
          <a 
            href="https://www.linkedin.com/in/amal-s-kumar-ba69a1290/" 
            target="_blank" 
            rel="noopener noreferrer"
            className="social-link interactive"
          >
            <Linkedin size={20} />
          </a>
        </div>
      </div>
    </motion.footer>
  );
};

export default Footer;
