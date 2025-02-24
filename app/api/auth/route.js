import { NextResponse } from 'next/server';
import { Pool } from 'pg';

const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
});

export async function POST(request) {
    try {
        const userData = await request.json();
        const client = await pool.connect();

        try {
            await client.query('BEGIN');

            // Check if user exists
            const userResult = await client.query(
                'SELECT id FROM users WHERE firebase_uid = $1',
                [userData.uid]
            );

            let userId;

            if (userResult.rows.length === 0) {
                // Insert new user
                const insertResult = await client.query(
                    `INSERT INTO users (
                        id,
                        firebase_uid,
                        name,
                        email,
                        profile_image_url,
                        created_at,
                        updated_at,
                        last_login,
                        is_active
                    ) VALUES (
                        uuid_generate_v4(),
                        $1,
                        $2,
                        $3,
                        $4,
                        CURRENT_TIMESTAMP,
                        CURRENT_TIMESTAMP,
                        CURRENT_TIMESTAMP,
                        true
                    ) RETURNING id`,
                    [
                        userData.uid,
                        userData.displayName,
                        userData.email,
                        userData.photoURL || null
                    ]
                );
                userId = insertResult.rows[0].id;
            } else {
                // Update existing user
                userId = userResult.rows[0].id;
                await client.query(
                    `UPDATE users 
                    SET 
                        name = $1,
                        email = $2,
                        profile_image_url = $3,
                        last_login = CURRENT_TIMESTAMP,
                        updated_at = CURRENT_TIMESTAMP
                    WHERE id = $4`,
                    [
                        userData.displayName,
                        userData.email,
                        userData.photoURL || null,
                        userId
                    ]
                );
            }

            // Insert or update user session
            await client.query(
                `INSERT INTO user_sessions (
                    id,
                    user_id,
                    device_info,
                    last_active,
                    created_at
                ) VALUES (
                    uuid_generate_v4(),
                    $1,
                    $2,
                    CURRENT_TIMESTAMP,
                    CURRENT_TIMESTAMP
                )`,
                [
                    userId,
                    userData
                ]
            );

            await client.query('COMMIT');

            return NextResponse.json({ 
                message: 'User data updated successfully',
                userId 
            });

        } catch (error) {
            await client.query('ROLLBACK');
            throw error;
        } finally {
            client.release();
        }

    } catch (error) {
        console.error('Error updating user data:', error);
        return NextResponse.json(
            { error: 'Failed to update user data' },
            { status: 500 }
        );
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