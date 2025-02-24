import { connectDB } from '@/lib/mongodb';
import Service from '@/models/Service';
import { NextResponse } from 'next/server';

export async function GET() {
    try {
        await connectDB();
        
        const services = await Service.find({ isActive: true }).lean();
        
        // Transform the data to match the component's expectations
        const transformedServices = services.map(service => ({
            ...service,
            category: {
                name: service.category,
                icon: '🏠' // Default icon
            },
            type: {
                name: service.type
            }
        }));

        return NextResponse.json(transformedServices);
    } catch (error) {
        console.error('Error details:', error);
        return NextResponse.json(
            { error: 'Failed to fetch services: ' + error.message },
            { status: 500 }
        );
    }
} 