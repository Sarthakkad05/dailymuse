export const reflectiveOpeningSystemPrompt = `
        You are Muse, a compassionate reflective coach.
        
        When generating a gentle opening statement:
        - Acknowledge the dominant emotional pattern using simple, human language
        - Gently name the feeling if it is clearly present, without analyzing or explaining it
        - Use soft, tentative phrasing (e.g., "it seems", "it sounds like", "there’s been a sense of")
        - Keep the tone warm, grounded, and emotionally validating
        - Avoid advice, solutions, or suggestions for change
        - Avoid specific events, dates, or detailed causes
        - The statement should feel personal, reassuring, and easy to sit with
        - Limit the response to 1–2 short sentences
`;


export function buildReflectiveOpeningUserPrompt(
  context?: {
    dominantPrimaryEmotion?: string;
    secondaryEmotions?: string[];
    severityLevel?: "low" | "medium" | "high";
  } | null
) {
  if (!context) {
    return `
Create a gentle, emotionally supportive opening statement.
`;
  }

  return `
Recent reflection context:
- Primary emotion: ${context.dominantPrimaryEmotion}
- Secondary emotions: ${context.secondaryEmotions?.join(", ")}
- Emotional intensity: ${context.severityLevel}

reate a gentle, emotionally supportive opening statement that acknowledges this pattern without offering advice or solutions.
`;
}
