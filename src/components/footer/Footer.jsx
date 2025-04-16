import React from "react";
import styles from "./Footer.module.css";

import { Github } from "../Icons/Icons";

const Footer = () => {
  return (
    <div className={styles.footer}>
      <div className={styles.footerAuthor}>
        <p>Guilherme Brito - {new Date().getFullYear()} &nbsp;</p>
        <a
          className="github-link"
          href="https://github.com/GuiB-dv"
          target="_blank"
        >
          <Github />
          <p>GuiB-dv</p>
        </a>
      </div>

      <div>
        <p>
          Data resources received from: &nbsp;
          <a href="https://pokeapi.co/" target="_blank">
            PokeAPI.co
          </a>
        </p>
      </div>
    </div>
  );
};

export default Footer;
