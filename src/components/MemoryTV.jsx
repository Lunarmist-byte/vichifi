import React, { useRef, useEffect } from 'react';
import '../styles/index.css';

const MemoryTV = ({ memory }) => {
  const videoRef = useRef(null);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.play().catch(error => {
        console.log("Autoplay was prevented:", error);
      });
    }
  }, []);

  return (
    <div className="tv-shell">
      <div className="tv-antenna">
        <div className="antenna-stick left"></div>
        <div className="antenna-stick right"></div>
      </div>
      
      <div className="tv-inner">
        <div className="tv-screen-container">
          <video 
            ref={videoRef}
            className="tv-video"
            src={memory.videoUrl}
            autoPlay
            loop
            muted
            playsInline
          />
          <div className="crt-scanlines"></div>
          <div className="crt-glass"></div>
        </div>
        
        <div className="tv-controls">
          <div className="tv-dial"></div>
          <div className="tv-dial"></div>
          <div className="tv-speaker">
            {Array.from({ length: 15 }).map((_, i) => (
              <div key={i} className="speaker-hole"></div>
            ))}
          </div>
        </div>
      </div>
      
      <div className="tv-label">
        <h3 className="tv-title">{memory.title}</h3>
        <p className="tv-date">{memory.date}</p>
      </div>
    </div>
  );
};

export default MemoryTV;
