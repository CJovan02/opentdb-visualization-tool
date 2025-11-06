import './App.css'
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import CircularProgress from '@mui/material/CircularProgress';
import {useTriviaData} from "../../hooks/useTriviaData.tsx";
import TriviaVisualization from "../components/TriviaVisualization.tsx";
import {ErrorDisplay} from "../components/ErrorDisplay.tsx";
import {getErrorMessage} from "../../utils/utils.ts";
import Snackbar from "@mui/material/Snackbar"
import MyAppBar from "../components/MyAppBar.tsx";
import Typography from "@mui/material/Typography";
import Link from "@mui/material/Link";

function MainPage() {
    const {
        triviaStatus,
        categories,
        selectedCategory,
        selectCategory,
        statisticsLoading,
        getNewTriviaStatistics,
        triviaStatistics,
        selectLocalCategory,
        localCategorySelected,
        snackbarMessage,
        setSnackbarMessage,
        error
    } = useTriviaData();

    return (
        <Box sx={{width: '100%', minHeight: '92vh'}}>
            <Snackbar
                open={!!snackbarMessage}
                message={snackbarMessage}
                autoHideDuration={10000}
                onClose={() => setSnackbarMessage(null)}
                anchorOrigin={{vertical: 'bottom', horizontal: 'center'}}
            />
            <Container maxWidth='lg' sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                padding: '0',
            }}>
                <MyAppBar/>

                {triviaStatus === 'error' && (
                    <ErrorDisplay message={getErrorMessage(error)} title="Error occurred"
                                  onRetry={() => getNewTriviaStatistics()}/>
                )}

                {(triviaStatus === 'loading' || triviaStatus === 'initial') && (
                    <CircularProgress/>
                )}

                {triviaStatus === 'loaded' && (
                    <>
                        <TriviaVisualization categories={categories} selectedCategory={selectedCategory}
                                             selectCategory={selectCategory}
                                             localCategorySelected={localCategorySelected}
                                             selectLocalCategory={selectLocalCategory}
                                             triviaStatistics={triviaStatistics}
                                             distributionsLoading={statisticsLoading}
                                             getNewTriviaDistributions={getNewTriviaStatistics}/>


                        <Typography mt='5rem'>
                            Data Source: <Link href="https://opentdb.com/">Open Trivia DB</Link>
                        </Typography>
                    </>
                )}
            </Container>
        </Box>
    );
}

export default MainPage
