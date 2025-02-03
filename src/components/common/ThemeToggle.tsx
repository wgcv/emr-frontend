import { Button, ButtonGroup } from '@mui/material'
import { useTheme } from '../../theme/ThemeProvider'

export const ThemeToggle = () => {
    const { mode, toggleColorMode } = useTheme()

    return (
        <ButtonGroup size="small">
            <Button
                variant={mode === 'light' ? 'contained' : 'outlined'}
                onClick={() => toggleColorMode()}
            >
                Light
            </Button>
            <Button
                variant={mode === 'dark' ? 'contained' : 'outlined'}
                onClick={() => toggleColorMode()}
            >
                Dark
            </Button>
        </ButtonGroup>
    )
}