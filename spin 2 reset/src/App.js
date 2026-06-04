import React, { useState, useRef, useEffect } from 'react';

const PALETTE = ['#FF4B4B', '#FF9600', '#FFC800', '#58CC02', '#46A302', '#1CB0F6', '#1899D6', '#0E5C8D'];

const SKILLS = [
  { id: 1, icon: '🦋', title: 'butterfly hug', desc: 'cross your arms and tap each shoulder. after counting to 10, give yourself a tight, cozy hug!', duration: 10 },
  { id: 2, icon: '🌊', title: 'ocean breath', desc: 'take deep breaths. imagine big waves with every inhale and exhale.', duration: 30 },
  { id: 3, icon: '⚡', title: 'jumping jacks', desc: 'get moving! do 10 jumping jacks with as much energy as you can.', duration: 20 },
  { id: 4, icon: '🏄', title: 'ride the emotions', desc: 'stand in a surfer pose. imagine you are surfing, feeling all your emotions as waves.', duration: 30 },
  { id: 5, icon: '🔍', title: 'detective senses', desc: 'be a detective: name 2 things you see, 2 things you hear, and 2 things you smell.', duration: 45 },
  { id: 6, icon: '✏️', title: 'pillow doodle', desc: 'grab a pillow and use your finger to draw or write whatever you want!', duration: 30 },
  { id: 7, icon: '❄️', title: 'frozen moment', desc: 'splash some cold water on your face or hold a cold ice cube.', duration: 15 },
  { id: 8, icon: '☁️', title: 'cloud nap', desc: 'find a safe, comfy space. lay down, close your eyes, and rest.', duration: 180 }, // Updated to 180 seconds
];
export default function App() {
  const [rotation, setRotation] = useState(0);
  const [spinning, setSpinning] = useState(false);
  const [activeSkill, setActiveSkill] = useState(null);
  const [timeLeft, setTimeLeft] = useState(0);
  const [timerActive, setTimerActive] = useState(false);
  const [hasRun, setHasRun] = useState(false);
  const currentRotation = useRef(0);

  useEffect(() => {
    if (timerActive && timeLeft > 0) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    } else if (timerActive && timeLeft === 0) {
      setTimerActive(false);
      setHasRun(true);
    }
  }, [timerActive, timeLeft]);

  const spinWheel = () => {
    if (spinning) return;
    setTimerActive(false);
    setTimeLeft(0);
    setHasRun(false);
    setSpinning(true);
    const segment = 360 / SKILLS.length;
    const target = Math.floor(Math.random() * SKILLS.length);
    const finalAngle = currentRotation.current + 2880 - (currentRotation.current % 360) - (target * segment + segment / 2);
    currentRotation.current = finalAngle;
    setRotation(finalAngle);
    setTimeout(() => { setSpinning(false); setActiveSkill(SKILLS[target]); }, 4500);
  };

  return (
    <div style={{ minHeight: '100vh', background: '#F0F4F8', display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '20px', fontFamily: "'Nunito', sans-serif" }}>
      
      <div style={{ flex: '1 0 auto', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', width: '100%', maxWidth: '350px' }}>
        <h1 style={{ fontFamily: "'Momo Trust Display', sans-serif", fontSize: '42px', fontWeight: '800', color: '#4A5568', margin: '0', textAlign: 'center' }}>spin 2 reset</h1>
        <p style={{ color: '#718096', fontSize: '14px', marginTop: '4px', marginBottom: '20px', textAlign: 'center' }}>big emotions? take a spin to find your calm. ✨</p>
        
        <div style={{ position: 'relative', width: '100%' }}>
          <div style={{ position: 'absolute', top: '-12px', left: '50%', marginLeft: '-15px', width: '0', height: '0', borderLeft: '15px solid transparent', borderRight: '15px solid transparent', borderTop: '20px solid #2D3748' }} />
          <div style={{ background: 'white', borderRadius: '40px', padding: '20px', boxShadow: '0 20px 40px rgba(0,0,0,0.1)', textAlign: 'center' }}>
            <svg viewBox="0 0 300 300" style={{ width: '100%', transform: `rotate(${rotation}deg)`, transition: 'transform 4.5s cubic-bezier(0.17, 0.67, 0.12, 0.99)' }}>
              {SKILLS.map((s, i) => (
                <g key={s.id}>
                  <path d={`M 150,150 L ${150 + 140 * Math.sin(i * 45 * Math.PI/180)} ${150 - 140 * Math.cos(i * 45 * Math.PI/180)} A 140 140 0 0 1 ${150 + 140 * Math.sin((i + 1) * 45 * Math.PI/180)} ${150 - 140 * Math.cos((i + 1) * 45 * Math.PI/180)} Z`} fill={PALETTE[i]} stroke="white" strokeWidth="6" />
                  <text x="150" y="60" fontSize="40" textAnchor="middle" transform={`rotate(${i * 45 + 22.5}, 150, 150)`}>{s.icon}</text>
                </g>
              ))}
            </svg>
            <button onClick={spinWheel} style={{ width: '100%', padding: '18px', borderRadius: '50px', border: 'none', background: 'linear-gradient(180deg, #8B5CF6 0%, #6D28D9 100%)', color: 'white', fontSize: '20px', fontWeight: '800', marginTop: '20px', cursor: 'pointer' }}>spin it!</button>
          </div>
        </div>
      </div>

      <div style={{ flexShrink: 0, marginTop: '20px', textAlign: 'center', color: '#4A5568', paddingBottom: '20px', maxWidth: '350px' }}>
        <a 
          href="https://buymeacoffee.com/kindtools" 
          target="_blank" 
          rel="noreferrer" 
          style={{ 
            display: 'inline-block', 
            padding: '8px 24px', 
            borderRadius: '50px', 
            background: '#FEF9C3', 
            border: '2px solid #FDE68A', 
            color: '#92400E', 
            textDecoration: 'none', 
            fontWeight: 'bold', 
            marginBottom: '10px' 
          }}
        >
          support ❤️
        </a>
        <p style={{ fontWeight: 'bold', margin: '0', fontSize: '14px' }}>spin 2 reset is 100% free!</p>
        <p style={{ fontSize: '12px', margin: '5px 0' }}>
          if this tool has helped your little ones find their calm, consider supporting Kind Tools by buying me a coffee ☕
        </p>
      </div>
      
      {activeSkill && (
        <div onClick={() => setActiveSkill(null)} style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', background: 'rgba(0,0,0,0.6)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '10px', animation: 'fadeIn 0.2s ease-out', zIndex: 1000 }}>
          <div onClick={(e) => e.stopPropagation()} style={{ background: 'white', padding: '20px', borderRadius: '40px', width: '90%', maxWidth: '350px', textAlign: 'center', animation: 'scaleUp 0.3s cubic-bezier(0.17, 0.89, 0.32, 1.27)', position: 'relative' }}>
            <button onClick={() => setActiveSkill(null)} style={{ position: 'absolute', top: '15px', right: '15px', background: '#EDF2F7', border: 'none', borderRadius: '50%', width: '30px', height: '30px', cursor: 'pointer', fontWeight: 'bold', color: '#4A5568' }}>✕</button>
            <div style={{ fontSize: '40px', marginBottom: '10px' }}>{activeSkill.icon}</div>
            <h2 style={{ fontFamily: "'Momo Trust Display'", color: '#2D3748', textTransform: 'lowercase', margin: '0 0 10px 0' }}>{activeSkill.title}</h2>
            <p style={{ color: '#4A5568', fontSize: '16px', margin: '0 0 20px 0' }}>{activeSkill.desc}</p>
            {timeLeft > 0 ? <div style={{ fontSize: '40px', fontWeight: '800', color: '#6B46C1', margin: '15px 0' }}>{timeLeft}s</div> :
            <button onClick={() => { setTimeLeft(activeSkill.duration); setTimerActive(true); }} style={{ width: '100%', padding: '15px', borderRadius: '50px', border: 'none', background: '#58CC02', color: 'white', fontWeight: '800', cursor: 'pointer' }}>{hasRun ? 'start again' : (timerActive ? 'running...' : 'start')}</button>}
            <button onClick={() => { setActiveSkill(null); spinWheel(); }} style={{ width: '100%', marginTop: '15px', background: 'none', border: 'none', color: '#A0AEC0', cursor: 'pointer', fontSize: '14px' }}>spin again</button>
          </div>
        </div>
      )}
      
      <style>{`
        @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
        @keyframes scaleUp { from { transform: scale(0.8); } to { transform: scale(1); } }
      `}</style>
    </div>
  );
}