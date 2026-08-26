import React from "react";
import styles from "./Experience.module.css";
import experience from "../../data/experience.json";
import { formatDateRange } from "../../utils";
import { useReveal } from "../../hooks/useReveal";

export const Experience = () => {
  const [ref, inView] = useReveal();

  return (
    <section
      ref={ref}
      className={`${styles.container} reveal ${inView ? "in-view" : ""}`}
      id="experience"
    >
      <h2 className={styles.title}>Experience</h2>
      <ol className={styles.timeline}>
        {experience.map((job) => {
          const { period, duration } = formatDateRange(
            job.startDate,
            job.endDate
          );

          return (
            <li key={`${job.company}-${job.role}`} className={styles.item}>
              <span className={styles.marker} aria-hidden="true" />
              <div className={styles.card}>
                <div className={styles.cardHeader}>
                  <h3>{job.role}</h3>
                  <span className={styles.period}>
                    {period} · {duration}
                  </span>
                </div>
                <p className={styles.meta}>
                  {job.company} · {job.employment}
                </p>
                <p className={styles.location}>{job.location}</p>
              </div>
            </li>
          );
        })}
      </ol>
    </section>
  );
};
