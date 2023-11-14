import { View, Text } from 'react-native';
import { Stack, useLocalSearchParams, useRouter } from 'expo-router';
import React from 'react';

export default function Details() {
  const router = useRouter();
  const params: any = useLocalSearchParams();

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Stack.Screen
        options={{
          title: params.name ?? 'Params',
        }}
      />
      <Text
        onPress={() => {
          router.setParams({ name: 'Params Updated' });
        }}>
        Update the title
      </Text>
    </View>
  );
}
