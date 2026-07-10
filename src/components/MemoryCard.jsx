import { motion } from 'framer-motion';
import '../styles/index.css';

const MemoryCard = ({ memory, isLast }) => {
  return (
    <div className="polaroid-card">
      <div className="polaroid-image-container">
        <img src={memory.imageUrl} alt={memory.title} className="polaroid-image" draggable="false" />
      </div>
      
      <div className="polaroid-content">
        <h3 className="polaroid-title">{memory.title}</h3>
        <span className="polaroid-date">{memory.date}</span>
        <p className="polaroid-description">{memory.description}</p>
        
        {!isLast && (
          <p className="polaroid-hint interactive">{memory.hint}</p>
        )}
      </div>
    </div>
  );
};

export default MemoryCard;
