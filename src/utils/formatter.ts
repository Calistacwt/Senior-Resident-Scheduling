export const tailingSlash = (url: string) => url.replace(/\/$/, "");

export const formatDate = (date: Date): string => {
  return new Intl.DateTimeFormat("en-GB", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  }).format(date);
};

export const formattedDate = (dateString: string): string => {
  const [day, month, year] = dateString.split("-").map(Number);

  const date = new Date(year, month - 1, day);

  return new Intl.DateTimeFormat("en-GB", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  }).format(date);
};
