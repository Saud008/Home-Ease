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
            // Create booking with pending status
            const result = await client.query(
                `INSERT INTO bookings (
                    user_id,
                    service_type,
                    status,
                    scheduled_time,
                    base_price,
                    total_cost,
                    payment_status
                ) VALUES (
                    $1, $2, 'pending', $3, $4, NULL, 'pending'
                ) RETURNING booking_id`,
                [
                    booking.user_id,
                    booking.service_type,
                    booking.scheduled_time,
                    booking.base_price
                ]
            );

            return NextResponse.json({
                message: 'Booking created successfully',
                bookingId: result.rows[0].booking_id
            });

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