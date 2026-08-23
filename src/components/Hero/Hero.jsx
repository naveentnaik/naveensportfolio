import React from "react";

import styles from "./Hero.module.css";
import { getImageUrl } from "../../utils";
import { ParticleField } from "./ParticleField";

export const Hero = () => {
  return (
    <section className={styles.container}>
      <ParticleField />
      <div className={styles.content}>
        <span className={styles.eyebrow}>Fullstack Developer</span>
        <h1 className={styles.title}>Hi, I&apos;m Naveen</h1>
        <p className={styles.description}>
          I build responsive, production-ready web apps with React and
          Node.js. Reach out if you&apos;d like to work together.
        </p>
        <div className={styles.actions}>
          <a
            href="mailto:nana.naveen50@gmail.com"
            className={styles.contactBtn}
          >
            Contact Me
          </a>
          <a href="#projects" className={styles.secondaryBtn}>
            View Work
          </a>
        </div>
      </div>
      <div className={styles.imageWrap}>
        <img
          src={getImageUrl("hero/pngwing.com (1).png")}
          alt="Hero image of me"
          className={styles.heroImg}
        />
      </div>
      <div className={styles.glow} />
    </section>
  );
};