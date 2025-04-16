import { mdiGithub } from "@mdi/js";
import GithubIcon from "@mdi/react";
import styles from "./Icons.module.css";

const Github = function () {
  return <GithubIcon path={mdiGithub} className={styles.github} />;
};

export { Github };
