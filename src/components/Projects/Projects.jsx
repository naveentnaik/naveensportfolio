import React from "react";

import styles from "./Projects.module.css";

import projects from "../../data/projects.json";
import { ProjectCard } from "./ProjectCard";
import { useReveal } from "../../hooks/useReveal";

export const Projects = () => {
  const [ref, inView] = useReveal();

  return (
    <section
      ref={ref}
      className={`${styles.container} reveal ${inView ? "in-view" : ""}`}
      id="projects"
    >
      <span className={styles.eyebrow}>03 — Projects</span>
      <h2 className={styles.title}>Projects</h2>
      <div className={styles.projects}>
        {projects.map((project, id) => {
          return <ProjectCard key={id} project={project} />;
        })}
      </div>
    </section>
  );
};