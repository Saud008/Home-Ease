import { NextResponse } from 'next/server';
import pool from '@/app/lib/db';

export async function POST(request) {
    const client = await pool.connect();
    
    try {
        const userData = await request.json();
        await client.query('BEGIN');

        // Check if user exists
        const userResult = await client.query(
            'SELECT id FROM users WHERE firebase_uid = $1',
            [userData.uid]
        );

        let userId;

        if (userResult.rows.length === 0) {
            // Create new user
            const newUser = await client.query(
                `INSERT INTO users (
                    firebase_uid, 
                    name, 
                    email, 
                    created_at
                ) VALUES ($1, $2, $3, CURRENT_TIMESTAMP) 
                RETURNING id`,
                [
                    userData.uid,
                    userData.displayName,
                    userData.email
                ]
            );
            userId = newUser.rows[0].id;
        } else {
            // Update existing user
            userId = userResult.rows[0].id;
            await client.query(
                `UPDATE users 
                SET name = $1, 
                    email = $2, 
                    updated_at = CURRENT_TIMESTAMP,
                    last_login = CURRENT_TIMESTAMP
                WHERE id = $3`,
                [userData.displayName, userData.email, userId]
            );
        }

        await client.query('COMMIT');
        
        return NextResponse.json({ 
            success: true, 
            userId 
        });

    } catch (error) {
        await client.query('ROLLBACK');
        console.error('Auth API Error:', error);
        return NextResponse.json(
            { success: false, error: 'Internal Server Error' },
            { status: 500 }
        );
    } finally {
        client.release();
    }
}

export async function PUT(request) {
    const client = await pool.connect();
    
    try {
        const { userId, sessionId } = await request.json();
        
        await client.query(
            `UPDATE user_sessions 
            SET last_active = CURRENT_TIMESTAMP 
            WHERE user_id = $1 AND id = $2`,
            [userId, sessionId]
        );
        
        return NextResponse.json({ success: true });
    } catch (error) {
        console.error('Session update error:', error);
        return NextResponse.json(
            { success: false, error: 'Internal Server Error' },
            { status: 500 }
        );
    } finally {
        client.release();
    }
} 