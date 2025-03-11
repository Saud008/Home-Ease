import { connectDB } from '@/lib/mongodb';
import Service from '@/models/Service';
import { NextResponse } from 'next/server';

export async function GET() {
    try {
        await connectDB();
        console.log("Connected to the database");

        // Fetch active services and select the necessary fields
        const services = await Service.find({ isActive: true })
            .select('title description slug type category') // Select only the required fields
            .lean();

        // Ensure the services are returned as an array
        return NextResponse.json(services);
    } catch (error) {
        console.error('Error details:', error);
        return NextResponse.json(
            { error: 'Failed to fetch services: ' + error.message },
            { status: 500 }
        );
    }
} 