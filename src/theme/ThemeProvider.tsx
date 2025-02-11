import { createTheme, CssBaseline, ThemeProvider as MUIThemeProvider } from '@mui/material'
import { createContext, useContext, useMemo, useState } from 'react'
import getDesignTokens from './theme'

type ThemeContextType = {
  toggleColorMode: () => void
  mode: 'light' | 'dark'
}

const ThemeContext = createContext<ThemeContextType>({} as ThemeContextType)

export const useTheme = () => useContext(ThemeContext)

export const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
  const [mode, setMode] = useState<'light' | 'dark'>(() => {
    // Initialize theme from localStorage or fallback to 'light'
    return (localStorage.getItem('theme') === 'dark' ? 'dark' : 'light') as 'light' | 'dark';
  })

  const colorMode = useMemo(
    () => ({
      toggleColorMode: () => {
        setMode((prevMode) => {
          const newMode = prevMode === 'light' ? 'dark' : 'light'
          localStorage.setItem('theme', newMode)
          return newMode
        })
      },
      mode,
    }),
    [mode]
  )

  const theme = useMemo(() => createTheme(getDesignTokens(mode)), [mode])

  return (
    <ThemeContext.Provider value={colorMode}>
      <MUIThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </MUIThemeProvider>
    </ThemeContext.Provider>
  )
}
