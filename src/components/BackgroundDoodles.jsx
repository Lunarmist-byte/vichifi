import { motion, useMotionValue, useTransform, useSpring } from 'framer-motion';
import { useEffect, useState, useMemo } from 'react';
import '../styles/index.css';

const doodles = [
  { type: 'spiral', path: "M 10 10 C 20 0, 40 20, 30 30 C 20 40, 0 20, 10 10 C 15 5, 25 15, 20 20", viewBox: "0 0 40 40" },
  { type: 'star', path: "M 20 0 L 25 15 L 40 15 L 28 25 L 32 40 L 20 30 L 8 40 L 12 25 L 0 15 L 15 15 Z", viewBox: "0 0 40 40" },
  { type: 'face', path: "M 20 0 C 9 0 0 9 0 20 C 0 31 9 40 20 40 C 31 40 40 31 40 20 C 40 9 31 0 20 0 Z M 12 15 A 3 3 0 1 1 12 15.01 Z M 28 15 A 3 3 0 1 1 28 15.01 Z M 12 30 Q 20 25 28 30", viewBox: "0 0 40 40" },
  { type: 'zigzag', path: "M 0 20 L 10 0 L 20 40 L 30 0 L 40 20", viewBox: "0 0 40 40" },
  { type: 'cloud', path: "M 10 20 C 5 20 0 15 0 10 C 0 5 5 0 10 0 C 12 0 14 1 15 2 C 18 -2 25 -2 28 3 C 32 1 37 3 39 8 C 41 12 39 18 35 20 Z", viewBox: "0 0 40 25" },
  { type: 'flower', path: "M 20 15 C 25 5 35 15 25 20 C 35 25 25 35 20 25 C 15 35 5 25 15 20 C 5 15 15 5 20 15 Z M 20 20 m -2 0 a 2 2 0 1 0 4 0 a 2 2 0 1 0 -4 0", viewBox: "0 0 40 40" },
  { type: 'scribble', path: "M 5 5 Q 35 10 10 20 T 35 30 T 5 40", viewBox: "0 0 40 45" }
];

const generateDoodles = (count) => {
  return Array.from({ length: count }).map((_, i) => ({
    id: i,
    doodle: doodles[Math.floor(Math.random() * doodles.length)],
    x: Math.random() * 95,
    y: Math.random() * 600,
    size: Math.random() * 50 + 40,
    rotation: Math.random() * 360,
    color: ['#000000', '#FF3366', '#00C896', '#FF9900', '#3366FF'][Math.floor(Math.random() * 5)],
    parallaxFactor: Math.random() * 0.5 + 0.1
  }));
};

const DoodleItem = ({ item, mouseX, mouseY }) => {
  const moveX = useTransform(mouseX, [0, window.innerWidth], [-50 * item.parallaxFactor, 50 * item.parallaxFactor]);
  const moveY = useTransform(mouseY, [0, window.innerHeight], [-50 * item.parallaxFactor, 50 * item.parallaxFactor]);

  return (
    <motion.div
      className="static-doodle interactive"
      style={{
        left: `${item.x}vw`,
        top: `${item.y}vh`,
        x: moveX,
        y: moveY,
        transformStyle: "preserve-3d"
      }}
      whileHover={{ scale: 1.3, rotate: item.rotation + (Math.random() > 0.5 ? 45 : -45) }}
      drag
      dragMomentum={true}
      whileDrag={{ scale: 1.5, cursor: 'grabbing', opacity: 1, zIndex: 100 }}
    >
      <svg
        width={item.size}
        height={item.size}
        viewBox={item.doodle.viewBox}
        fill="none"
        stroke={item.color}
        strokeWidth="4"
        strokeLinecap="round"
        strokeLinejoin="round"
        style={{ transform: `rotate(${item.rotation}deg)` }}
      >
        <path d={item.doodle.path} />
      </svg>
    </motion.div>
  );
};

const BackgroundDoodles = () => {
  const items = useMemo(() => generateDoodles(100), []); 

  const mouseX = useMotionValue(typeof window !== 'undefined' ? window.innerWidth / 2 : 0);
  const mouseY = useMotionValue(typeof window !== 'undefined' ? window.innerHeight / 2 : 0);
  
  const springConfig = { damping: 25, stiffness: 100 };
  const smoothMouseX = useSpring(mouseX, springConfig);
  const smoothMouseY = useSpring(mouseY, springConfig);

  useEffect(() => {
    const handleMouseMove = (e) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [mouseX, mouseY]);

  return (
    <div className="background-doodles-layer">
      <div className="chaotic-text" style={{ top: '10%', left: '5%', transform: 'rotate(-15deg)' }}>Chaya Kudikan Povaam?</div>
      <div className="chaotic-text" style={{ top: '30%', right: '10%', transform: 'rotate(25deg)' }}>Pazhampori</div>
      <div className="chaotic-text" style={{ top: '50%', left: '20%', transform: 'rotate(-5deg)' }}>*Tinkerhub inte achanum ammayum*</div>
      <div className="chaotic-text" style={{ top: '70%', right: '5%', transform: 'rotate(10deg)' }}>Wagnor and Ntorq</div>
      <div className="chaotic-text" style={{ top: '90%', left: '15%', transform: 'rotate(-20deg)' }}>Chai = paava</div>

      {items.map((item) => (
        <DoodleItem key={item.id} item={item} mouseX={smoothMouseX} mouseY={smoothMouseY} />
      ))}
    </div>
  );
};

export default BackgroundDoodles;
