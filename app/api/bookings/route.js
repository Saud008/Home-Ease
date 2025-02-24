import { NextResponse } from 'next/server';
import { Pool } from 'pg';

const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
});

export async function POST(request) {
    try {
        const booking = await request.json();
        
        const client = await pool.connect();
        try {
            await client.query('BEGIN');

            // Insert into bookings table
            const bookingResult = await client.query(
                `INSERT INTO bookings (
                    booking_id, 
                    user_id,
                    service_type,
                    status,
                    scheduled_time,
                    total_cost,
                    payment_status,
                    special_instructions,
                    created_at
                ) VALUES (
                    uuid_generate_v4(),
                    $1,
                    $2,
                    'NEW',
                    $3,
                    $4,
                    'UNPAID',
                    $5,
                    CURRENT_TIMESTAMP
                ) RETURNING booking_id`,
                [
                    booking.user_id,
                    booking.service_type,
                    booking.scheduled_time,
                    booking.total_cost,
                    booking.special_instructions
                ]
            );

            const bookingId = bookingResult.rows[0].booking_id;

            // Insert into payments table
            await client.query(
                `INSERT INTO payments (
                    payment_id,
                    booking_id,
                    user_id,
                    amount,
                    payment_method,
                    payment_status,
                    created_at
                ) VALUES (
                    uuid_generate_v4(),
                    $1,
                    $2,
                    $3,
                    $4,
                    'UNPAID',
                    CURRENT_TIMESTAMP
                )`,
                [
                    bookingId,
                    booking.user_id,
                    booking.total_cost,
                    booking.payment_method
                ]
            );

            await client.query('COMMIT');
            
            return NextResponse.json({ 
                message: 'Booking created successfully',
                bookingId 
            });

        } catch (error) {
            await client.query('ROLLBACK');
            throw error;
        } finally {
            client.release();
        }

    } catch (error) {
        console.error('Error creating booking:', error);
        return NextResponse.json(
            { error: 'Failed to create booking' },
            { status: 500 }
        );
    }
} 