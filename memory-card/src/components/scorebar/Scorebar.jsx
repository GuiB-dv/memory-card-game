import React, { useEffect, useState } from "react";
import styles from "./Scorebar.module.css";

const Scorebar = ({ score, level }) => {
  const [lvlThreshold, setLvlThreshold] = useState(5);
  const [currentLevelScore, setCurrentLevelScore] = useState(0);

  // Resets progress and set new threshold
  useEffect(() => {
    const newThreshold = level * 5;
    setLvlThreshold(newThreshold);
    setCurrentLevelScore(0);
  }, [level]);

  // Update current level score when overall score changes
  useEffect(() => {
    // Calculate score relative to current level
    const baseScore = score - (level - 1) * 5;
    setCurrentLevelScore(baseScore);
    console.log("Progress percent:", progressPercent);
    console.log("Threshold:", lvlThreshold);
    console.log("Score:", score);
    console.log("Base score:", currentLevelScore);
  }, [score, level]);

  //Calculate percentage
  const progressPercent = Math.min(
    (currentLevelScore / lvlThreshold) * 100,
    100
  );

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
