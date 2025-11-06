import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';

function MyAppBar() {
    return (
        <AppBar position="static" sx={{marginBottom: '2rem'}}>
            <Toolbar>
                <Typography variant="h5" component="div" sx={{flexGrow: 1, fontWeight: 'bold'}}>
                    Trivia Mini Visualization Tool
                </Typography>

            </Toolbar>
        </AppBar>

    );
}

export default MyAppBar;
