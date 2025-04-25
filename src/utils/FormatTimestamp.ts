/**
 * Timestamp to date time formater
 * @param seconds
 * @param nanoseconds
 * @returns Date format with browser time zone
 */
const formatTimestamp = (seconds: number, nanoseconds: number): string => {
  // Convert to milliseconds
  const milliseconds = seconds * 1000 + Math.floor(nanoseconds / 1e6);

  // Create Date Object
  const date = new Date(milliseconds);

  // Format options
  const options: Intl.DateTimeFormatOptions = {
    day: "numeric",
    month: "long",
    year: "numeric",
    hour: "numeric",
    minute: "2-digit",
    second: "2-digit",
    hour12: true,
  };

  // Browser time zone format
  return new Intl.DateTimeFormat("es-ES", options).format(date);
};

export default formatTimestamp;
