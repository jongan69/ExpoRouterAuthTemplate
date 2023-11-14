import { Redirect, Stack } from 'expo-router';
import { Text } from '../../components/Themed';

import { useSession } from '../../auth/ctx';
import { Platform } from 'react-native';
import React from 'react';

export default function AppLayout() {
    if (Platform.OS === 'web') {
        alert('You are not authenticated.')
        return <Redirect href="/" />;
    }

    const { session, isLoading }: any = useSession();

    // You can keep the splash screen open, or render a loading screen like we do here.
    if (isLoading) {
        return <Text>Loading...</Text>;
    }

    // Only require authentication within the (app) group's layout as users
    // need to be able to access the (auth) group and sign in again.
    if (!session) {
        // On web, static rendering will stop here as the user is not authenticated
        // in the headless Node process that the pages are rendered in.
        return <Redirect href="/sign-in" />;
    }

    // This layout can be deferred because it's not the root layout.
    return (
        <Stack>
            <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
            <Stack.Screen name="modal" options={{ presentation: 'modal' }} />
        </Stack>
    );
}