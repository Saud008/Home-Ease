import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import { connectDB } from '@/lib/mongodb';
import User from '@/models/User';

export async function GET() {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session?.user?.email) {
      return NextResponse.json(
        { message: 'Unauthorized' },
        { status: 401 }
      );
    }
    
    await connectDB();
    const email = session.user.email;
    
    // Find or create user profile
    let user = await User.findOne({ email });
    
    if (!user) {
      user = await User.create({
        email,
        displayName: session.user.name || '',
        photoURL: session.user.image || '',
        addresses: [],
        lastLogin: new Date()
      });
    }
    
    return NextResponse.json(user);
    
  } catch (error) {
    console.error('Get user error:', error);
    return NextResponse.json(
      { message: 'Failed to fetch user data' },
      { status: 500 }
    );
  }
}

export async function PUT(request) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session?.user?.email) {
      return NextResponse.json(
        { message: 'Unauthorized' },
        { status: 401 }
      );
    }

    await connectDB();
    const email = session.user.email;
    const updateData = await request.json();
    
    // Remove sensitive fields from update
    const { email: userEmail, _id, createdAt, ...safeUpdateData } = updateData;
    
    const user = await User.findOneAndUpdate(
      { email },
      { 
        $set: {
          ...safeUpdateData,
          lastLogin: new Date(),
          updatedAt: new Date()
        }
      },
      { 
        new: true, // equivalent to returnDocument: 'after'
        upsert: true 
      }
    );
    
    return NextResponse.json(user);
    
  } catch (error) {
    console.error('Update user error:', error);
    return NextResponse.json(
      { message: 'Failed to update user data' },
      { status: 500 }
    );
  }
}
