import { useEffect, useState } from 'react';

// LAB 1 (Slide 07): useEffect Timer
export default function Lab1EffectTimer() {
  const [count, setCount] = useState(0);
  console.log('[LAB 1] rendered');

  useEffect(() => {
    const timerId = setInterval(() => {
      setCount(prev => prev + 1);
    }, 1000);
    console.log('[LAB 1] timer', timerId);
  }, []);

  return (
    <div>
      <p className="hint">화면이 뜨면 1초마다 Count가 올라갑니다.</p>
      <div className="count">{count}</div>
      <p className="hint">Console에서 Render / Effect / Cleanup을 비교하세요.</p>
    </div>
  );
}
