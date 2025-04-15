import React, { useEffect, useState } from "react";
import styles from "./Scorebar.module.css";

const Scorebar = ({ score, level, gameOver }) => {
  const [progress, setProgress] = useState(0);
  const threshold = level * 5;

  // Resets progress with new level
  useEffect(() => {
    setProgress(0);
    console.log("Score:", score);
    console.log("Progress:", progress);
  }, [level, gameOver]);

  // Increment progress when score changes
  useEffect(() => {
    if (score !== 0) {
      setProgress((prev) => prev + 1);
    }
    console.log("Progress score:", progress);
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
