export const trim = function sliceTo100Words(text) {
  const words = text.split(" "); // Split the text into words
  if (words.length <= 50) {
    return text; // If text has 100 words or less, return the original text
  }
  return words.slice(0, 70).join(" ") + "..."; // Slice to 100 words and add an ellipsis
};
