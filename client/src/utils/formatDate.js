/**
 * Format a date for display.
 * Example: November 21, 2026
 */
export const formatDate = (date) => {
  if (!date) return "Not available";

  const parsedDate = new Date(date);

  if (Number.isNaN(parsedDate.getTime())) {
    return "Invalid date";
  }

  return new Intl.DateTimeFormat("en-ET", {
    year: "numeric",
    month: "long",
    day: "numeric",
  }).format(parsedDate);
};

/**
 * Format a date with time.
 * Example: November 21, 2026, 10:30 AM
 */
export const formatDateTime = (date) => {
  if (!date) return "Not available";

  const parsedDate = new Date(date);

  if (Number.isNaN(parsedDate.getTime())) {
    return "Invalid date";
  }

  return new Intl.DateTimeFormat("en-ET", {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  }).format(parsedDate);
};

/**
 * Check whether a deadline has passed.
 * Supports date-only values such as 2026-12-30.
 */
export const isDateExpired = (date) => {
  if (!date) return false;

  const parsedDate = new Date(date);

  if (Number.isNaN(parsedDate.getTime())) {
    return false;
  }

  if (/^\d{4}-\d{2}-\d{2}$/.test(date)) {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    return parsedDate < today;
  }

  return parsedDate < new Date();
};

/**
 * Show relative time.
 * Example: 2 days ago
 */
export const timeAgo = (date) => {
  if (!date) return "Unknown time";

  const parsedDate = new Date(date);

  if (Number.isNaN(parsedDate.getTime())) {
    return "Invalid date";
  }

  const seconds = Math.floor((Date.now() - parsedDate.getTime()) / 1000);

  const intervals = [
    { label: "year", seconds: 31536000 },
    { label: "month", seconds: 2592000 },
    { label: "week", seconds: 604800 },
    { label: "day", seconds: 86400 },
    { label: "hour", seconds: 3600 },
    { label: "minute", seconds: 60 },
  ];

  if (Math.abs(seconds) < 60) {
    return "Just now";
  }

  for (const interval of intervals) {
    const count = Math.floor(Math.abs(seconds) / interval.seconds);

    if (count >= 1) {
      const value = `${count} ${interval.label}${count > 1 ? "s" : ""}`;

      return seconds >= 0 ? `${value} ago` : `In ${value}`;
    }
  }

  return "Just now";
};
