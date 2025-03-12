import { NextResponse } from 'next/server';
import { connectDB } from '@/lib/mongodb';
import User from '@/models/User';

export async function PUT(request, { params }) {
  try {
    const email = decodeURIComponent(params.email);
    if (!email) {
      return NextResponse.json(
        { message: 'Email is required' },
        { status: 400 }
      );
    }

    await connectDB();
    const updateData = await request.json();
    
    // Remove sensitive fields from update
    const { email: userEmail, _id, createdAt, ...safeUpdateData } = updateData;
    
    const user = await User.findOneAndUpdate(
      { email },
      { 
        $set: {
          ...safeUpdateData,
          updatedAt: new Date()
        }
      },
      { 
        new: true // Return updated document
      }
    );
    
    if (!user) {
      return NextResponse.json(
        { message: 'Profile not found' },
        { status: 404 }
      );
    }
    
    return NextResponse.json(user);
    
  } catch (error) {
    console.error('Update profile error:', error);
    return NextResponse.json(
      { message: 'Failed to update profile' },
      { status: 500 }
    );
  }
}

export async function GET(request, { params }) {
  try {
    const email = decodeURIComponent(params.email);
    if (!email) {
      return NextResponse.json(
        { message: 'Email is required' },
        { status: 400 }
      );
    }
    
    await connectDB();
    
    const user = await User.findOne({ email });
    
    if (!user) {
      return NextResponse.json(
        { message: 'Profile not found' },
        { status: 404 }
      );
    }
    
    return NextResponse.json(user);
    
  } catch (error) {
    console.error('Get profile error:', error);
    return NextResponse.json(
      { message: 'Failed to fetch profile' },
      { status: 500 }
    );
  }
} 