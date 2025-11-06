import {createTheme} from '@mui/material/styles';
import type {ThemeOptions} from '@mui/material/styles';
import {deepOrange} from '@mui/material/colors';

export const brandedTokens: ThemeOptions = {
    palette: {
        primary: {
            main: deepOrange[500],
        },
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
    }
};

const brandedTheme = createTheme({
    ...brandedTokens,
    components: brandedComponents,
});

export default brandedTheme;
