import { NextResponse } from 'next/server';
import { Pool } from 'pg';

const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
});

export async function GET(request, { params }) {
    try {
        const { uid } = await params; // This is the firebase_uid from the URL
        
        const client = await pool.connect();
        try {
            // Query to get the database UUID using firebase_uid
            const result = await client.query(
                'SELECT id FROM users WHERE firebase_uid = $1',
                [uid]
            );

            if (result.rows.length === 0) {
                return NextResponse.json(
                    { error: 'User not found' },
                    { status: 404 }
                );
            }

            return NextResponse.json(result.rows[0]);

        } finally {
            client.release();
        }

    } catch (error) {
        console.error('Error fetching user:', error);
        return NextResponse.json(
            { error: 'Failed to fetch user data' },
            { status: 500 }
        );
    }
} 