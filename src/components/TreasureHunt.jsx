import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Map, Coffee, BookOpen, Skull, Castle, Lock, MapPin, Search } from 'lucide-react';
import '../styles/index.css';

const mapStops = [
  { id: 1, title: "The Canteen Volcano", description: "Where we fought for survival and Maggi.", question: "What is the most ordered item?", answer: "maggi", icon: <Coffee size={48} />, x: 20, y: 5 },
  { id: 2, title: "The Library Forest", description: "Easy to get lost, harder to find a seat.", question: "What is the penalty for a late book return (in Rs)?", answer: "10", icon: <BookOpen size={48} />, x: 70, y: 20 },
  { id: 3, title: "The Tech Lab", description: "Where code went to die and be resurrected.", question: "What is the first programming language we learned?", answer: "c", icon: <Search size={48} />, x: 40, y: 40 },
  { id: 4, title: "The Exams Cave", description: "Dark, scary, and full of all-nighters.", question: "Fill the blank: Study ___, not hard.", answer: "smart", icon: <Skull size={48} />, x: 80, y: 60 },
  { id: 5, title: "The Hangout Bench", description: "The legendary spot by the big tree.", question: "What tree is next to the bench?", answer: "banyan", icon: <MapPin size={48} />, x: 25, y: 75 },
  { id: 6, title: "The Graduation Castle", description: "The final boss. We made it out alive.", question: "What year do we graduate?", answer: "2026", icon: <Castle size={48} />, x: 60, y: 90 }
];

const TreasureHunt = () => {
  const [unlockedStops, setUnlockedStops] = useState([1]);
  const [activeStop, setActiveStop] = useState(null);
  const [inputValue, setInputValue] = useState('');
  const [isError, setIsError] = useState(false);

  const handleStopClick = (stop) => {
    if (unlockedStops.includes(stop.id)) {
      setActiveStop(stop);
      setInputValue('');
      setIsError(false);
    }
  };

  const handleAnswerSubmit = (e) => {
    e.preventDefault();
    if (!activeStop) return;

    if (inputValue.toLowerCase().trim() === activeStop.answer.toLowerCase()) {
      // Correct Answer!
      if (activeStop.id < mapStops.length && !unlockedStops.includes(activeStop.id + 1)) {
        setUnlockedStops(prev => [...prev, activeStop.id + 1]);
      }
      setActiveStop(null); // Close modal on success
    } else {
      setIsError(true);
      setTimeout(() => setIsError(false), 1000);
    }
  };

  return (
    <section className="dora-map-section">
      <div className="map-header">
        <h2 className="hunt-title">The Core Memory Map</h2>
        <p className="map-subtitle">Answer questions at each landmark to unlock the next core memory!</p>
      </div>
      
      <div className="dora-map-container">
        {/* Winding Dashed Path */}
        <svg className="map-path-svg" preserveAspectRatio="none" viewBox="0 0 100 100">
          <motion.path
            d="M 20 5 C 70 5, 90 20, 70 20 C 30 20, 10 40, 40 40 C 90 40, 100 60, 80 60 C 50 60, 0 75, 25 75 C 50 75, 40 90, 60 90"
            fill="none"
            stroke="#000"
            strokeWidth="1"
            strokeDasharray="2, 2"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 4, ease: "easeInOut" }}
          />
        </svg>

        {/* Map Stops */}
        {mapStops.map((stop) => {
          const isUnlocked = unlockedStops.includes(stop.id);
          const isCurrent = Math.max(...unlockedStops) === stop.id;

          return (
            <motion.div
              key={stop.id}
              className={`map-stop ${isUnlocked ? 'unlocked' : 'locked'} ${isCurrent ? 'current' : ''}`}
              style={{ left: `${stop.x}%`, top: `${stop.y}%` }}
              onClick={() => handleStopClick(stop)}
              whileHover={isUnlocked ? { scale: 1.1 } : {}}
              whileTap={isUnlocked ? { scale: 0.95 } : {}}
            >
              <div className="stop-icon-container">
                {isUnlocked ? stop.icon : <Lock size={32} color="#718096" />}
              </div>
              <span className="stop-title">{stop.title}</span>
            </motion.div>
          );
        })}

        {/* Modal for active stop */}
        <AnimatePresence>
          {activeStop && (
            <motion.div 
              className="map-modal-overlay"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setActiveStop(null)}
            >
              <motion.div 
                className="map-modal"
                initial={{ scale: 0.5, y: 100 }}
                animate={{ scale: 1, y: 0 }}
                exit={{ scale: 0.5, opacity: 0 }}
                onClick={(e) => e.stopPropagation()}
              >
                <div className="modal-icon">{activeStop.icon}</div>
                <h2>{activeStop.title}</h2>
                <p>{activeStop.description}</p>
                
                {activeStop.id === mapStops.length && unlockedStops.includes(activeStop.id) && inputValue === activeStop.answer ? (
                  <p className="success-msg">Congratulations! All core memories unlocked!</p>
                ) : (
                  <form onSubmit={handleAnswerSubmit} className="map-question-form">
                    <p className="question-text">{activeStop.question}</p>
                    <input 
                      type="text" 
                      value={inputValue}
                      onChange={(e) => setInputValue(e.target.value)}
                      className={`puzzle-input ${isError ? 'error-shake' : ''}`}
                      placeholder="Your answer..."
                      autoFocus
                    />
                    <button type="submit" className="puzzle-submit">
                      {unlockedStops.includes(activeStop.id + 1) ? "Already Unlocked" : "Unlock"}
                    </button>
                    {isError && <p className="error-text">Wrong answer. Try again!</p>}
                  </form>
                )}
                
                <button className="puzzle-cancel mt-2" onClick={() => setActiveStop(null)}>
                  Close
                </button>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
};

export default TreasureHunt;
