import React from 'react';
import CustomCursor from './components/CustomCursor';
import BackgroundDoodles from './components/BackgroundDoodles';
import UserDoodleLayer from './components/UserDoodleLayer';
import HeroSection from './components/HeroSection';
import MemoryTimeline from './components/MemoryTimeline';
import CoreMemories from './components/CoreMemories';
import Footer from './components/Footer';

function App() {
  return (
    <div className="app-container">
      <CustomCursor />
      
      {/* Allows user to draw on the screen */}
      <UserDoodleLayer />

      <BackgroundDoodles />

      <main>
        <HeroSection />
        <MemoryTimeline />
        <CoreMemories />
      </main>
      
      <Footer />
    </div>
  )
}

export default App;
