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
            primary: '#fff',
            secondary: grey[500],
          },
        }),
  },
})

export default getDesignTokens