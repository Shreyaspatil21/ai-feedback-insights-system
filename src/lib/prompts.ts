
// PROMPT VARIATIONS
export const PROMPTS = {
    A: `Analyze the following customer review. Return JSON with summary (max 5 words), response (polite), and action (team recommendation). Review: "{REVIEW}" Rating: {RATING}/5.`,

    B: `You are an expert Customer Experience Manager. 
    Task: Analyze this review to improve our NPS score.
    Context: User rated us {RATING}/5.
    Review: "{REVIEW}"
    
    Output JSON:
    - summary: Short punchy title.
    - response: Empathetic, professional reply.
    - action: Specific operational step to take.`,

    C: `JSON Output Only.
    Schema: { summary: string, response: string, action: string }
    
    Input:
    Review: "{REVIEW}" (Rating: {RATING})
    
    Rules:
    - Summary must be < 5 words.
    - Action must be actionable.`
};

export function getPrompt(version: 'A' | 'B' | 'C', rating: number, review: string) {
    const template = PROMPTS[version];
    return template.replace("{REVIEW}", review).replace("{RATING}", rating.toString());
}
