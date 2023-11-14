import React from 'react';
import { useStorageState } from './useStorageState';

const WebAuthContext = React.createContext<{ signIn: () => void; signOut: () => void; session?: string | null, isLoading: boolean; magicProps: any; web3?: any; } | null>(null);

// This hook can be used to access the user info.
export function useWebSession() {
    const value = React.useContext(WebAuthContext);
    if (process.env.NODE_ENV !== 'production') {
        if (!value) {
            throw new Error('useSession must be wrapped in a <SessionProvider />');
        }
    }

    return value;
}

export function WebSessionProvider(props: React.PropsWithChildren) {
    const [[isLoading, session], setSession] = useStorageState('session');

    return (
        <WebAuthContext.Provider
            value={{
                signIn: async () => {
                    // Perform sign-in logic here
                    setSession('xxx');
                },
                signOut: () => {
                    setSession(null);
                },
                session,
                isLoading,
            }}>
            {props.children}
        </WebAuthContext.Provider>
    );
}
