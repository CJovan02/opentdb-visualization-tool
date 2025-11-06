import {createRoot} from 'react-dom/client'
import './index.css'
import MainPage from './UI/pages/MainPage.tsx'
import {ThemeProvider} from "@mui/material/styles";
import CssBaseline from '@mui/material/CssBaseline';
import brandedTheme from "./config/brandedTheme.ts";

createRoot(document.getElementById('root')!).render(
    //<StrictMode>
        <ThemeProvider theme={brandedTheme}>
            <CssBaseline />
            <MainPage/>
        </ThemeProvider>
    //</StrictMode>
)
