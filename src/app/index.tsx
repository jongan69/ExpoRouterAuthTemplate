import { Link, Stack } from "expo-router";
import { View, Text } from "../components/Themed";
import { Platform } from "react-native";

export default function Home() {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Stack.Screen
        options={{
          // https://reactnavigation.org/docs/headers#setting-the-header-title
          title: 'Landing Page',
          // https://reactnavigation.org/docs/headers#adjusting-header-styles
          headerStyle: { backgroundColor: '#f4511e' },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
          // https://reactnavigation.org/docs/headers#replacing-the-title-with-a-custom-component
          headerTitle: 'Landing',
        }}
      />
      <Text>Welcome!</Text>
      <Link href={{ pathname: 'sign-in', params: { source: Platform.OS } }}>Get Started</Link>
    </View>
  );
}