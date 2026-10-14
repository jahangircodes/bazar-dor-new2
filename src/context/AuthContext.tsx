'use client';

import React, {
    createContext,
    useContext,
    useEffect,
    useState,
} from 'react';
import toast from 'react-hot-toast';

interface User {
    name: string;
    email: string;
}

interface AuthContextType {
    user: User | null;
    loading: boolean;
    login: (name: string, email: string) => void;
    logout: () => void;
    updateProfile: (name: string) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({
    children,
}: {
    children: React.ReactNode;
}) {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        try {
            const savedUser = localStorage.getItem('bazardor_user');

            if (savedUser) {
                // eslint-disable-next-line react-hooks/set-state-in-effect
                setUser(JSON.parse(savedUser) as User);
            }
        } catch {
            localStorage.removeItem('bazardor_user');
            setUser(null);
        } finally {

            setLoading(false);
        }
    }, []);

    const login = (name: string, email: string) => {
        const userData: User = { name, email };

        setUser(userData);
        localStorage.setItem(
            'bazardor_user',
            JSON.stringify(userData)
        );

        toast.success(`স্বাগতম, ${name}! সফলভাবে সাইন ইন হয়েছে।`);
    };

    const logout = () => {
        setUser(null);
        localStorage.removeItem('bazardor_user');
        toast.success('সফলভাবে সাইন আউট করা হয়েছে।');
    };

    const updateProfile = (newName: string) => {
        if (user) {
            const updated = { ...user, name: newName };

            setUser(updated);
            localStorage.setItem(
                'bazardor_user',
                JSON.stringify(updated)
            );

            toast.success('প্রোফাইল তথ্য সফলভাবে আপডেট করা হয়েছে!');
        }
    };

    return (
        <AuthContext.Provider
            value={{ user, loading, login, logout, updateProfile }}
        >
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    const context = useContext(AuthContext);

    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }

    return context;
}