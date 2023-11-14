import {
  ThemeProvider,
  DarkTheme,
  useTheme,
  DefaultTheme,
} from "@react-navigation/native";

import { Slot } from 'expo-router';
import { Drawer } from 'expo-router/drawer';

import { SessionProvider } from '../auth/ctx';

import {
  ApplicationProvider,
  IconRegistry,
} from "@ui-kitten/components";
import { EvaIconsPack } from "@ui-kitten/eva-icons";
import * as eva from "@eva-design/eva";
import { Platform } from 'react-native';

import useCachedResources from "../resources/hooks/useCachedResources";
import { useState } from "react";
import { ThemeContext } from "../theme/Theme";
import themes from "../theme/Themes";
import 'text-encoding'

export {
  // Catch any errors thrown by the Layout component.
  ErrorBoundary,
} from 'expo-router';

export default function Root() {
  const isLoadingComplete = useCachedResources();
  const [themeName, setThemeName] = useState(useTheme().dark ? 'dark' : 'light');
  const theme = themes[themeName].theme;

  const toggleTheme = () => {
    const nextTheme = themeName === 'light' ? 'dark' : 'light';
    setThemeName(nextTheme);
  };


  if (!isLoadingComplete) {
    return null;
  }

  if (Platform.OS === 'web') {
    // Use a basic custom layout on web.
    return (
      <Drawer>
        <Drawer.Screen
          name="index" // This is the name of the page and must match the url from root
          options={{
            drawerLabel: "Home",
            title: "Home",
          }}
        />
        <Drawer.Screen
          name="details" // This is the name of the page and must match the url from root
          options={{
            drawerLabel: "Details",
            title: "Details",
          }}
        />
        <Drawer.Screen
          name="sign-in" // This is the name of the page and must match the url from root
          options={{
            drawerLabel: "Sign-In",
            title: "Sign-In",
          }}
        />
        <Drawer.Screen
          name="(app)" // This is the name of the page and must match the url from root
          options={() => ({
            drawerItemStyle: { display: 'none' }
          })}
        />
        <Drawer.Screen
          name="[...missing]" // This is the name of the page and must match the url from root
          options={{
            drawerItemStyle: { display: 'none' }
          }}
        />
      </Drawer>
    );
  }

  // Set up the auth context and render our layout inside of it.
    return (
      <SessionProvider>
        <ThemeProvider value={themeName === "light" ? DefaultTheme : DarkTheme}>
          <ThemeContext.Provider value={{ theme, toggleTheme }}>
            <IconRegistry icons={EvaIconsPack} />
            <ApplicationProvider {...eva} theme={theme}>
              <Slot />
            </ApplicationProvider>
          </ThemeContext.Provider>
        </ThemeProvider>
      </SessionProvider>
    );
}
