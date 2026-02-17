import React, { createContext, useState, useContext } from 'react';
import type { ReactNode } from 'react';

interface UserProfile {
    name: string;
    city: string;
    email?: string;
    phone?: string;
}

interface UserContextType {
    user: UserProfile | null;
    setUser: (user: UserProfile) => void;
    logout: () => void;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [user, setUserState] = useState<UserProfile | null>(() => {
        const savedName = localStorage.getItem('userName');
        const savedCity = localStorage.getItem('userCity');
        const savedEmail = localStorage.getItem('userEmail');
        const savedPhone = localStorage.getItem('userPhone');

        return savedName && savedCity ? {
            name: savedName,
            city: savedCity,
            email: savedEmail || '',
            phone: savedPhone || ''
        } : null;
    });

    const setUser = (newUser: UserProfile) => {
        setUserState(newUser);
        localStorage.setItem('userName', newUser.name);
        localStorage.setItem('userCity', newUser.city);
        if (newUser.email) localStorage.setItem('userEmail', newUser.email);
        if (newUser.phone) localStorage.setItem('userPhone', newUser.phone);
    };

    const logout = () => {
        setUserState(null);
        localStorage.removeItem('userName');
        localStorage.removeItem('userCity');
        localStorage.removeItem('userEmail');
        localStorage.removeItem('userPhone');
    };

    return (
        <UserContext.Provider value={{ user, setUser, logout }}>
            {children}
        </UserContext.Provider>
    );
};

export const useUser = () => {
    const context = useContext(UserContext);
    if (context === undefined) {
        throw new Error('useUser must be used within a UserProvider');
    }
    return context;
};
