import { getDB } from '../src/lib/sqlite';

const SAMPLE_REVIEWS = [
    { rating: 5, content: "Absolutely streamlined experience. The UI is gorgeous.", promptVersion: 'A' },
    { rating: 2, content: "Navigation is confusing and I lost my data.", promptVersion: 'A' },
    { rating: 4, content: "Good but needs dark mode toggle.", promptVersion: 'B' },
    { rating: 1, content: "Crash on startup. Unusable.", promptVersion: 'A' },
    { rating: 5, content: "Impressive speed and responsiveness.", promptVersion: 'C' }
];

async function seed() {
    console.log("Seeding database...");
    const db = await getDB();

    // Clear existing for demo purity if needed, but let's just append
    // await db.exec("DELETE FROM reviews"); 

    for (const r of SAMPLE_REVIEWS) {
        const id = crypto.randomUUID();
        const meta = JSON.stringify({ source: 'seed' });
        const created = new Date().toISOString();
        const summary = "Synthentic Data";
        const action = "Review Seed Data";
        const response = "Automated Response";

        await db.run(
            `INSERT INTO reviews (id, rating, content, response, summary, action, promptVersion, metadata, createdAt)
         VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
            id, r.rating, r.content, response, summary, action, r.promptVersion, meta, created
        );
    }

    console.log(`✅ Seeded ${SAMPLE_REVIEWS.length} reviews.`);
}

seed().catch(console.error);
