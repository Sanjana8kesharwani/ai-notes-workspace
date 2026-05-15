const generateSummary = async (
  content
) => {
  return `
Summary:
${content.slice(0, 120)}...

Action Items:
• Review the note
• Complete pending tasks
• Organize related ideas

Suggested Title:
Smart Notes Overview
`;
};

module.exports = {
  generateSummary,
};