import { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import MemoryCard from './MemoryCard';
import MemoryTV from './MemoryTV';
import '../styles/index.css';

const memoryData = [
  { id: 0, type: 'polaroid', title: "Chai inte pose", date: "26 August 2025", description: "Ravile kulichatt erangiya mathiyarunn🫠", imageUrl: "/assets/polaroids/memory2.jpg", videoUrl: null },
  { id: 1, type: 'polaroid', title: "Kollarudhe", date: "26 August 2025", description: "Chirikkanum vayya chirikkkathirikkanum vayya 😶", imageUrl: "/assets/polaroids/memory1.jpg", videoUrl: null },
  { id: 2, type: 'tv', title: "Ayeee Pattiche...", date: "26 August 2025", description: "", imageUrl: null, videoUrl: "/assets/videos/video2.mp4" },
  { id: 3, type: 'polaroid', title: "Bomb Velayudhan", date: "26 August 2025", description: "Ayyoo Ente Bomb!!!", imageUrl: "/assets/polaroids/memory3.jpg", videoUrl: null },
  { id: 4, type: 'polaroid', title: "Onam matrimony.com", date: "26 August 2025", description: "Ente ee style aleeee....style inne othe figure alee...", imageUrl: "/assets/polaroids/memory4.jpg", videoUrl: null },
  { id: 5, type: 'polaroid', title: "Ambiyum Anyanum", date: "16 September 2025", description: "Vidamateeee!!!!", imageUrl: "/assets/polaroids/memory5.jpg", videoUrl: null },
  { id: 6, type: 'tv', title: "Swalpam Aesthetics agum", date: "24 September 2025", description: "", imageUrl: null, videoUrl: "/assets/videos/video6.mp4" },
  { id: 7, type: 'polaroid', title: "Chai in the wild", date: "18 September 2025", description: "Enneyo, innoo, thingalazcheyo,velliyaazhcha aavatte!!", imageUrl: "/assets/polaroids/memory7.jpg", videoUrl: null },
  { id: 8, type: 'polaroid', title: "Tinker-Bazaar", date: "6 October 2025", description: "kadann varu kandann varu Onn eduthal 2 ennom free", imageUrl: "/assets/polaroids/memory8.jpg", videoUrl: null },
  { id: 9, type: 'polaroid', title: "Major Sreekumar", date: "15 October 2025", description: "Chumma irikk pillere enikk naanam varunnu", imageUrl: "/assets/polaroids/memory9.jpg", videoUrl: null },
  { id: 10, type: 'tv', title: "Cheriyoru abadham naatikkaruth", date: "26 September 2025", description: "", imageUrl: null, videoUrl: "/assets/videos/video10.mp4" },
  { id: 11, type: 'polaroid', title: "Bombkutti", date: "24 October 2025", description: "Ith marich vitt bomb ondakkam namk", imageUrl: "/assets/polaroids/memory11.jpg", videoUrl: null },
  { id: 12, type: 'polaroid', title: "Bacaradi x Tinkeradi", date: "24 October 2025", description: "Sneham ollavara Scotch okke eduth thannu", imageUrl: "/assets/polaroids/memory12.jpg", videoUrl: null },
  { id: 13, type: 'polaroid', title: "Ellam sheriagum alle??? ;(", date: "20 December 2025", description: "Krishnendu inne tharam pakshe enikk ethra kittum", imageUrl: "/assets/polaroids/memory13.jpg", videoUrl: null },
  { id: 14, type: 'tv', title: "Future Chai", date: "20 December 2025", description: "", imageUrl: null, videoUrl: "/assets/videos/video14.mp4" },
  { id: 15, type: 'polaroid', title: "Kani...Kani.....Vishu.....Kani..", date: "20 December 2025", description: "Onnu, randu, moonu, naalu, anchu... Ayye! Ente anchu varsham poyi!", imageUrl: "/assets/polaroids/memory15.jpg", videoUrl: null },
  { id: 16, type: 'polaroid', title: "Mmmmmmmmmmm........", date: "7 April 2026", description: "Ee kaatu inne ndhoru sugandhammmm....", imageUrl: "/assets/polaroids/memory16.jpg", videoUrl: null },
  { id: 17, type: 'polaroid', title: "Theernite venam oru kuzhi vettan", date: "7 June 2026", description: "Neelakuyil thendide karyam", imageUrl: "/assets/polaroids/memory17.jpg", videoUrl: null },
  { id: 18, type: 'tv', title: "Naadhante mass entry", date: "11 June 2026", description: "Pavanayi shavamayi.", imageUrl: null, videoUrl: "/assets/videos/video18.mp4" },
  { id: 19, type: 'polaroid', title: "Kanninayil Kaamanottam", date: "1 April 2026", description: "Tinkerhub inne veezhthiye nottam", imageUrl: "/assets/polaroids/memory19.jpg", videoUrl: null },
  { id: 20, type: 'tv', title: "Thommasooty vitodaaaa", date: "11 June 2026", description: "Prema, pathiye poda! Enik ee deshathe vazhi ariyillannu!", imageUrl: null, videoUrl: "/assets/videos/video20.mp4" },
];

const decorations = [
  { id: 'd1', type: 'note', text: "Pazhampori fans cemp", x: -350, y: -50, rotate: -15 },
  { id: 'd2', type: 'tape', x: 250, y: 150, rotate: 45 },
  { id: 'd3', type: 'note', text: "Theeeepori Chaiiii", x: 300, y: 350, rotate: 10 },
  { id: 'd4', type: 'note', text: "Bulb polle olle chiri nammade vivekji ke <3", x: -300, y: 600, rotate: -5 },
  { id: 'd5', type: 'tape', x: -150, y: 850, rotate: -30 },
  { id: 'd6', type: 'tape', x: 200, y: 1200, rotate: 10 },
  { id: 'd7', type: 'note', text: "Njan ndhe cute aa ~chai", x: 280, y: 1600, rotate: 5 },
  { id: 'd8', type: 'note', text: "Top 300 makers ille 2 kunj", x: -250, y: 2000, rotate: -15 },
  { id: 'd9', type: 'tape', x: 300, y: 2400, rotate: 60 },
  { id: 'd10', type: 'note', text: "Cemp inte sharukhan!", x: 0, y: 2800, rotate: 0 },
  { id: 'd11', type: 'note', text: "Whiskey thanne Tinkerhub", x: 150, y: 3300, rotate: 12 },
  { id: 'd12', type: 'note', text: "CAD lab key and chai both will be missed", x: -250, y: 3800, rotate: -8 },
  { id: 'd13', type: 'note', text: "Zumba simham", x: -350, y: 4400, rotate: 22 },
  { id: 'd14', type: 'note', text: "Penne inte puragey poyi adi mediche chathu", x: 350, y: 4900, rotate: -18 },
  { id: 'd15', type: 'note', text: "Barbie and Cinderella of Cemp", x: -150, y: 5400, rotate: -18 },
];

const DecorationItem = ({ dec, index }) => {
  const [isStuck, setIsStuck] = useState(false);
  const [isOrganized, setIsOrganized] = useState(true);
  const timerRef = useRef(null);

  useEffect(() => {
    const timer = setTimeout(() => setIsOrganized(false), 13000);
    return () => clearTimeout(timer);
  }, []);

  const cols = 5;
  const neatX = (index % cols) * 160 - (cols * 160) / 2 + 80;
  const neatY = Math.floor(index / cols) * 160 - 200;

  const currentX = isOrganized ? neatX : dec.x;
  const currentY = isOrganized ? neatY : dec.y;
  const currentRotate = isOrganized ? 0 : dec.rotate;

  const startPress = () => {
    if (isOrganized) return;
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

  const canDrag = !isStuck && !isOrganized;

  return (
    <motion.div
      className={`decoration ${dec.type}`}
      initial={{ opacity: 0, x: neatX, y: neatY, rotate: 0 }}
      animate={{ opacity: 1, x: currentX, y: currentY, rotate: currentRotate }}
      transition={{
        delay: isOrganized ? 0.5 + (index * 0.1) : 0,
        duration: isOrganized ? 0.5 : 1,
        type: isOrganized ? "tween" : "spring",
        bounce: 0.4
      }}
      drag
      dragTransition={{ power: 0.1, timeConstant: 150 }}
      dragListener={canDrag}
      whileHover={canDrag ? { scale: 1.1, cursor: 'grab' } : {}}
      whileDrag={canDrag ? { scale: 1.2, cursor: 'grabbing', zIndex: 100 } : {}}
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
      <div style={{ display: 'none' }}>
        {memoryData.filter(m => m.type === 'tv').map(m => (
          <video key={`preload-${m.id}`} src={m.videoUrl} preload="auto" muted playsInline />
        ))}
      </div>
      <div className="desk-surface">

        {decorations.map((dec, index) => (
          <DecorationItem key={dec.id} dec={dec} index={index} />
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
  const randomRotate = useRef((Math.random() - 0.5) * 40).current;

  const basePathY = index * 260 + 200;

  const isLeft = index % 2 === 0;
  const sideOffset = isLeft ? -150 : 150;
  const randomXOffset = useRef((Math.random() - 0.5) * 150).current;
  const randomYOffset = useRef((Math.random() - 0.5) * 80).current;

  const targetX = sideOffset + randomXOffset;
  const targetY = basePathY + randomYOffset;

  if (!isUnlocked) return null;

  return (
    <motion.div
      className="polaroid-wrapper"
      style={{ top: 0, left: '50%', marginLeft: '-160px', marginTop: '0' }}
      initial={{ opacity: 0, scale: 0.5, y: targetY + 100, x: targetX, rotate: randomRotate - 20 }}
      animate={{ opacity: 1, scale: 1, y: targetY, rotate: randomRotate, x: targetX }}
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
