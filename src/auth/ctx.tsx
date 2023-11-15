import React from 'react';
import { Platform } from 'react-native';
import { useStorageState } from './useStorageState';
import { router } from 'expo-router';

// WEB AUTH
const WebAuthContext = React.createContext<{ signIn: () => void; signOut: () => void; session?: string | null, isLoading: boolean } | null>(null);

// This hook can be used to access the user info.
export function useSession() {
    if (Platform.OS === 'web') {
        const value = React.useContext(WebAuthContext);
        if (process.env.NODE_ENV !== 'production') {
            if (!value) {
                throw new Error('useSession must be wrapped in a <SessionProvider />');
            }
        }
        return value;
        // } else {
        //     const value = React.useContext(AuthContext);
        //     if (process.env.NODE_ENV !== 'production') {
        //         if (!value) {
        //             throw new Error('useSession must be wrapped in a <SessionProvider />');
        //         }
        //     }
        //     return value;
        // }
    }
}

export function SessionProvider(props: React.PropsWithChildren) {
    const [[isLoading, session], setSession] = useStorageState('session');
    return (
        <WebAuthContext.Provider
            value={{
                signIn: () => {
                    // Perform sign-in logic here
                    setSession('xxx');
                },
                signOut: () => {
                    setSession(null);
                    router.replace('/')
                },
                session,
                isLoading,
            }}>
            {props.children}
        </WebAuthContext.Provider>
    );
}
