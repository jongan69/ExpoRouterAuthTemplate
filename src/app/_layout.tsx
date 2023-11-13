import {
  ThemeProvider,
  DarkTheme,
  useTheme,
  DefaultTheme,
} from "@react-navigation/native";

import { Slot } from 'expo-router';
import { SessionProvider } from '../auth/ctx';
import themes from "../theme/Themes";

import {
  ApplicationProvider,
  IconRegistry,
} from "@ui-kitten/components";
import { EvaIconsPack } from "@ui-kitten/eva-icons";
import * as eva from "@eva-design/eva";

import useCachedResources from "../resources/hooks/useCachedResources";
import { useState } from "react";
import { ThemeContext } from "../theme/Theme";

export {
  // Catch any errors thrown by the Layout component.
  ErrorBoundary,
} from 'expo-router';

export default function Root() {
  const isLoadingComplete = useCachedResources();
  const [theme, setTheme] = useState('light');

  const toggleTheme = () => {
    const nextTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(nextTheme);
  };


  if (!isLoadingComplete) {
    return null;
  }

  // Set up the auth context and render our layout inside of it.
  return (
    <SessionProvider>
      <ThemeProvider value={theme === "light" ? DefaultTheme: DarkTheme}>
      <ThemeContext.Provider value={{ theme, toggleTheme }}>
        <IconRegistry icons={EvaIconsPack} />
        <ApplicationProvider {...eva} theme={eva.dark}>
          <Slot />
        </ApplicationProvider>
      </ThemeContext.Provider>
      </ThemeProvider>
    </SessionProvider>
  );
}
