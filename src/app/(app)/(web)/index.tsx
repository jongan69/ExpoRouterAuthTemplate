import { StyleSheet } from 'react-native';

import ContentCard from '../../../components/ContentCard';
import { Text, View } from '../../../components/Themed';
import { useSession } from '../../../auth/ctx';
import { usePathname, useSegments } from 'expo-router';
import React from 'react';

export default function WebRoot() {
  const { signOut }: any = useSession();
  const pathname = usePathname();
  const segments = useSegments();
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Home</Text>
      <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />
      <ContentCard
        header={'App'}
        highlight={`You are at ${pathname}`}
        subtitle={`Which is ${segments}`}
        link={'Test'}
      />
      <Text
        onPress={() => {
          // The `app/(app)/_layout.tsx` will redirect to the sign-in screen.
          signOut();
        }}>
        Sign Out
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
});