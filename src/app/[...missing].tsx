import { Link, Stack } from 'expo-router';
import { StyleSheet } from 'react-native';

import { Text, View } from '../components/Themed';
import { useSession } from '../auth/ctx';
import { Platform } from 'react-native';
import React from 'react';

export default function NotFoundScreen() {
  if (Platform.OS === 'web') {
    return (
      <>
        <Stack.Screen options={{ title: 'Oops!' }} />
        <View style={styles.container}>
          <Text style={styles.title}>This page doesn't exist.</Text>
          <Link href={'/'} style={styles.link}>
            <Text style={styles.linkText}>Go to home</Text>
          </Link>
        </View>
      </>
    );
  } else {
    const { session }: any = useSession();
    return (
      <>
        <Stack.Screen options={{ title: 'Oops!' }} />
        <View style={styles.container}>
          <Text style={styles.title}>This screen doesn't exist.</Text>
          <Link href={session ? '/' : '/sign-in'} style={styles.link}>
            <Text style={styles.linkText}>Go to home screen!</Text>
          </Link>
        </View>
      </>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  link: {
    marginTop: 15,
    paddingVertical: 15,
  },
  linkText: {
    fontSize: 14,
    color: '#2e78b7',
  },
});
