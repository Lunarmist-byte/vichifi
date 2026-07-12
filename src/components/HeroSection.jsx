import { useState, useEffect } from 'react';
import { motion, useAnimation } from 'framer-motion';
import { ChevronDown, Send, Sparkles } from 'lucide-react';
import '../styles/index.css';

const HeroSection = () => {
  const title = "വിവേകം ചൈത്രം ഫിദയം".split(" ");
  const planeControls = useAnimation();
  const [isDraggable, setIsDraggable] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsDraggable(true);
    }, 1000); // 1 second buffer
    return () => clearTimeout(timer);
  }, []);

  const handlePlaneClick = () => {
    planeControls.start({
      x: window.innerWidth + 100,
      y: -500,
      rotate: 45,
      scale: 0.5,
      transition: { duration: 1.5, ease: "easeIn" }
    });
  };

  return (
    <section className="hero-container">
      <motion.div
        className="interactive-floater interactive"
        style={{ top: '20%', left: '15%' }}
        animate={planeControls}
        initial={{ y: 0 }}
        whileHover={{ scale: 1.2, rotate: -10 }}
        onClick={handlePlaneClick}
      >
        <Send size={48} color="#8fa6cb" />
      </motion.div>

      <motion.div
        className="interactive-floater interactive"
        style={{ top: '30%', right: '20%' }}
        animate={{ rotate: 360 }}
        transition={{ repeat: Infinity, duration: 10, ease: "linear" }}
        whileHover={{ scale: 1.5, color: "#ffeb3b" }}
        whileTap={{ scale: 0.8 }}
      >
        <Sparkles size={56} color="#e2d1f9" />
      </motion.div>

      <motion.div
        className="hero-content"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.5, ease: "easeOut" }}
      >
        <h1 className="hero-title">
          {title.map((word, i) => {
            const segmenter = new Intl.Segmenter('ml', { granularity: 'grapheme' });
            const letters = Array.from(segmenter.segment(word)).map(s => s.segment);

            return (
              <span key={i} className="title-word">
                {letters.map((char, j) => (
                  <motion.span 
                    key={j} 
                    className="title-letter"
                    drag={isDraggable}
                    dragMomentum={true}
                    whileDrag={isDraggable ? { cursor: 'grabbing', scale: 1.2, zIndex: 100 } : {}}
                    whileHover={isDraggable ? { cursor: 'grab' } : {}}
                    style={{ 
                      display: 'inline-block', 
                      userSelect: 'none',
                      transition: isDraggable ? 'none' : undefined 
                    }}
                  >
                    {char}
                  </motion.span>
                ))}
              </span>
            );
          })}
        </h1>
        <motion.p
          className="hero-subtitle"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.5, delay: 0.5 }}
          drag={isDraggable}
          dragMomentum={true}
          whileDrag={isDraggable ? { cursor: 'grabbing', scale: 1.1, zIndex: 100 } : {}}
          whileHover={isDraggable ? { cursor: 'grab' } : {}}
          style={{ userSelect: 'none' }}
        >
          മൺമറഞ്ഞ കലാപ്രതിഭകൾ
        </motion.p>
      </motion.div>

      <motion.div
        className="scroll-indicator interactive"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 1 }}
        onClick={() => {
          document.getElementById('timeline').scrollIntoView({ behavior: 'smooth' });
        }}
      >
        <motion.p
          animate={{ y: [0, 5, 0] }}
          transition={{ repeat: Infinity, duration: 2 }}
        >
          Explore the Desk
        </motion.p>
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 2 }}
        >
          <ChevronDown size={32} strokeWidth={1} color="var(--accent-color)" />
        </motion.div>
      </motion.div>
    </section>
  );
};

export default HeroSection;
