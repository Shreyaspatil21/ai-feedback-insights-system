import sqlite3 from 'sqlite3';
import { open } from 'sqlite';

let dbInstance: any = null;

export async function getDB() {
    if (dbInstance) return dbInstance;

    dbInstance = await open({
        filename: './database.sqlite',
        driver: sqlite3.Database
    });

    await dbInstance.exec(`
    CREATE TABLE IF NOT EXISTS reviews (
      id TEXT PRIMARY KEY,
      rating INTEGER,
      content TEXT,
      response TEXT,
      summary TEXT,
      action TEXT,
      promptVersion TEXT,
      metadata TEXT,
      createdAt TEXT
    );
    
    CREATE TABLE IF NOT EXISTS logs (
      id TEXT PRIMARY KEY,
      prompt TEXT,
      output TEXT,
      version TEXT,
      timestamp TEXT
    );
  `);

    return dbInstance;
}
