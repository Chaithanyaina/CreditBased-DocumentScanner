const Document = require("../models/Document");

// Basic Levenshtein implementation
const levenshteinDistance = (a, b) => {
  const matrix = [];
  for (let i = 0; i <= b.length; i++) matrix[i] = [i];
  for (let j = 0; j <= a.length; j++) matrix[0][j] = j;

  for (let i = 1; i <= b.length; i++) {
    for (let j = 1; j <= a.length; j++) {
      const cost = a[j-1] === b[i-1] ? 0 : 1;
      matrix[i][j] = Math.min(
        matrix[i-1][j] + 1,
        matrix[i][j-1] + 1,
        matrix[i-1][j-1] + cost
      );
    }
  }
  return matrix[b.length][a.length];
};

exports.textMatching = async (content) => {
  const documents = await Document.find();
  const matches = documents.filter((doc) => {
    const distance = levenshteinDistance(content, doc.content);
    const maxLength = Math.max(content.length, doc.content.length);
    return (1 - distance/maxLength) > 0.7;
  });
  return matches;
};