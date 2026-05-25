import React, { useEffect, useState } from 'react';
import './Loader.css';

export default function Loader({ onDone }) {
  const [progress, setProgress] = useState(0);
  const [hiding, setHiding] = useState(false);

  useEffect(() => {
    const steps = [20, 50, 75, 90, 100];
    let i = 0;
    const tick = () => {
      if (i < steps.length) {
        setProgress(steps[i]);
        i++;
        setTimeout(tick, i === steps.length ? 200 : 280);
      } else {
        setHiding(true);
        setTimeout(onDone, 600);
      }
    };
    tick();
  }, [onDone]);

  return (
    <div className={`loader${hiding ? ' loader--hide' : ''}`}>
      <div className="loader__content">
        <img src="/logo.png" alt="Wentric" className="loader__logo" />
        <div className="loader__name">Wentric</div>
        <div className="loader__bar-wrap">
          <div className="loader__bar" style={{ width: `${progress}%` }} />
        </div>
        <div className="loader__pct">{progress}%</div>
      </div>
    </div>
  );
}
