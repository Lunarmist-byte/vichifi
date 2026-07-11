import { useRef, useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Pencil, Eraser } from 'lucide-react';
import '../styles/index.css';

const UserDoodleLayer = () => {
  const canvasRef = useRef(null);
  const [isDrawingMode, setIsDrawingMode] = useState(true);
  const [isDrawing, setIsDrawing] = useState(false);
  const [color, setColor] = useState('#FF3366');
  
  const [strokes, setStrokes] = useState(() => {
    try {
      const saved = localStorage.getItem('vichifi_doodles');
      return saved ? JSON.parse(saved) : [];
    } catch (e) {
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem('vichifi_doodles', JSON.stringify(strokes));
  }, [strokes]);
  
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsDrawingMode(false);
    }, 10000); // Stop doodling when splash screen ends
    return () => clearTimeout(timer);
  }, []);

  const currentPointsRef = useRef([]);

  useEffect(() => {
    const resizeCanvas = () => {
      const canvas = canvasRef.current;
      if (canvas) {
        canvas.width = window.innerWidth;
        canvas.height = document.documentElement.scrollHeight;
      }
    };
    
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);
    setTimeout(resizeCanvas, 1000); 

    return () => window.removeEventListener('resize', resizeCanvas);
  }, []);

  const startDrawing = (e) => {
    if (!isDrawingMode) return;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    const rect = canvas.getBoundingClientRect();
    const clientX = e.touches ? e.touches[0].clientX : e.clientX;
    const clientY = e.touches ? e.touches[0].clientY : e.clientY;

    const x = clientX - rect.left;
    const y = clientY - rect.top;

    currentPointsRef.current = [{ x, y }];

    ctx.beginPath();
    ctx.moveTo(x, y);
    setIsDrawing(true);
  };

  const draw = (e) => {
    if (!isDrawing || !isDrawingMode) return;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    const rect = canvas.getBoundingClientRect();
    if (e.touches) e.preventDefault();

    const clientX = e.touches ? e.touches[0].clientX : e.clientX;
    const clientY = e.touches ? e.touches[0].clientY : e.clientY;

    const x = clientX - rect.left;
    const y = clientY - rect.top;

    currentPointsRef.current.push({ x, y });

    ctx.lineTo(x, y);
    ctx.strokeStyle = color;
    ctx.lineWidth = 6;
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
    ctx.shadowBlur = 10;
    ctx.shadowColor = color;
    ctx.stroke();
  };

  const stopDrawing = () => {
    if (!isDrawing || !isDrawingMode) return;
    setIsDrawing(false);

    const points = currentPointsRef.current;
    if (points.length < 2) {
      currentPointsRef.current = [];
      return;
    }

    let minX = Infinity, minY = Infinity, maxX = -Infinity, maxY = -Infinity;
    let pathString = "";

    points.forEach((p, i) => {
      if (p.x < minX) minX = p.x;
      if (p.x > maxX) maxX = p.x;
      if (p.y < minY) minY = p.y;
      if (p.y > maxY) maxY = p.y;

      if (i === 0) {
        pathString += `M ${p.x} ${p.y} `;
      } else {
        pathString += `L ${p.x} ${p.y} `;
      }
    });

    const padding = 20;
    const width = maxX - minX + padding * 2;
    const height = maxY - minY + padding * 2;

    const newStroke = {
      id: Date.now(),
      path: pathString,
      minX: minX - padding,
      minY: minY - padding,
      width,
      height,
      color
    };

    setStrokes(prev => [...prev, newStroke]);
    
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    currentPointsRef.current = [];
  };

  const clearAll = () => {
    setStrokes([]);
    const canvas = canvasRef.current;
    if (canvas) {
      const ctx = canvas.getContext('2d');
      ctx.clearRect(0, 0, canvas.width, canvas.height);
    }
  };

  return (
    <>
      <canvas
        ref={canvasRef}
        className={`user-doodle-canvas ${isDrawingMode ? 'active' : ''}`}
        onMouseDown={startDrawing}
        onMouseMove={draw}
        onMouseUp={stopDrawing}
        onMouseLeave={stopDrawing}
        onTouchStart={startDrawing}
        onTouchMove={draw}
        onTouchEnd={stopDrawing}
        onTouchCancel={stopDrawing}
      />
      
      <div className="thrown-doodles-container">
        {strokes.map((stroke) => (
          <motion.svg
            key={stroke.id}
            style={{
              position: 'absolute',
              left: stroke.minX,
              top: stroke.minY,
              width: stroke.width,
              height: stroke.height,
              zIndex: 9998,
              cursor: 'grab'
            }}
            viewBox={`${stroke.minX} ${stroke.minY} ${stroke.width} ${stroke.height}`}
            drag
            dragMomentum={true}
            whileDrag={{ scale: 1.1, cursor: 'grabbing', zIndex: 9999 }}
            whileHover={{ scale: 1.05 }}
          >
            <path 
              d={stroke.path} 
              fill="none" 
              stroke={stroke.color} 
              strokeWidth="6" 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              style={{ filter: `drop-shadow(0px 0px 8px ${stroke.color})` }}
            />
          </motion.svg>
        ))}
      </div>
      
      <motion.div 
        className="doodle-toolbar interactive"
        drag
        dragMomentum={false}
      >
        <button 
          className={`toolbar-btn ${isDrawingMode ? 'active-btn' : ''}`}
          onClick={() => setIsDrawingMode(!isDrawingMode)}
          title="Toggle Doodle Mode"
        >
          <Pencil size={24} />
          <span>{isDrawingMode ? 'Stop Drawing' : 'Draw!'}</span>
        </button>
        
        {isDrawingMode && (
          <>
            <div className="color-picker">
              {['#FF3366', '#00C896', '#3366FF', '#000000', '#FF9900'].map(c => (
                <button 
                  key={c} 
                  className={`color-btn ${color === c ? 'selected-color' : ''}`}
                  style={{ backgroundColor: c }}
                  onClick={() => setColor(c)}
                />
              ))}
            </div>
          </>
        )}
        
        {strokes.length > 0 && (
          <button className="toolbar-btn" onClick={clearAll} title="Clear Doodles">
            <Eraser size={20} />
            <span>Clear Doodles</span>
          </button>
        )}
      </motion.div>
    </>
  );
};

export default UserDoodleLayer;
