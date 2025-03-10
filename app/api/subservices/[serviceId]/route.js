import { connectDB } from '@/lib/mongodb';
import SubService from '@/models/SubService'; // Assuming you have a SubService model
import { NextResponse } from 'next/server';

export async function GET(req, { params }) {
    const { serviceId } = params; // Get the service ID from the URL parameters

    try {
        await connectDB();

        // Fetch sub-services based on the service ID
        const subServices = await SubService.find({ service: serviceId }).lean();

        return NextResponse.json(subServices);
    } catch (error) {
        console.error('Error fetching sub-services:', error);
        return NextResponse.json(
            { error: 'Failed to fetch sub-services: ' + error.message },
            { status: 500 }
        );
    }
}
