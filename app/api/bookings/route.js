import { NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Booking from '@/models/Bookings';

export async function POST(request) {
    try {
        await connectDB();
        const bookingData = await request.json();

        const newBooking = await Booking.create(bookingData);
        
        return NextResponse.json({
            message: "Booking created successfully",
            booking: newBooking
        }, { status: 201 });

    } catch (error) {
        console.error('Booking creation error:', error);
        return NextResponse.json({
            message: "Error creating booking",
            error: error.message
        }, { status: 500 });
    }
}

export async function GET(request) {
    try {
        await connectDB();
        const { searchParams } = new URL(request.url);
        const userId = searchParams.get('userId');

        if (!userId) {
            return NextResponse.json({
                message: "User ID is required"
            }, { status: 400 });
        }

        const bookings = await Booking.find({ userId })
            .populate('serviceId')
            .populate('subServiceId')
            .sort({ createdAt: -1 });

        return NextResponse.json(bookings);

    } catch (error) {
        console.error('Booking fetch error:', error);
        return NextResponse.json({
            message: "Error fetching bookings",
            error: error.message
        }, { status: 500 });
    }
}
