import { StyleSheet } from 'react-native';

import ContentCard from '../../../components/ContentCard';
import { Text, View } from '../../../components/Themed';
import { useLocalSearchParams, usePathname, useSegments } from 'expo-router';

export default function TabOneScreen() {
  const pathname = usePathname();
  const segments = useSegments();

  const { user, extra } = useLocalSearchParams();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Tab One</Text>
      <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />
      <ContentCard 
       header={'Welcome to the App'}
       highlight={`You are at ${pathname}`}
       subtitle={`Which is ${segments}`}
       link={'Test'}
        />
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