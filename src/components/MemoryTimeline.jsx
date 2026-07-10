import { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import MemoryCard from './MemoryCard';
import MemoryTV from './MemoryTV';
import '../styles/index.css';

const memoryData = Array.from({ length: 20 }).map((_, i) => {
  const isTV = i % 4 === 3;
  const videoUrls = [
    "https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyrides.mp4",
    "https://storage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4",
    "https://storage.googleapis.com/gtv-videos-bucket/sample/TearsOfSteel.mp4"
  ];
  
  return {
    id: i,
    type: isTV ? 'tv' : 'polaroid',
    title: `Memory ${i + 1}`,
    date: `${['January', 'February', 'March', 'April', 'May'][i % 5]} 202${3 + Math.floor(i / 10)}`,
    description: `A scattered memory fragment from our college journey. This one holds a piece of our shared chaos.`,
    imageUrl: isTV ? null : `https://picsum.photos/seed/${i + 100}/400/400`,
    videoUrl: isTV ? videoUrls[i % videoUrls.length] : null,
    xOffset: (Math.random() - 0.5) * 60,
    yOffset: i * 80 + (Math.random() * 40),
    rotation: (Math.random() - 0.5) * 40,
  };
});

const decorations = [
  { id: 'd1', type: 'note', text: "Don't forget the assignment!", x: -350, y: 50, rotate: -15 },
  { id: 'd2', type: 'tape', x: 250, y: 250, rotate: 45 },
  { id: 'd3', type: 'note', text: "We made it. ❤️", x: 280, y: 500, rotate: 10 },
  { id: 'd4', type: 'note', text: "Call mom", x: -300, y: 900, rotate: -5 },
  { id: 'd5', type: 'tape', x: -150, y: 1200, rotate: -30 },
  { id: 'd6', type: 'tape', x: 200, y: 1400, rotate: 10 },
  { id: 'd7', type: 'note', text: "Almost done...", x: 250, y: 1700, rotate: 5 },
  { id: 'd8', type: 'note', text: "What time is the test?", x: -250, y: 1900, rotate: -15 },
  { id: 'd9', type: 'tape', x: 300, y: 2100, rotate: 60 },
  { id: 'd10', type: 'note', text: "Graduation!", x: 0, y: 2400, rotate: 0 },
];

const MemoryTimeline = () => {
  const [unlockedNodes, setUnlockedNodes] = useState([0]);
  const containerRef = useRef(null);

  const handleUnlockNext = (id) => {
    if (!unlockedNodes.includes(id + 1) && id < memoryData.length - 1) {
      setUnlockedNodes(prev => [...prev, id + 1]);
    }
  };

  return (
    <section id="timeline" className="timeline-container" ref={containerRef}>
      <div className="desk-surface">
        
        {decorations.map(dec => (
          <motion.div
            key={dec.id}
            className={`decoration ${dec.type}`}
            initial={{ opacity: 0, x: dec.x, y: dec.y, rotate: dec.rotate }}
            animate={{ opacity: 1, x: dec.x, y: dec.y, rotate: dec.rotate }}
            transition={{ delay: 0.5 + (Math.random() * 0.5) }}
            drag
            dragConstraints={containerRef}
            whileHover={{ scale: 1.1, cursor: 'grab' }}
            whileDrag={{ scale: 1.2, cursor: 'grabbing', zIndex: 100 }}
          >
            {dec.type === 'note' && <div className="sticky-note">{dec.text}</div>}
            {dec.type === 'tape' && <div className="washi-tape"></div>}
          </motion.div>
        ))}

        {memoryData.map((memory, index) => {
          const isUnlocked = unlockedNodes.includes(memory.id);
          return (
            <MemoryNode 
              key={memory.id}
              memory={memory}
              index={index}
              isUnlocked={isUnlocked}
              onUnlock={() => handleUnlockNext(memory.id)}
              isLast={index === memoryData.length - 1}
              containerRef={containerRef}
            />
          );
        })}
      </div>
    </section>
  );
};

const MemoryNode = ({ memory, index, isUnlocked, onUnlock, isLast, containerRef }) => {
  const randomRotate = useRef((Math.random() - 0.5) * 60).current;
  const side = index % 2 === 0 ? -1 : 1;
  const randomX = useRef(side * (20 + Math.random() * 150)).current; 
  const initialY = 80 * index; 
  
  if (!isUnlocked) return null;

  return (
    <motion.div 
      className="polaroid-wrapper"
      initial={{ opacity: 0, scale: 0.5, y: initialY + 150, rotate: randomRotate - 20 }}
      animate={{ opacity: 1, scale: 1, y: initialY, rotate: randomRotate, x: randomX }}
      transition={{ type: "spring", bounce: 0.4, duration: 1.2 }}
      drag
      dragConstraints={containerRef}
      whileDrag={{ scale: 1.08, rotate: 0, zIndex: 50, cursor: 'grabbing' }}
      whileHover={{ scale: 1.02, zIndex: 40 }}
      onDragEnd={(e, info) => {
        if (Math.abs(info.offset.x) > 20 || Math.abs(info.offset.y) > 20) {
          onUnlock();
        }
      }}
      onClick={() => onUnlock()}
    >
      {memory.type === 'tv' ? (
        <MemoryTV memory={memory} />
      ) : (
        <MemoryCard memory={memory} isLast={isLast} />
      )}
      {index % 4 === 0 && memory.type !== 'tv' && <div className="polaroid-tape"></div>}
    </motion.div>
  );
};

export default MemoryTimeline;
