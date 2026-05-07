export interface ReflectionContext {
    dominantPrimaryEmotion?: string;
    secondaryEmotions: string[];
    severityLevel: "low" | "medium" | "high";
  }
  
  export function buildReflectionContext(entries: any[]): ReflectionContext | null {
    if (!entries?.length) return null;
  
    const emotionCount: Record<string, number> = {};
    const secondaryEmotions = new Set<string>();
    let severitySum = 0;
  
    for (const e of entries) {
      if (e.primary_emotion) {
        emotionCount[e.primary_emotion] =
          (emotionCount[e.primary_emotion] || 0) + 1;
      }
  
      if (Array.isArray(e.secondary_emotions)) {
        e.secondary_emotions.forEach((s: string) =>
          secondaryEmotions.add(s)
        );
      }
  
      if (typeof e.severity === "number") {
        severitySum += e.severity;
      }
    }
  
    const dominantPrimaryEmotion = Object.entries(emotionCount)
      .sort((a, b) => b[1] - a[1])[0]?.[0];
  
    const avgSeverity = severitySum / entries.length;
  
    return {
      dominantPrimaryEmotion,
      secondaryEmotions: Array.from(secondaryEmotions),
      severityLevel:
        avgSeverity >= 6 ? "high" : avgSeverity >= 3 ? "medium" : "low",
    };
  }
  