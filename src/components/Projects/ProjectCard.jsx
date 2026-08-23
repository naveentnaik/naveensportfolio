import React from "react";

import styles from "./ProjectCard.module.css";
import { getImageUrl } from "../../utils";

export const ProjectCard = ({
  project: { title, imageSrc, description, skills, demo, source },
}) => {
  const handleMouseMove = (e) => {
    const bounds = e.currentTarget.getBoundingClientRect();
    e.currentTarget.style.setProperty("--x", `${e.clientX - bounds.left}px`);
    e.currentTarget.style.setProperty("--y", `${e.clientY - bounds.top}px`);
  };

  return (
    <div className={styles.container} onMouseMove={handleMouseMove}>
      <div className={styles.spotlight} aria-hidden="true" />
      <img
        src={getImageUrl(imageSrc)}
        alt={`Image of ${title}`}
        className={styles.image}
      />
      <h3 className={styles.title}>{title}</h3>
      <p className={styles.description}>{description}</p>
      <ul className={styles.skills}>
        {skills.map((skill, id) => {
          return (
            <li key={id} className={styles.skill}>
              {skill}
            </li>
          );
        })}
      </ul>
      <div className={styles.links}>
        {demo && (
          <a
            href={demo}
            target="_blank"
            rel="noopener noreferrer"
            className={styles.link}
          >
            Demo
          </a>
        )}
        {source && (
          <a
            href={source}
            target="_blank"
            rel="noopener noreferrer"
            className={styles.linkOutline}
          >
            Source
          </a>
        )}
      </div>
    </div>
  );
};