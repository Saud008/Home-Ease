import { NextResponse } from 'next/server';
import { Pool } from 'pg';

const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
});

export async function GET(request, { params }) {
    const { uid } = await params; // Firebase UID from the URL

    if (!uid) {
        return NextResponse.json(
            { error: 'User ID is required' },
            { status: 400 }
        );
    }

    try {
        const client = await pool.connect();
        try {
            // First get the database user ID from Firebase UID
            const userResult = await client.query(
                'SELECT id FROM users WHERE firebase_uid = $1',
                [uid]
            );

            if (userResult.rows.length === 0) {
                return NextResponse.json(
                    { error: 'User not found' },
                    { status: 404 }
                );
            }

            const userId = userResult.rows[0].id;

            // Then fetch addresses for this user
            const addressResult = await client.query(
                `SELECT 
                    id,
                    street_address,
                    city,
                    state,
                    postal_code,
                    country,
                    is_primary
                FROM user_addresses 
                WHERE user_id = $1 
                ORDER BY is_primary DESC, created_at DESC`,
                [userId]
            );
            
            return NextResponse.json(addressResult.rows);

        } finally {
            client.release();
        }
    } catch (error) {
        console.error('Error fetching user addresses:', error);
        return NextResponse.json(
            { error: 'Failed to fetch addresses' },
            { status: 500 }
        );
    }
} 