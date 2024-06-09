import React, { createContext, useContext, useState, useMemo } from "react"
import { ThemeProvider as StyledThemeProvider } from "styled-components"
import {
  lightTheme,
  darkTheme,
} from "../styles/styled-components/common/Themes"
import { GlobalStyles } from "../styles/styled-components/common/GlobalStyles"
import { LIGHT_THEME, DARK_THEME } from "../constants/theme"

const ThemeContext = createContext()

export const useTheme = () => useContext(ThemeContext)

const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState(
    localStorage.getItem("theme") || LIGHT_THEME
  )

  const toggleTheme = () => {
    const newTheme = theme === LIGHT_THEME ? DARK_THEME : LIGHT_THEME
    setTheme(newTheme)
    localStorage.setItem("theme", newTheme)
  }

  const contextValue = useMemo(
    () => ({
      theme,
      toggleTheme,
    }),
    [theme]
  )

  return (
    <ThemeContext.Provider value={contextValue}>
      <StyledThemeProvider
        theme={theme === LIGHT_THEME ? lightTheme : darkTheme}
      >
        <GlobalStyles />
        {children}
      </StyledThemeProvider>
    </ThemeContext.Provider>
  )
}

export default ThemeProvider
