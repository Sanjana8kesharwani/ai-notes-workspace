const generateSummary = async (content) => {
  return `
Summary:
${content.substring(0, 120)}

Action Items:
- Review the implementation
- Complete pending tasks
- Improve documentation

Suggested Title:
AI Generated Smart Notes
`;
};

module.exports = {
  generateSummary,
};