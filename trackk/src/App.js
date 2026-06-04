import React, { useState } from 'react';

export default function App() {
  const options = [
    { id: 'up', label: '👍', color: '#dcfce7', border: '#86efac', text: 'great' },
    { id: 'side', label: '👈', color: '#fef9c3', border: '#fde047', text: 'so-so' },
    { id: 'down', label: '👎', color: '#fee2e2', border: '#fca5a5', text: 'hard' }
  ];

  const [activeIndex, setActiveIndex] = useState(null);
  const [isSpinning, setIsSpinning] = useState(false);
  const [question, setQuestion] = useState("how was your day?");
  const [remainingOptions, setRemainingOptions] = useState([0, 1, 2]);

  const startAnimation = () => {
    setIsSpinning(true);
    setActiveIndex(null);
    let pool = remainingOptions.length > 0 ? [...remainingOptions] : [0, 1, 2];
    let count = 0;
    
    const interval = setInterval(() => {
      setActiveIndex(count % options.length);
      count++;
    }, 150);
    
    setTimeout(() => {
      clearInterval(interval);
      const randomIndex = Math.floor(Math.random() * pool.length);
      const selectedIndex = pool[randomIndex];
      setActiveIndex(selectedIndex);
      setQuestion(`what was ${options[selectedIndex].text} about your day?`);
      setRemainingOptions(pool.filter((_, i) => i !== randomIndex));
      setIsSpinning(false);
    }, 2000);
  };

  return (
    <div style={{ 
      fontFamily: "'Nunito', sans-serif", 
      display: 'flex', 
      justifyContent: 'center', 
      alignItems: 'center', 
      height: '100vh', 
      backgroundColor: '#f0f9ff', 
      width: '100vw', 
      boxSizing: 'border-box', 
      padding: '5px',
      overflow: 'hidden'
    }}>
      <div style={{ 
        background: 'white', 
        padding: '0.5rem', 
        borderRadius: '40px', 
        boxShadow: '0 10px 30px rgba(0,0,0,0.05)', 
        textAlign: 'center', 
        width: '100%', 
        maxWidth: '300px', 
        height: 'auto', 
        display: 'flex', 
        flexDirection: 'column',
        alignItems: 'center'
      }}>
        
        <h1 style={{ 
          fontFamily: "'Momo Trust Display', sans-serif",
          background: "linear-gradient(to right, #22c55e, #eab308, #ef4444)",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
          fontSize: "2rem",
          margin: "10px 0 5px 0"
        }}>track light</h1>
        
        <h2 style={{ 
          color: '#475569', 
          margin: '5px 0', 
          fontSize: '1rem',
          minHeight: '2em',
          display: 'flex',
          alignItems: 'center'
        }}>{question}</h2>
        
        <div style={{ 
          display: 'flex', 
          flexDirection: 'column', 
          gap: '10px', 
          margin: '15px 0' // Slightly increased margin here to push items apart
        }}>
          {options.map((option, index) => (
            <div 
              key={option.id}
              style={{
                width: '60px', height: '60px', borderRadius: '50%', fontSize: '1.6rem',
                display: 'flex', justifyContent: 'center', alignItems: 'center',
                background: option.color,
                border: `3px solid ${option.border}`,
                opacity: (activeIndex === index) ? 1 : 0.2,
                transform: (activeIndex === index) ? 'scale(1.1)' : 'scale(1)',
                transition: 'all 0.1s ease'
              }}
            >
              {option.label}
            </div>
          ))}
        </div>
        
        <button 
          disabled={isSpinning} 
          onClick={startAnimation} 
          style={{ 
            background: '#a78bfa', 
            color: 'white', 
            width: '120px', 
            height: '45px', 
            border: 'none', 
            borderRadius: '20px', 
            cursor: 'pointer', 
            fontSize: '1.1rem', 
            textTransform: 'lowercase', 
            fontFamily: "'Nunito', sans-serif", 
            marginBottom: '15px',
            marginTop: '10px' // Added specific top margin to push it away from the thumbs
          }}
        >
          {isSpinning ? "choosing..." : "go!"}
        </button>
      </div>
    </div>
  );
}