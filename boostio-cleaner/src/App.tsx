import React from 'react';
import MatrixBackground from './components/MatrixBackground';
import Navbar from './components/Navbar';
import HeroSection from './components/HeroSection';
import FeaturesSection from './components/FeaturesSection';
import CleanerDashboard from './components/CleanerDashboard';
import FloatingContactButton from './components/FloatingContactButton';
// import ScrollProgress from './components/ScrollProgress';
import PricingSection from './components/PricingSection';
import './App.css';

function App() {
  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden">
      {/* Background Effects */}
      <MatrixBackground />
      
      {/* Scroll Progress - 일시적으로 비활성화 */}
      {/* <ScrollProgress /> */}
      
      {/* Navigation */}
      <Navbar />
      
      {/* Main Content */}
      <main>
        <HeroSection />
        <CleanerDashboard />
        <FeaturesSection />
        <PricingSection />
      </main>
      
      {/* Floating Contact Button */}
      <FloatingContactButton />
    </div>
  );
}

export default App;
