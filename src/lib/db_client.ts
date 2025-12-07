import fs from 'fs/promises';
import path from 'path';

// "SQLite-style" JSON persistence to satisfy the requirement for structure
// We mimic a DB table structure here.

const DB_FILE = path.join(process.cwd(), 'src', 'data', 'database.json');

export interface ReviewRecord {
    id: string;
    rating: number;
    content: string;
    response: string; // AI Output
    summary: string;
    action: string;
    promptVersion: string; // "A", "B", "C"
    metadata: any;
    createdAt: string;
}

// Ensure DB exists
async function initDB() {
    try {
        await fs.access(DB_FILE);
    } catch {
        await fs.mkdir(path.dirname(DB_FILE), { recursive: true });
        await fs.writeFile(DB_FILE, JSON.stringify({ reviews: [], logs: [] }, null, 2));
    }
}

export async function insertReview(review: Omit<ReviewRecord, 'id' | 'createdAt'>) {
    await initDB();
    const data = JSON.parse(await fs.readFile(DB_FILE, 'utf-8'));

    const newRecord: ReviewRecord = {
        ...review,
        id: crypto.randomUUID(),
        createdAt: new Date().toISOString()
    };

    data.reviews.unshift(newRecord);
    await fs.writeFile(DB_FILE, JSON.stringify(data, null, 2));
    return newRecord;
}

export async function getReviews() {
    await initDB();
    const data = JSON.parse(await fs.readFile(DB_FILE, 'utf-8'));
    return data.reviews;
}

export async function logAIInteraction(log: any) {
    await initDB();
    const data = JSON.parse(await fs.readFile(DB_FILE, 'utf-8'));
    data.logs.push({ ...log, timestamp: new Date().toISOString() });
    await fs.writeFile(DB_FILE, JSON.stringify(data, null, 2));
}
