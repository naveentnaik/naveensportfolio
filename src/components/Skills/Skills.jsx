import React from "react";
import styles from "./Skills.module.css";
import skills from "../../data/skills.json";
import { getImageUrl } from "../../utils";
import { useReveal } from "../../hooks/useReveal";

export const Skills = () => {
  const [ref, inView] = useReveal();

  return (
    <section
      ref={ref}
      className={`${styles.container} reveal ${inView ? "in-view" : ""}`}
      id="skills"
    >
      <span className={styles.eyebrow}>02 — Skills</span>
      <h2 className={styles.title}>Skills</h2>
      <div className={styles.content}>
        <div className={styles.skills}>
          {skills.map((skill, id) => {
            return (
              <div key={id} className={styles.skill}>
                <div className={styles.skillImageContainer}>
                  <img src={getImageUrl(skill.imageSrc)} alt={skill.title} />
                </div>
                <p>{skill.title}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};