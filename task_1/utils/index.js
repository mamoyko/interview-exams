export const formatName = (author) => {
  const middle = author.middleInitial ? `${author.middleInitial.charAt(0)}.` : "";
  return `${author.firstName} ${middle} ${author.lastName}`.trim();
};
