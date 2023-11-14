import { Link, Stack } from "expo-router";
import { View, Text } from "../components/Themed";
import { Platform, Image } from "react-native";
import React from "react";
import WebNavbar from "../components/Navbar.web";

function LogoTitle({ Title }) {
  return (
    <View style={{ flex: 1, flexDirection: "row"}}>
      <View style={{ justifyContent: 'center', alignItems: 'center', backgroundColor: 'transparent' }}>
        <Image
          style={{ width: 30, height: 30 }}
          source={{ uri: 'https://reactnative.dev/img/tiny_logo.png' }}
        />
        <Text> {Title} </Text>

      </View>
      {/* {Platform.OS === 'web' && <WebNavbar fixed={undefined} />} */}
    </View>
  );
}

export default function Home() {
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
            headerTitle: props => <LogoTitle Title={"Home"} {...props} />,
          }}
        />
        <Text>Welcome!</Text>
        <Link href={{ pathname: 'sign-in', params: { source: Platform.OS } }}>Press to Get Started</Link>
      </View>
    </>
  );
}