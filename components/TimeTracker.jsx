import React, { useState, useEffect } from 'react';
import styles from '../styles/TimeTracker.module.css'; 

const TimeTracker = ({ taskId, onTimeLogged }) => {
  const [isTracking, setIsTracking] = useState(false);
  const [timeElapsed, setTimeElapsed] = useState(0); 
  const [startTime, setStartTime] = useState(null);


  const startTracking = () => {
    setIsTracking(true);
    setStartTime(Date.now());
  };


  const stopTracking = () => {
    if (isTracking) {
      const elapsedTime = (Date.now() - startTime) / 1000; 
      setTimeElapsed(elapsedTime);
      if (onTimeLogged && typeof onTimeLogged === 'function') {
        onTimeLogged(taskId, elapsedTime); 
      }
      setIsTracking(false);
      setStartTime(null);
    }
  };


  useEffect(() => {
    let interval;
    if (isTracking) {
      interval = setInterval(() => {
        setTimeElapsed(Math.floor((Date.now() - startTime) / 1000));
      }, 1000);
    }

    return () => clearInterval(interval); 
  }, [isTracking, startTime]);

  return (
    <div className={styles.timeTracker}>
      <div className={styles.timeDisplay}>
        <span>Time Spent: {Math.floor(timeElapsed / 60)}:{String(timeElapsed % 60).padStart(2, '0')}</span>
      </div>
      <div className={styles.buttons}>
        {isTracking ? (
          <button onClick={stopTracking} className={styles.stopButton}>Stop</button>
        ) : (
          <button onClick={startTracking} className={styles.startButton}>Start</button>
        )}
      </div>
    </div>
  );
};

export default TimeTracker;
