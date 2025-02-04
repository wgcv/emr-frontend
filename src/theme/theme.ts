import { PaletteMode } from '@mui/material'
import { grey } from '@mui/material/colors'

const getDesignTokens = (mode: PaletteMode) => ({
  palette: {
    mode,
    ...(mode === 'light'
      ? {
          // Light mode
          primary: {
            main: '#1976d2',
          },
          secondary: {
            main: '#9c27b0',
          },
          background: {
            default: '#f5f5f5',
            paper: '#fff',
          },
          text: {
            primary: grey[900],
            secondary: grey[800],
          },
        }
      : {
          // Dark mode
          primary: {
            main: '#90caf9',
          },
          secondary: {
            main: '#ce93d8',
          },
          background: {
            default: '#121212',
            paper: '#1e1e1e',
          },
          text: {
            primary: grey[50],
            secondary: grey[500],
          },
        }),
  },
  typography: {
    subtitle1: {
      fontSize: '1rem',
      fontWeight: 500,
      lineHeight: 1.5,
      letterSpacing: '0.00938em',
      color: mode === 'light' ? grey[800] : grey[400],
    },
  },
})

export default getDesignTokens