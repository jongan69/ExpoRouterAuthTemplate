import { Link, Stack, router } from "expo-router";
import { View, Text } from "../components/Themed";
import {
  Platform,
  //  Image 
} from "react-native";
import React from "react";
import { useWebSession } from "../auth/ctx";

// function LogoTitle({ Title }) {
//   return (
//     <View style={{ flex: 1, flexDirection: "row"}}>
//       <View style={{ justifyContent: 'center', alignItems: 'center', backgroundColor: 'transparent' }}>
//         <Image
//           style={{ width: 30, height: 30 }}
//           source={{ uri: 'https://reactnative.dev/img/tiny_logo.png' }}
//         />
//         <Text> {Title} </Text>

//       </View>

//     </View>
//   );
// }

export default function SignIn() {
  const { signIn }: any = useWebSession();
  return (
    <>
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Stack.Screen
          options={{
            // https://reactnavigation.org/docs/headers#setting-the-header-title
            title: 'Welcome',
            // https://reactnavigation.org/docs/headers#adjusting-header-styles
            headerStyle: { backgroundColor: '#f4511e' },
            headerTintColor: '#fff',
            headerTitleStyle: {
              fontWeight: 'bold',
            },
            // https://reactnavigation.org/docs/headers#replacing-the-title-with-a-custom-component
            // headerTitle: props => <LogoTitle Title={"Home"} {...props} />,
          }}
        />
        <Text>Welcome!</Text>
        {Platform.OS === 'web' && <a onClick={() => {
          signIn(),
            router.push('/')
        }}>
          Click here to sign in
        </a>}
        {Platform.OS === 'ios' && <Link href={{ pathname: '/', params: { source: Platform.OS, authenticated: 'ios' } }}>Press to Get Started</Link>}
        {Platform.OS === 'android' && <Link href={{ pathname: '/', params: { source: Platform.OS, authenticated: 'android' } }}>Press to Get Started</Link>}
      </View>
    </>
  );
}