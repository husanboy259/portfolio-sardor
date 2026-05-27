import React, { useState } from 'react';
import './App.css';
import Cursor from './components/Cursor';
import Loader from './components/Loader';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Projects from './components/Projects';
import Footer from './components/Footer';

export default function App() {
  const [loaded, setLoaded] = useState(false);

  return (
    <>
      <Cursor />
      {!loaded && <Loader onDone={() => setLoaded(true)} />}
      <div className={`app${loaded ? ' app--visible' : ''}`}>
        <Navbar />
        <main>
          <Hero />
          <About />
          <Projects />
        </main>
        <Footer />
      </div>
    </>
  );
}
