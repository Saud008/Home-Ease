import { NextResponse } from 'next/server';
import { Pool } from 'pg';

const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
});

export async function GET(request) {
    const searchParams = request.nextUrl.searchParams;
    const userId = searchParams.get('userId');

    if (!userId) {
        return NextResponse.json(
            { error: 'User ID is required' },
            { status: 400 }
        );
    }

    try {
        const client = await pool.connect();
        try {
            const result = await client.query(
                'SELECT * FROM user_addresses WHERE user_id = $1 ORDER BY is_primary DESC, created_at DESC',
                [userId]
            );
            
            return NextResponse.json(result.rows);
        } finally {
            client.release();
        }
    } catch (error) {
        console.error('Error fetching addresses:', error);
        return NextResponse.json(
            { error: 'Failed to fetch addresses' },
            { status: 500 }
        );
    }
}

export async function POST(request) {
    try {
        const address = await request.json();
        
        if (!address.user_id) {
            return NextResponse.json(
                { error: 'User ID is required' },
                { status: 400 }
            );
        }

        const client = await pool.connect();
        try {
            await client.query('BEGIN');

            // If this is set as primary, unset ALL existing primary addresses for this user
            if (address.is_primary) {
                await client.query(
                    'UPDATE user_addresses SET is_primary = false WHERE user_id = $1',
                    [address.user_id]
                );
            }

            // Insert new address
            const result = await client.query(
                `INSERT INTO user_addresses (
                    id,
                    user_id,
                    street_address,
                    city,
                    state,
                    postal_code,
                    country,
                    is_primary,
                    created_at
                ) VALUES (
                    uuid_generate_v4(),
                    $1, $2, $3, $4, $5, $6, $7, CURRENT_TIMESTAMP
                ) RETURNING *`,
                [
                    address.user_id,
                    address.street_address,
                    address.city,
                    address.state,
                    address.postal_code,
                    address.country || 'India',
                    address.is_primary
                ]
            );

            // Verify the update was successful
            if (address.is_primary) {
                const verifyResult = await client.query(
                    'SELECT COUNT(*) as primary_count FROM user_addresses WHERE user_id = $1 AND is_primary = true',
                    [address.user_id]
                );
                
                if (verifyResult.rows[0].primary_count > 1) {
                    // If there's more than one primary address, rollback
                    await client.query('ROLLBACK');
                    throw new Error('Multiple primary addresses detected');
                }
            }

            await client.query('COMMIT');
            return NextResponse.json(result.rows[0]);

        } catch (error) {
            await client.query('ROLLBACK');
            throw error;
        } finally {
            client.release();
        }

    } catch (error) {
        console.error('Error creating address:', error);
        return NextResponse.json(
            { error: error.message || 'Failed to create address' },
            { status: 500 }
        );
    }
} 