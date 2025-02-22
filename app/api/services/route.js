import { NextResponse } from 'next/server';
import clientPromise from '@/utils/mongodb';

export async function GET() {
    try {
        const client = await clientPromise;
        const db = client.db("homeease");
        
        const services = await db.collection("services")
            .find({})
            .toArray();

        console.log('API Response:', services);

        return NextResponse.json(services);
    } catch (error) {
        console.error('Database Error:', error);
        return NextResponse.json(
            { error: 'Failed to fetch services' },
            { status: 500 }
        );
    }
} 