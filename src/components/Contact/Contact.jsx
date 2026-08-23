import React from "react";

import styles from "./Contact.module.css";
import { getImageUrl } from "../../utils";

export const Contact = () => {
  return (
    <footer id="contact" className={styles.container}>
      <div className={styles.inner}>
        <div className={styles.text}>
          <span className={styles.eyebrow}>04 — Contact</span>
          <h2>Let&apos;s work together</h2>
          <p>Feel free to reach out — I&apos;m always open to new projects.</p>
        </div>
        <ul className={styles.links}>
          <li className={styles.link}>
            <img
              src={getImageUrl("contact/emailIcon.png")}
              alt="Email icon"
            />
            <a href="mailto:nana.naveen50@gmail.com">
              nana.naveen50@gmail.com
            </a>
          </li>
          <li className={styles.link}>
            <img
              src={getImageUrl("contact/linkedinIcon.png")}
              alt="LinkedIn icon"
            />
            <a
              href="https://www.linkedin.com/in/naveentnaik"
              target="_blank"
              rel="noopener noreferrer"
            >
              linkedin.com/in/naveentnaik
            </a>
          </li>
          <li className={styles.link}>
            <img
              src={getImageUrl("contact/githubIcon.png")}
              alt="Github icon"
            />
            <a
              href="https://www.github.com/naveentnaik"
              target="_blank"
              rel="noopener noreferrer"
            >
              github.com/naveentnaik
            </a>
          </li>
        </ul>
      </div>
      <p className={styles.copyright}>
        © {new Date().getFullYear()} Naveen. All rights reserved.
      </p>
    </footer>
  );
};