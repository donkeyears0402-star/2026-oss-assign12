import { useEffect, useState } from 'react';

// LAB 2 (Slide 10): Timer Start / Stop / Reset
export default function Lab2TimerControl() {
  const [count, setCount] = useState(0);
  const [running, setRunning] = useState(false);

  useEffect(() => {
    if (!running) return;

    const timerId = setInterval(() => {
      setCount(prev => prev + 1);
    }, 1000);

    return () => clearInterval(timerId);
  }, [running]);

  const reset = () => {
    setRunning(false);
    setCount(0);
  };

  return (
    <div>
      <p className="status">상태: {running ? 'Running' : 'Stopped'}</p>
      <div className="count">{count}</div>
      <div className="controls">
        <button onClick={() => setRunning(true)} disabled={running}>Start</button>
        <button className="secondary" onClick={() => setRunning(false)} disabled={!running}>Stop</button>
        <button className="secondary" onClick={reset}>Reset</button>
      </div>
      <p className="hint">Start를 누르면 올라가고, Stop은 멈추고, Reset은 0으로 돌아갑니다.</p>
    </div>
  );
}
