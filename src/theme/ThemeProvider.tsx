import { createTheme, ThemeProvider as MUIThemeProvider, CssBaseline } from '@mui/material'
import { createContext, useContext, useMemo, useState } from 'react'
import getDesignTokens from './theme'

type ThemeContextType = {
  toggleColorMode: () => void
  mode: 'light' | 'dark'
}

const ThemeContext = createContext<ThemeContextType>({} as ThemeContextType)

export const useTheme = () => useContext(ThemeContext)

export const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
  const [mode, setMode] = useState<'light' | 'dark'>('light')

  const colorMode = useMemo(
    () => ({
      toggleColorMode: () => {
        setMode((prevMode) => (prevMode === 'light' ? 'dark' : 'light'))
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