import React, { useEffect, useState } from "react";
import styles from "./Scorebar.module.css";

const Scorebar = ({ score, level, gameOver }) => {
  const [progress, setProgress] = useState(0);
  const threshold = level * 5;

  // Resets progress with new level
  useEffect(() => {
    setProgress(0);
  }, [level, gameOver]);

  // Increment progress when score changes
  useEffect(() => {
    if (score !== 0 && score !== 5 && score !== 15) {
      setProgress((prev) => prev + 1);
    }
  }, [score]);

  //Calculate percentage
  const progressPercent = Math.min((progress / threshold) * 100, 100);

  return (
    <>
      <div className={styles.progressBar}>
        <div
          className={styles.progressBarFill}
          style={{ width: `${progressPercent}%` }}
        ></div>
      </div>
    </>
  );
};

export default Scorebar;
