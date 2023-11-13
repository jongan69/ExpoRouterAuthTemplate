import React from 'react';
import { useStorageState } from './useStorageState';

import 'text-encoding'

import { DeepLinkPage, Magic } from '@magic-sdk/react-native-expo';
import { OAuthExtension } from "@magic-ext/react-native-expo-oauth";
import Web3 from 'web3'
import { ENV, API_KEY } from '../resources/config/env';
import { BitcoinExtension } from "@magic-ext/bitcoin";
import { GDKMSExtension } from "@magic-ext/gdkms";
import { AuthExtension } from '@magic-ext/auth';

const AuthContext = React.createContext<{ signIn: (email: string) => void; signOut: () => void; session?: string | null, isLoading: boolean; magicProps: any; web3?: any; } | null>(null);

// This hook can be used to access the user info.
export function useSession() {
    const value = React.useContext(AuthContext);
    if (process.env.NODE_ENV !== 'production') {
        if (!value) {
            throw new Error('useSession must be wrapped in a <SessionProvider />');
        }
    }

    return value;
}

export function SessionProvider(props: React.PropsWithChildren) {
    const [[isLoading, session], setSession] = useStorageState('email');
    const [env, setEnv] = React.useState(ENV.PROD);

    const magic = new Magic(API_KEY[env], {
        extensions: [
            new OAuthExtension(),
            new AuthExtension(),
            new GDKMSExtension(),
            new BitcoinExtension({
                rpcUrl: 'BTC_RPC_NODE_URL',
                network: 'testnet' // testnet or mainnet
            })
        ],
    });

    const web3 = new Web3(magic.rpcProvider);

    const magicProps = {
        magic,
        web3,
        setEnv,
        env
    }

    /**
    * email otp sign in
    **/
    const loginEmailOTP = async (email: string) => {
        try {
            await magic.auth.loginWithEmailOTP({ email: email });
            const res = await magic.user.getInfo();
            alert(`Logged In as ${JSON.stringify(res.email)}`);
            return res;
        } catch (err) {
            console.log(err);
            return err
        }
    };

    /**
    * Google sign in
    **/
    const magicGoogleSignIn = async () => {
        const res = await magic.oauth.loginWithPopup({ provider: 'google', redirectURI: Linking.createURL('exp://') });
        alert(JSON.stringify(res));
    }

    /**
     * Apple sign in
     **/
    const magicAppleSignIn = async () => {
        const res = await magic.oauth.loginWithPopup({ provider: 'apple', redirectURI: Linking.createURL('exp://') });
        alert(JSON.stringify(res));
    }

    /**
    * sms sign in
    **/
    const smsLogin = async (phoneNumber: any) => {
        try {
            const DID = await magic.auth.loginWithSMS({
                phoneNumber: phoneNumber,
            })
            alert(`Your DID is: ${DID}`);
        } catch (err) {
            console.log(err);
        }
    };

    /**
     * Update SMS
     **/
    const updateSMS = async () => {
        try {
            await magic.auth.updatePhoneNumberWithUI();
        } catch (err) {
            console.log(err);
        }
    };


    /**
     * Recover Account
     */
    const recoverAccount = async (email: any) => {
        try {
            await magic.user.recoverAccount(email);
        } catch (err) {
            console.log(err);
        }
    };

    /**
     * Show Settings
     */
    const showSettings = async (page: any) => {
        try {
            await magic.user.showSettings({ page: DeepLinkPage.Recovery });
        } catch (err) {
            console.log(err);
        }
    };

    /** Magic Connect w/ UI  */
    const showMCUserInterface = async () => {
        try {
            const account = await magic.wallet.connectWithUI();
            alert(`Your Public address is: ${account[0]}`);
        } catch (err) {
            alert(err);
        }
    };


    /**
     * getInfo()
     * */
    const getInfo = async () => {
        const res = await magic.user.getInfo();
        alert(JSON.stringify(res));
    }
    const isLoggedIn = async () => {
        const res = await magic.user.isLoggedIn();
        if (res) return true
        else return false
    }

    const logout = async () => {
        const isLoggedOut = await magic.user.logout();
        alert(isLoggedOut);
    };

    return (
        <AuthContext.Provider
            value={{
                signIn: async (email: string) => {
                    // Perform sign-in logic here
                    let login: any = await loginEmailOTP(email);
                    let check: boolean = await isLoggedIn()
                    if (check) {
                        setSession(login.email);
                    } else {
                        alert(`Error Logging In ${login}`);
                        setSession(null);
                    }
                },
                signOut: () => {
                    logout();
                    setSession(null);
                },
                magicProps,
                session,
                isLoading,
            }}>
            <magic.Relayer />
            {props.children}
        </AuthContext.Provider>
    );
}
