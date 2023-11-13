import React, { useState, useEffect } from 'react';
import { StyleSheet } from 'react-native';

import { ThemeContext } from '../theme/Theme';
import themes from '../theme/Themes';
import ButtonWithIcon from '../components/ButtonWithIcon';

const ToggleThemeButton = () => {
  const themeContext = React.useContext(ThemeContext);
  const inverseThemeName = theme => theme === "dark" ? "light" : "dark";
  const [themeName, setThemeName] = useState(inverseThemeName(themeContext.theme));
  const [themeButtonText, setthemeButtonText] = useState('DARK');
  const [themeButtonIcon, setthemeButtonIcon] = useState('moon');

  const changeTheme = () => {
    themeContext.toggleTheme();
    setThemeName(inverseThemeName(themeName));
  };

  useEffect(() => {
    const { title, icon } = themeName === "dark" ? themes.dark : themes.light;
    setthemeButtonIcon(icon);
    setthemeButtonText(title);
  });

  return (
    <ButtonWithIcon
      accessibilityRole="button"
      accessibilityLabel="UI Kitten Change Theme"
      style={styles.iconButton}
      text={`SWITCH TO ${themeButtonText} THEME`}
      icon={themeButtonIcon}
      onPress={changeTheme}
      iconStyle={{ tintColor: "white" }}
    />
  )
}

export default ToggleThemeButton;

const styles = StyleSheet.create({
  iconButton: {
    marginVertical: 16,
  },
});