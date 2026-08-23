import React from "react";
import styles from "./About.module.css";
import { getImageUrl } from "../../utils";
import { useReveal } from "../../hooks/useReveal";

const aboutItems = [
  {
    icon: "about/cursorIcon.png",
    alt: "Cursor icon",
    title: "Fullstack Developer",
    description:
      "I build responsive, optimized web apps end to end — from React interfaces to the APIs and databases behind them.",
  },
  {
    icon: "about/serverIcon.png",
    alt: "Server icon",
    title: "Backend & APIs",
    description:
      "Comfortable designing REST APIs and data models with Node.js, Express, and MongoDB, deployed to real production environments.",
  },
  {
    icon: "about/uiIcon.png",
    alt: "UI layout icon",
    title: "Responsive Design",
    description:
      "I care about the details — clean layouts, smooth interactions, and interfaces that hold up across every screen size.",
  },
];

export const About = () => {
  const [ref, inView] = useReveal();

  return (
    <section
      ref={ref}
      className={`${styles.container} reveal ${inView ? "in-view" : ""}`}
      id="about"
    >
      <span className={styles.eyebrow}>01 — About</span>
      <h2 className={styles.title}>About Me</h2>
      <div className={styles.content}>
        <img
          src={getImageUrl("about/pngwing.com (2).png")}
          alt="Me sitting with a laptop"
          className={styles.aboutImage}
          loading="eager"
          decoding="async"
        />
        <ul className={styles.aboutItems}>
          {aboutItems.map((item) => (
            <li key={item.title} className={styles.aboutItem}>
              <img
                src={getImageUrl(item.icon)}
                alt={item.alt}
                width="44"
                height="44"
                loading="eager"
              />
              <div className={styles.aboutItemText}>
                <h3>{item.title}</h3>
                <p>{item.description}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};