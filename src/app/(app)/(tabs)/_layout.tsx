import { useColorScheme } from 'react-native';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { Link, Tabs, useLocalSearchParams } from 'expo-router';
import { Pressable } from 'react-native';
import Colors from '../../../constants/Colors';
import * as appData from '../../../../app.json'
import { Text, View } from '../../../components/Themed';
import { StyleSheet } from 'react-native';

export const unstable_settings = {
  // Ensure that reloading on `/modal` keeps a back button present.
  initialRouteName: '(app)',
};

export default function AppLayout() {
  const colorScheme = useColorScheme();
  const params = useLocalSearchParams();

  function TabBarIcon(props: {
    name: React.ComponentProps<typeof FontAwesome>['name'];
    color: string;
  }) {
    return <FontAwesome size={28} style={{ marginBottom: -3 }} {...props} />;
  }

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: appData.expo.name ?? params.name,
          headerTitle: () => (
            <>
              <Text style={styles.title}>
                Home
              </Text>
              <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />
            </>),
          tabBarIcon: ({ color }) => <TabBarIcon name="code" color={color} />,
          headerRight: () => (
            <Link href="/modal" asChild>
              <Pressable>
                {({ pressed }) => (
                  <FontAwesome
                    name="info-circle"
                    size={25}
                    color={Colors[colorScheme ?? 'dark'].tint}
                    style={{ marginRight: 15, opacity: pressed ? 0.5 : 1 }}
                  />
                )}
              </Pressable>
            </Link>
          ),
        }}
      />
      <Tabs.Screen
        name="settings"
        options={{
          title: 'Settings',
          headerTitle: ({ children }) => (
            <>
              <Text style={styles.title}>
                {children}
              </Text>
              <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />
            </>),
          tabBarIcon: ({ color }) => <TabBarIcon name="code" color={color} />,
        }}
      />
    </Tabs>
  );
}

const styles = StyleSheet.create({
  title: {
    color: 'white',
    fontSize: 20,
  },
  separator: {
    marginVertical: 1,
    height: 1,
    width: '100%',
  },
});