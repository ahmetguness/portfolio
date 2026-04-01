import { Client } from 'pg';
import pool from '../db';
import dotenv from 'dotenv';
dotenv.config({ quiet: true });

const initDB = async () => {
    let defaultClient;
    try {
        console.log("Checking if database exists...");
        
        // Connect to the default 'postgres' database to create our target database
        defaultClient = new Client({
            user: process.env.DB_USER,
            host: process.env.DB_HOST,
            database: 'postgres', // connect to the default db
            password: process.env.DB_PASSWORD || undefined,
            port: parseInt(process.env.DB_PORT || '5432', 10),
        });

        await defaultClient.connect();
        const targetDbName = process.env.DB_NAME || 'portfolio';
        
        const checkDbResult = await defaultClient.query(`SELECT 1 FROM pg_database WHERE datname = $1`, [targetDbName]);
        
        if (checkDbResult.rowCount === 0) {
            console.log(`Database "${targetDbName}" does not exist. Creating it now...`);
            await defaultClient.query(`CREATE DATABASE "${targetDbName}"`);
            console.log(`✅ Database "${targetDbName}" created successfully.`);
        } else {
            console.log(`✅ Database "${targetDbName}" already exists.`);
        }
    } catch (error) {
        console.error("❌ Error checking/creating database:", error);
        process.exit(1);
    } finally {
        if (defaultClient) await defaultClient.end();
    }

    // Now connect to our newly created (or existing) database and create tables
    try {
        console.log("Connecting to target database and initializing tables...");

        // Create Blogs table
        await pool.query(`
            CREATE TABLE IF NOT EXISTS blogs (
                id SERIAL PRIMARY KEY,
                title VARCHAR(255) NOT NULL,
                short_description TEXT,
                image_url TEXT,
                medium_url TEXT NOT NULL,
                published_at DATE,
                created_at TIMESTAMP DEFAULT NOW(),
                updated_at TIMESTAMP DEFAULT NOW()
            );
        `);
        console.log("✅ Blogs table is ready.");

        // Create Projects table
        await pool.query(`
            CREATE TABLE IF NOT EXISTS projects (
                id SERIAL PRIMARY KEY,
                title VARCHAR(255) NOT NULL,
                short_description TEXT,
                image_url TEXT,
                tech_tags TEXT[],
                github_url TEXT,
                live_url TEXT,
                featured BOOLEAN DEFAULT false,
                created_at TIMESTAMP DEFAULT NOW(),
                updated_at TIMESTAMP DEFAULT NOW()
            );
        `);
        console.log("✅ Projects table is ready.");

        // Create Settings table
        await pool.query(`
            CREATE TABLE IF NOT EXISTS settings (
                key VARCHAR(255) PRIMARY KEY,
                value TEXT
            );
        `);
        console.log("✅ Settings table is ready.");

        console.log("🎉 Database and tables initialization completed successfully!");
    } catch (error) {
        console.error("❌ Error initializing tables:", error);
    } finally {
        process.exit(0);
    }
};

initDB();
