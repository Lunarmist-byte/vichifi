import { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import MemoryCard from './MemoryCard';
import MemoryTV from './MemoryTV';
import '../styles/index.css';

const memoryData = [
  { id: 0, type: 'polaroid', title: "Memory 1", date: "August 2022", description: "Placeholder description.", imageUrl: "https://images.unsplash.com/photo-1517486808906-6ca8b3f04846?q=80&w=800", videoUrl: null },
  { id: 1, type: 'polaroid', title: "Memory 2", date: "September 2022", description: "Placeholder description.", imageUrl: "https://images.unsplash.com/photo-1517842645767-c639042777db?q=80&w=800", videoUrl: null },
  { id: 2, type: 'tv', title: "Video Memory 1", date: "October 2022", description: "Placeholder description.", imageUrl: null, videoUrl: "https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyrides.mp4" },
  { id: 3, type: 'polaroid', title: "Memory 3", date: "November 2022", description: "Placeholder description.", imageUrl: "https://images.unsplash.com/photo-1523240795612-9a054b0db644?q=80&w=800", videoUrl: null },
  { id: 4, type: 'polaroid', title: "Memory 4", date: "December 2022", description: "Placeholder description.", imageUrl: "https://images.unsplash.com/photo-1517486808906-6ca8b3f04846?q=80&w=800", videoUrl: null },
  { id: 5, type: 'polaroid', title: "Memory 5", date: "January 2023", description: "Placeholder description.", imageUrl: "https://images.unsplash.com/photo-1517842645767-c639042777db?q=80&w=800", videoUrl: null },
  { id: 6, type: 'tv', title: "Video Memory 2", date: "February 2023", description: "Placeholder description.", imageUrl: null, videoUrl: "https://storage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4" },
  { id: 7, type: 'polaroid', title: "Memory 6", date: "March 2023", description: "Placeholder description.", imageUrl: "https://images.unsplash.com/photo-1523240795612-9a054b0db644?q=80&w=800", videoUrl: null },
  { id: 8, type: 'polaroid', title: "Memory 7", date: "April 2023", description: "Placeholder description.", imageUrl: "https://images.unsplash.com/photo-1517486808906-6ca8b3f04846?q=80&w=800", videoUrl: null },
  { id: 9, type: 'polaroid', title: "Memory 8", date: "May 2023", description: "Placeholder description.", imageUrl: "https://images.unsplash.com/photo-1517842645767-c639042777db?q=80&w=800", videoUrl: null },
  { id: 10, type: 'tv', title: "Video Memory 3", date: "June 2023", description: "Placeholder description.", imageUrl: null, videoUrl: "https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyrides.mp4" },
  { id: 11, type: 'polaroid', title: "Memory 9", date: "August 2023", description: "Placeholder description.", imageUrl: "https://images.unsplash.com/photo-1523240795612-9a054b0db644?q=80&w=800", videoUrl: null },
  { id: 12, type: 'polaroid', title: "Memory 10", date: "September 2023", description: "Placeholder description.", imageUrl: "https://images.unsplash.com/photo-1517486808906-6ca8b3f04846?q=80&w=800", videoUrl: null },
  { id: 13, type: 'polaroid', title: "Memory 11", date: "October 2023", description: "Placeholder description.", imageUrl: "https://images.unsplash.com/photo-1517842645767-c639042777db?q=80&w=800", videoUrl: null },
  { id: 14, type: 'tv', title: "Video Memory 4", date: "November 2023", description: "Placeholder description.", imageUrl: null, videoUrl: "https://storage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4" },
  { id: 15, type: 'polaroid', title: "Memory 12", date: "December 2023", description: "Placeholder description.", imageUrl: "https://images.unsplash.com/photo-1523240795612-9a054b0db644?q=80&w=800", videoUrl: null },
  { id: 16, type: 'polaroid', title: "Memory 13", date: "January 2024", description: "Placeholder description.", imageUrl: "https://images.unsplash.com/photo-1517486808906-6ca8b3f04846?q=80&w=800", videoUrl: null },
  { id: 17, type: 'polaroid', title: "Memory 14", date: "February 2024", description: "Placeholder description.", imageUrl: "https://images.unsplash.com/photo-1517842645767-c639042777db?q=80&w=800", videoUrl: null },
  { id: 18, type: 'tv', title: "Video Memory 5", date: "March 2024", description: "Placeholder description.", imageUrl: null, videoUrl: "https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyrides.mp4" },
  { id: 19, type: 'polaroid', title: "Memory 15", date: "May 2026", description: "Placeholder description.", imageUrl: "https://images.unsplash.com/photo-1523240795612-9a054b0db644?q=80&w=800", videoUrl: null }
];

const decorations = [
  { id: 'd1', type: 'note', text: "Pazhampoori fans cemp", x: -350, y: -200, rotate: -15 },
  { id: 'd2', type: 'tape', x: 250, y: -150, rotate: 45 },
  { id: 'd3', type: 'note', text: "Alcoholic Chai", x: 280, y: 100, rotate: 10 },
  { id: 'd4', type: 'note', text: "Bulb polle olle chiri nammade vivekji ke <3", x: -300, y: 150, rotate: -5 },
  { id: 'd5', type: 'tape', x: -150, y: 250, rotate: -30 },
  { id: 'd6', type: 'tape', x: 200, y: 200, rotate: 10 },
  { id: 'd7', type: 'note', text: "Njan ndhe cute aa ~chai", x: 250, y: 280, rotate: 5 },
  { id: 'd8', type: 'note', text: "Top 300 makers ille 2 kunj", x: -250, y: -100, rotate: -15 },
  { id: 'd9', type: 'tape', x: 300, y: -50, rotate: 60 },
  { id: 'd10', type: 'note', text: "Cemp inte sharukhan!", x: 0, y: 300, rotate: 0 },
  { id: 'd11', type: 'note', text: "Adipoli vibes only", x: 150, y: -250, rotate: 12 },
  { id: 'd12', type: 'note', text: "Tinkerhub core team poli", x: -150, y: -300, rotate: -8 },
  { id: 'd13', type: 'note', text: "Samosa also needed", x: -400, y: 50, rotate: 22 },
  { id: 'd14', type: 'note', text: "Coding nights...", x: 350, y: 150, rotate: -18 },
];

const DecorationItem = ({ dec }) => {
  const [isStuck, setIsStuck] = useState(false);
  const timerRef = useRef(null);

  const startPress = () => {
    if (timerRef.current) clearTimeout(timerRef.current);
    timerRef.current = setTimeout(() => {
      setIsStuck(prev => !prev);
      timerRef.current = null;
    }, 400);
  };

  const endPress = () => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
      timerRef.current = null;
    }
  };

  return (
    <motion.div
      className={`decoration ${dec.type}`}
      initial={{ opacity: 0, x: dec.x, y: dec.y, rotate: dec.rotate }}
      animate={{ opacity: 1, x: dec.x, y: dec.y, rotate: dec.rotate }}
      transition={{ delay: 0.5 + (Math.random() * 0.5) }}
      drag
      dragListener={!isStuck}
      whileHover={!isStuck ? { scale: 1.1, cursor: 'grab' } : {}}
      whileDrag={!isStuck ? { scale: 1.2, cursor: 'grabbing', zIndex: 100 } : {}}
      onPointerDown={startPress}
      onPointerUp={endPress}
      onPointerLeave={endPress}
    >
      {dec.type === 'note' && (
        <div className="sticky-note" style={{ position: 'relative' }}>
          {isStuck && (
            <div 
              className="washi-tape" 
              style={{ 
                position: 'absolute', 
                top: -15, 
                left: '50%', 
                marginLeft: '-40px', 
                width: 80, 
                height: 25, 
                zIndex: 20 
              }} 
            />
          )}
          {dec.text}
        </div>
      )}
      {dec.type === 'tape' && <div className="washi-tape"></div>}
    </motion.div>
  );
};

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
          <DecorationItem key={dec.id} dec={dec} />
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
  const randomX = useRef((Math.random() - 0.5) * 600).current;
  const randomY = useRef((Math.random() - 0.5) * 500).current;

  if (!isUnlocked) return null;

  return (
    <motion.div
      className="polaroid-wrapper"
      style={{ top: '50%', left: '50%', marginLeft: '-160px', marginTop: '-160px' }}
      initial={{ opacity: 0, scale: 0.5, y: randomY + 150, x: randomX, rotate: randomRotate - 20 }}
      animate={{ opacity: 1, scale: 1, y: randomY, rotate: randomRotate, x: randomX }}
      transition={{ type: "spring", bounce: 0.4, duration: 1.2 }}
      drag
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
