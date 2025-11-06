import {createTheme} from '@mui/material/styles';
import type {ThemeOptions} from '@mui/material/styles';
import {indigo} from '@mui/material/colors';
import {lighten} from '@mui/material/styles';

const primaryColor = indigo[500];

export const brandedTokens: ThemeOptions = {
    palette: {
        primary: {
            main: primaryColor,
        },
        background: {
            default: lighten(primaryColor, 0.97),
            paper: lighten(primaryColor, 0.91),
        }
    },
    shape: {
        borderRadius: 4,
    },
    typography: {
        fontFamily:
            'var(--font-primary, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif)',
    },
};

export const brandedComponents: ThemeOptions['components'] = {
    MuiButton: {
        styleOverrides: {
            root: {
                //minWidth: 'unset',
                textTransform: 'capitalize',
            },
        },
    },
    MuiSelect: {
        styleOverrides: {
            root: {
                //color: 'aqua'
            }
        }
    },
    MuiAppBar: {
        styleOverrides: {
            root: ({theme}) => ({
                backgroundColor: theme.palette.background.paper,
                color: theme.palette.text.primary,
            }),
        },
    },
};

const brandedTheme = createTheme({
    ...brandedTokens,
    components: brandedComponents,
});

export default brandedTheme;
