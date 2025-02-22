// This file will be used only by API routes
import pool from '../lib/db';

export async function createOrUpdateUser(firebaseUser) {
    const client = await pool.connect();
    
    try {
        await client.query('BEGIN');

        // Check if user exists
        const userResult = await client.query(
            'SELECT id FROM users WHERE firebase_uid = $1',
            [firebaseUser.uid]
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
                    firebaseUser.uid,
                    firebaseUser.displayName,
                    firebaseUser.email
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
                [firebaseUser.displayName, firebaseUser.email, userId]
            );
        }

        // Handle phone number if provided
        if (firebaseUser.phoneNumber) {
            await client.query(
                `INSERT INTO user_phones (
                    user_id, 
                    phone_type, 
                    phone_number, 
                    is_primary,
                    verified
                ) VALUES ($1, $2, $3, $4, $5)
                ON CONFLICT (user_id, phone_number) 
                DO UPDATE SET verified = EXCLUDED.verified`,
                [userId, 'mobile', firebaseUser.phoneNumber, true, true]
            );
        }

        // Create session
        await client.query(
            `INSERT INTO user_sessions (
                user_id, 
                device_info, 
                last_active
            ) VALUES ($1, $2, CURRENT_TIMESTAMP)`,
            [userId, { userAgent: firebaseUser.userAgent || 'web' }]
        );

        await client.query('COMMIT');
        return userId;

    } catch (error) {
        await client.query('ROLLBACK');
        console.error('Error in createOrUpdateUser:', error);
        throw error;
    } finally {
        client.release();
    }
}
 