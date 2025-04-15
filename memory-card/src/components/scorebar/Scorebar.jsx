import React, { useEffect, useState } from "react";
import styles from "./Scorebar.module.css";

const Scorebar = ({ score, level }) => {
  const [progress, setProgress] = useState(0);

  // Resets progress with new level
  useEffect(() => {
    setProgress(0);
  }, [level]);

  // Increment progress when score changes
  useEffect(() => {
    if (score !== 0) {
      setProgress((prev) => prev + 1);
    }
  }, [score]);

  //Calculate percentage
  const progressPercent = Math.min((progress / 5) * 100, 100);

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
