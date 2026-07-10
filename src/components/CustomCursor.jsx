import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import '../styles/index.css';

const CustomCursor = () => {
  const [mousePosition, setMousePosition] = useState({
    x: 0,
    y: 0,
  });
  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    const mouseMove = (e) => {
      setMousePosition({
        x: e.clientX,
        y: e.clientY,
      });
    };

    const handleMouseOver = (e) => {
      const isInteractive = e.target.closest('a, button, input, textarea, .interactive, .polaroid-wrapper, .doodle-toolbar, .static-doodle');
      setIsHovering(!!isInteractive);
    };

    window.addEventListener('mousemove', mouseMove);
    window.addEventListener('mouseover', handleMouseOver);

    return () => {
      window.removeEventListener('mousemove', mouseMove);
      window.removeEventListener('mouseover', handleMouseOver);
    };
  }, []);

  const variants = {
    default: {
      x: mousePosition.x - 10,
      y: mousePosition.y - 10,
      backgroundColor: 'rgba(163, 194, 240, 0.4)',
      height: 20,
      width: 20,
      transition: {
        type: 'spring',
        mass: 0.1,
      },
    },
    hover: {
      x: mousePosition.x - 25,
      y: mousePosition.y - 25,
      backgroundColor: 'rgba(255, 255, 255, 0.2)',
      height: 50,
      width: 50,
      border: '2px solid rgba(255, 255, 255, 0.8)',
      transition: {
        type: 'spring',
        mass: 0.1,
      },
    },
  };

  return (
    <motion.div
      className="custom-cursor"
      variants={variants}
      animate={isHovering ? 'hover' : 'default'}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        borderRadius: '50%',
        pointerEvents: 'none',
        zIndex: 9999,
        backdropFilter: 'blur(2px)',
      }}
    />
  );
};

export default CustomCursor;
