import React, { useState, useEffect } from 'react';

const messages = [
  { text: "i am trying my best", emoji: "🌱" },
  { text: "i can do hard things", emoji: "💪" },
  { text: "i am loved for being myself", emoji: "💖" },
  { text: "i can control my emotions", emoji: "🌊" },
  { text: "i can find solutions", emoji: "🧩" },
  { text: "i am a good friend", emoji: "🤝" },
  { text: "i can learn new things", emoji: "📚" },
  { text: "i believe in myself", emoji: "🌟" },
  { text: "it’s okay to make mistakes", emoji: "🎨" },
  { text: "i can make good choices", emoji: "🎯" },
  { text: "i am brave and strong", emoji: "🦁" },
  { text: "my voice matters", emoji: "🗣️" },
  { text: "i treat others with kindness", emoji: "🌸" },
  { text: "i am patient with myself", emoji: "⏳" },
  { text: "i am full of creativity", emoji: "💡" }
];

const shuffleArray = (array) => {
  const newArray = [...array];
  for (let i = newArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
  }
  return newArray;
};

export default function App() {
  const [isFlipped, setIsFlipped] = useState(false);
  const [shuffledDeck, setShuffledDeck] = useState([]);
  const [currentIdx, setCurrentIdx] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    setShuffledDeck(shuffleArray(messages));
  }, []);

  const triggerInteraction = (action) => {
    setIsAnimating(true);
    setIsFlipped(false);
    setTimeout(() => {
      action();
      setIsAnimating(false);
    }, 400);
  };

  return (
    <div style={{ 
      fontFamily: "'Nunito', sans-serif",
      display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', 
      minHeight: '100vh', background: 'linear-gradient(135deg, #0f172a 0%, #312e81 100%)', gap: '30px',
      color: '#fff', padding: '20px'
    }}>
      <style>{`@keyframes pulseEffect { 0% { transform: scale(1); } 50% { transform: scale(0.9); } 100% { transform: scale(1); } }`}</style>
      
      <h1 style={{ 
        fontFamily: "'Momo Trust Display', sans-serif",
        fontSize: '3rem', fontWeight: '800', background: 'linear-gradient(90deg, #fde047, #fef3c7)', 
        WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', margin: 0, textAlign: 'center', textTransform: 'lowercase'
      }}>
        steady mind
      </h1>

      <div style={{ width: '300px', height: '320px', perspective: '1000px', cursor: 'pointer' }} onClick={() => !isAnimating && setIsFlipped(!isFlipped)}>
        <div style={{ 
          width: '100%', height: '100%', position: 'relative', transition: 'transform 0.6s', 
          transformStyle: 'preserve-3d', 
          transform: isFlipped ? 'rotateY(180deg)' : 'rotateY(0deg)',
          animation: isAnimating ? 'pulseEffect 0.4s ease' : 'none'
        }}>
          <div style={{ position: 'absolute', width: '100%', height: '100%', backfaceVisibility: 'hidden', borderRadius: '40px', background: 'rgba(255, 255, 255, 0.1)', backdropFilter: 'blur(15px)', border: '1px solid rgba(255, 255, 255, 0.2)', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
            <div style={{ fontSize: '70px', marginBottom: '15px' }}>✨</div>
            <h2 style={{ fontFamily: "'Momo Trust Display', sans-serif", fontSize: '1.6rem', fontWeight: '700', margin: 0 }}>message of the day</h2>
            <p style={{ color: '#cbd5e1', fontWeight: '500' }}>tap to discover your magic!</p>
          </div>

          <div style={{ position: 'absolute', width: '100%', height: '100%', backfaceVisibility: 'hidden', borderRadius: '40px', background: 'rgba(255, 255, 255, 0.1)', backdropFilter: 'blur(15px)', border: '1px solid rgba(255, 255, 255, 0.2)', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', transform: 'rotateY(180deg)' }}>
            <div style={{ fontSize: '70px', marginBottom: '15px' }}>{shuffledDeck[currentIdx]?.emoji}</div>
            <p style={{ fontSize: '1.5rem', fontWeight: '700', textAlign: 'center', padding: '0 20px', textShadow: '0 0 15px rgba(255,255,255,0.8)' }}>
              {shuffledDeck[currentIdx]?.text}
            </p>
          </div>
        </div>
      </div>

      <div style={{ display: 'flex', gap: '20px' }}>
        <button style={{ padding: '14px 28px', borderRadius: '30px', border: 'none', background: 'linear-gradient(135deg, #a855f7 0%, #6366f1 100%)', color: 'white', fontWeight: '700', fontSize: '1rem', cursor: 'pointer', boxShadow: '0 8px 15px rgba(139, 92, 246, 0.3)' }} onClick={() => triggerInteraction(() => { setShuffledDeck(shuffleArray(messages)); setCurrentIdx(0); })}>shuffle</button>
        <button style={{ padding: '14px 28px', borderRadius: '30px', border: 'none', background: 'linear-gradient(135deg, #a855f7 0%, #6366f1 100%)', color: 'white', fontWeight: '700', fontSize: '1rem', cursor: 'pointer', boxShadow: '0 8px 15px rgba(139, 92, 246, 0.3)' }} onClick={() => triggerInteraction(() => setCurrentIdx((prev) => (prev + 1) % shuffledDeck.length))}>next ✨</button>
      </div>

      <div style={{ marginTop: '20px', textAlign: 'center', maxWidth: '350px', color: '#cbd5e1', fontSize: '0.85rem' }}>
        <a href="https://buymeacoffee.com/kindtools" target="_blank" rel="noopener noreferrer" style={{ display: 'inline-block', padding: '10px 25px', borderRadius: '30px', background: '#fef3c7', color: '#92400e', fontWeight: 'bold', textDecoration: 'none', marginBottom: '15px' }}>support ❤️</a>
        <p><b>steady mind is 100% free!</b></p>
        <p>if this tool has helped your little ones build confidence and a growth mindset, consider supporting <b>kind tools</b> by buying me a coffee ☕</p>
      </div>
    </div>
  );
}