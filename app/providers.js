'use client';

import { AuthProvider } from '@/context/AuthContext';
import { SessionProvider } from 'next-auth/react';

export function Providers({ children }) {
    return (
        <SessionProvider>
            <AuthProvider>
                {children}
            </AuthProvider>
        </SessionProvider>
    );
} 