import React from 'react';
import CustomCursor from './components/CustomCursor';
import SplashScreen from './components/SplashScreen';
import BackgroundDoodles from './components/BackgroundDoodles';
import UserDoodleLayer from './components/UserDoodleLayer';
import HeroSection from './components/HeroSection';
import MemoryTimeline from './components/MemoryTimeline';
import CoreMemories from './components/CoreMemories';
import Footer from './components/Footer';

function App() {
  return (
    <div className="app-container">
      <SplashScreen />
      <CustomCursor />
      
      {/* Allows user to draw on the screen */}
      <UserDoodleLayer />

      <BackgroundDoodles />

      <main>
        <div style={{ height: '100vh', width: '100%', pointerEvents: 'none', position: 'absolute', top: 0, left: 0 }} className="doodle-buffer-space" />
        <HeroSection />
        <MemoryTimeline />
        <CoreMemories />
      </main>
      
      <Footer />
    </div>
  )
}

export default App;
