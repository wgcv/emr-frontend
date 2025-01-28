import Brightness4Icon from '@mui/icons-material/Brightness4'
import Brightness7Icon from '@mui/icons-material/Brightness7'
import { IconButton, Tooltip } from '@mui/material'
import { useTheme } from '../../theme/ThemeProvider'

export const ThemeToggle = () => {
    const { mode, toggleColorMode } = useTheme()

    return (
        <Tooltip title={`Switch to ${mode === 'light' ? 'dark' : 'light'} mode`}>
            <IconButton onClick={toggleColorMode} color="inherit">
                {mode === 'light' ? <Brightness4Icon /> : <Brightness7Icon />}
            </IconButton>
        </Tooltip>
    )
}