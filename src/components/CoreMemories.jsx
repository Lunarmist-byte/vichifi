import { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Flower, Star, Sparkles, Sun, Moon, Heart, Flame, Zap, Camera, Music } from 'lucide-react';
import MemoryCard from './MemoryCard';
import '../styles/index.css';

const hiddenItems = [
  { id: 1, type: 'memory', icon: <Flower size={48} />, x: 10, y: 30, color: "#ffeb3b", question: "mittayi vanitum orakam mukyam bigilee enne paranje aru!", answer: "deepa miss", memory: { id: 101, title: "bakalava", date: "August 2022", description: "Where we fought for survival and Maggi.", imageUrl: "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?q=80&w=800" } },
  { id: 2, type: 'memory', icon: <Star size={48} />, x: 85, y: 50, color: "#00C896", question: "Joji thumbi copyright adikane aale are", answer: "vivo", memory: { id: 102, title: "Library Fines", date: "October 2022", description: "Easy to get lost, harder to find a seat.", imageUrl: "https://images.unsplash.com/photo-1521587760476-6c12a4b040da?q=80&w=800" } },
  { id: 3, type: 'memory', icon: <Sparkles size={48} />, x: 15, y: 90, color: "#3366FF", question: "Tinkerhub ille padipist are", answer: "fidha", memory: { id: 103, title: "Hello World", date: "January 2023", description: "Where code went to die and be resurrected.", imageUrl: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?q=80&w=800" } },
  { id: 4, type: 'memory', icon: <Sun size={48} />, x: 75, y: 140, color: "#FF9900", question: "Tinkerhub ille chor bazaar nadathiye are", answer: "chai", memory: { id: 104, title: "All Nighters", date: "May 2024", description: "Dark, scary, and full of all-nighters.", imageUrl: "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?q=80&w=800" } },
  { id: 5, type: 'memory', icon: <Moon size={48} />, x: 10, y: 190, color: "#9f7aea", question: "Tinkercarnival inne rathri biscuit thine bengaliye vayi nokkal nayiche ara", answer: "chai", memory: { id: 105, title: "Graduation", date: "June 2026", description: "The final boss. We made it out alive.", imageUrl: "https://images.unsplash.com/photo-1523240795612-9a054b0db644?q=80&w=800" } },
  { id: 6, type: 'dare', icon: <Flame size={48} />, x: 80, y: 20, color: "#FF3366", dareText: "Dare: Run till the beach" },
  { id: 7, type: 'dare', icon: <Zap size={48} />, x: 5, y: 65, color: "#00E5FF", dareText: "Dare: Do 10 pushups immediately." },
  { id: 8, type: 'dare', icon: <Heart size={48} />, x: 85, y: 110, color: "#FF1493", dareText: "Dare:Kudikan ndelum ellarkum mediche thaa" },
  { id: 9, type: 'dare', icon: <Camera size={48} />, x: 25, y: 160, color: "#7FFF00", dareText: "Dare: Find a funny selfie during tinkerhub and put it on your story." },
  { id: 10, type: 'dare', icon: <Music size={48} />, x: 70, y: 220, color: "#FF4500", dareText: "Dare: Sing the chorus of your favorite song." }
];

const CoreMemories = () => {
  const [unlockedMemories, setUnlockedMemories] = useState([]);
  const [visibleMemories, setVisibleMemories] = useState([]);
  const [activeDoodle, setActiveDoodle] = useState(null);
  const [inputValue, setInputValue] = useState('');
  const [isError, setIsError] = useState(false);
  const containerRef = useRef(null);

  const handleDoodleClick = (doodle) => {
    if (!unlockedMemories.includes(doodle.id)) {
      setActiveDoodle(doodle);
      setInputValue('');
      setIsError(false);
    }
  };

  const handleAnswerSubmit = (e) => {
    e.preventDefault();
    if (!activeDoodle) return;

    if (activeDoodle.type === 'memory') {
      if (inputValue.toLowerCase().trim() === activeDoodle.answer.toLowerCase()) {
        const id = activeDoodle.id;
        setUnlockedMemories(prev => [...prev, id]);
        setVisibleMemories(prev => [...prev, id]);
        setActiveDoodle(null);

        setTimeout(() => {
          setVisibleMemories(prev => prev.filter(mId => mId !== id));
        }, 10000);
      } else {
        setIsError(true);
        setTimeout(() => setIsError(false), 1000);
      }
    }
  };

  const handleDareComplete = () => {
    setUnlockedMemories(prev => [...prev, activeDoodle.id]);
    setActiveDoodle(null);
  };

  return (
    <div className="core-memories-container" ref={containerRef}>
      {hiddenItems.map((doodle) => {
        const isUnlocked = unlockedMemories.includes(doodle.id);

        return (
          <motion.div
            key={doodle.id}
            className={`glowing-doodle ${isUnlocked ? 'inert' : 'interactive'}`}
            style={{
              left: `${doodle.x}vw`,
              top: `${doodle.y}vh`,
              color: isUnlocked ? '#888' : doodle.color,
              filter: isUnlocked ? 'none' : `drop-shadow(0 0 10px ${doodle.color}) drop-shadow(0 0 20px ${doodle.color}) drop-shadow(0 0 40px ${doodle.color})`,
              pointerEvents: isUnlocked ? 'none' : 'auto',
              opacity: isUnlocked ? 0.3 : 1
            }}
            onClick={() => !isUnlocked && handleDoodleClick(doodle)}
            animate={isUnlocked ? {} : { scale: [1, 1.3, 1], rotate: [0, 15, -15, 0] }}
            transition={isUnlocked ? {} : { repeat: Infinity, duration: 2 + Math.random() * 1.5 }}
            whileHover={isUnlocked ? {} : { scale: 1.5 }}
          >
            {doodle.icon}
          </motion.div>
        );
      })}

      <AnimatePresence>
        {visibleMemories.map((id) => {
          const item = hiddenItems.find(d => d.id === id);
        if (item.type !== 'memory') return null;

        return (
          <motion.div
            key={`memory-${id}`}
            className="polaroid-wrapper core-memory-polaroid"
            initial={{ scale: 0, opacity: 0, y: 100 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0, opacity: 0 }}
            transition={{ type: "spring", bounce: 0.6 }}
            style={{
              position: 'fixed',
              top: '20vh',
              left: 'calc(50vw - 160px)',
              zIndex: 10000
            }}
            drag
            dragConstraints={containerRef}
            whileDrag={{ scale: 1.05, cursor: 'grabbing', zIndex: 10001 }}
            whileHover={{ scale: 1.02 }}
          >
            <MemoryCard memory={item.memory} isLast={false} />
            <div className="core-badge">CORE MEMORY</div>
            </motion.div>
          );
        })}
      </AnimatePresence>

      <AnimatePresence>
        {activeDoodle && (
          <motion.div
            className="map-modal-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setActiveDoodle(null)}
          >
            <motion.div
              className="map-modal"
              initial={{ scale: 0.5, y: 100 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.5, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="modal-icon" style={{ color: activeDoodle.color, filter: `drop-shadow(0 0 15px ${activeDoodle.color})` }}>
                {activeDoodle.icon}
              </div>

              <h2>{activeDoodle.type === 'dare' ? "Secret Dare!" : "Secret Doodle"}</h2>

              {activeDoodle.type === 'memory' ? (
                <form onSubmit={handleAnswerSubmit} className="map-question-form">
                  <p className="question-text">{activeDoodle.question}</p>
                  <input
                    type="text"
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    className={`puzzle-input ${isError ? 'error-shake' : ''}`}
                    placeholder="Your answer..."
                    autoFocus
                  />
                  <button type="submit" className="puzzle-submit" style={{ background: activeDoodle.color, color: '#000' }}>
                    Unlock Memory
                  </button>
                  {isError && <p className="error-text">Wrong answer. Try again!</p>}
                </form>
              ) : (
                <div className="map-question-form">
                  <p className="question-text" style={{ fontSize: '1.5rem', color: '#FF3366' }}>{activeDoodle.dareText}</p>
                  <button onClick={handleDareComplete} className="puzzle-submit" style={{ background: activeDoodle.color, color: '#000', marginTop: '1rem' }}>
                    I did it!
                  </button>
                </div>
              )}

              <button className="puzzle-cancel mt-2" onClick={() => setActiveDoodle(null)}>
                Leave it
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default CoreMemories;
