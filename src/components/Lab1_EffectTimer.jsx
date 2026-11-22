import { useEffect, useState } from 'react';

function formatTime(seconds) {
  const minutes = String(Math.floor(seconds / 60)).padStart(2, '0');
  const rest = String(seconds % 60).padStart(2, '0');
  return `${minutes}:${rest}`;
}

// LAB 1 (Slide 07): useEffect Timer
export default function Lab1EffectTimer() {
  const [count, setCount] = useState(0);
  console.log('[LAB 1] rendered');

  useEffect(() => {
    const timerId = setInterval(() => {
      setCount(prev => prev + 1);
    }, 1000);

    return () => {
      clearInterval(timerId);
      console.log('[LAB 1] cleanup');
    };
  }, []);

  return (
    <div>
      <p className="hint">화면이 뜨면 1초마다 Count가 올라갑니다.</p>
      <div className="count">{formatTime(count)}</div>
      <p className="hint">경과 {count}초</p>
      <p className="hint">Console에서 Render / Effect / Cleanup을 비교하세요.</p>
    </div>
  );
}
