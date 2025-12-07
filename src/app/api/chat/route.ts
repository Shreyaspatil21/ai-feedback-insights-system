import { NextResponse } from 'next/server';
import { getDB } from '@/lib/sqlite';
import { analyzeReview } from '@/lib/gemini'; // Reuse the generation logic (we'll make a generic one)
// Actually we need a generic completion function, let's just import the internal logic if exported, 
// or simpler: create a new helper in this file for now to keep it isolated/clean
// But wait, gemini.ts handles the hybrid logic. Ideally we export a generic "generateText" function from there.

// Let's refactor gemini.ts slightly to export a generic generator or just copy the hybrid logic here for RAG 
// to ensure we use valid keys.
// A better "Senior" move is to DRY (Don't Repeat Yourself).
// I will assume I can modify gemini.ts to export `generateText`.

import { generateText } from '@/lib/gemini';

export async function POST(request: Request) {
    try {
        const { message } = await request.json();
        const db = await getDB();

        // 1. Retrieval (The "R" in RAG)
        // Get last 50 reviews to fit in context window
        const reviews = await db.all('SELECT rating, content, summary, createdAt FROM reviews ORDER BY createdAt DESC LIMIT 50');

        // 2. Augmentation (The "A" in RAG)
        const context = reviews.map((r: any) =>
            `[${r.rating}/5 stars]: "${r.content}" (Summary: ${r.summary})`
        ).join('\n');

        const prompt = `
      You are a Data Analyst Assistant. You have access to the following customer reviews:
      
      ${context}
      
      User Question: "${message}"
      
      Based ONLY on the data above, answer the user's question. 
      If you can't answer, say so. 
      Be concise, professional, and cite specific examples if useful.
    `;

        // 3. Generation (The "G" in RAG)
        const response = await generateText(prompt);

        return NextResponse.json({ reply: response });

    } catch (error) {
        console.error('Chat Error:', error);
        return NextResponse.json({ error: 'Failed to generate insight' }, { status: 500 });
    }
}
