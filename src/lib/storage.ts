import fs from 'fs/promises';
import path from 'path';

const DATA_FILE = path.join(process.cwd(), 'src', 'data', 'reviews.json');

export interface Review {
    id: string;
    rating: number;
    content: string;
    response: string;
    summary: string;
    action: string;
    date: string;
}

export async function getReviews(): Promise<Review[]> {
    try {
        const data = await fs.readFile(DATA_FILE, 'utf-8');
        return JSON.parse(data);
    } catch (error) {
        // If file doesn't exist, return empty array
        return [];
    }
}

export async function saveReview(review: Review) {
    const reviews = await getReviews();
    reviews.unshift(review); // Add to top
    // Ensure directory exists
    await fs.mkdir(path.dirname(DATA_FILE), { recursive: true });
    await fs.writeFile(DATA_FILE, JSON.stringify(reviews, null, 2));
    return review;
}
