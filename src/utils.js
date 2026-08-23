export const getImageUrl = (path) => {
    return new URL(`/assets/${path}`, import.meta.url).href;
  };

export const formatDateRange = (startDate, endDate) => {
  const start = new Date(startDate);
  const end = endDate ? new Date(endDate) : new Date();

  const startLabel = start.toLocaleDateString("en-US", {
    month: "short",
    year: "numeric",
  });
  const endLabel = endDate
    ? end.toLocaleDateString("en-US", { month: "short", year: "numeric" })
    : "Present";

  const totalMonths = Math.max(
    1,
    (end.getFullYear() - start.getFullYear()) * 12 +
      (end.getMonth() - start.getMonth())
  );
  const years = Math.floor(totalMonths / 12);
  const months = totalMonths % 12;

  const duration = [
    years > 0 ? `${years} yr${years > 1 ? "s" : ""}` : null,
    months > 0 ? `${months} mo${months > 1 ? "s" : ""}` : null,
  ]
    .filter(Boolean)
    .join(" ");

  return { period: `${startLabel} — ${endLabel}`, duration };
};