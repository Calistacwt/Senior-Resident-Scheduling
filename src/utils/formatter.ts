export const tailingSlash = (url: string) => url.replace(/\/$/, "");

// Format the date to DD/MM/YYYY

export const formatDate = (date: Date): string => {
  return new Intl.DateTimeFormat("en-GB", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  }).format(date);
};
