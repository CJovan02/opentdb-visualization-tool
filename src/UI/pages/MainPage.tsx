import './App.css'
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import CircularProgress from '@mui/material/CircularProgress';
import {useTriviaData} from "../../hooks/useTriviaData.tsx";
import CategorySelector from "../components/CategorySelector.tsx";
import TriviaVisualization from "../components/TriviaVisualization.tsx";
import {ErrorDisplay} from "../components/ErrorDisplay.tsx";

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
        error
    } = useTriviaData();

    if (triviaStatus === 'error') {
        return (
            <Container>
                <ErrorDisplay message={error?.message} title="Error occurred" onRetry={getNewTriviaStatistics}/>
            </Container>
        )
    }

    if (triviaStatus === 'loading' || triviaStatus === 'initial') {
        return (
            <Container>
                <CircularProgress/>
            </Container>
        )
    }

    return (
        <Box sx={{width: '100%', minHeight: '90vh'}}>
            <Container maxWidth='lg' sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
            }}>
                <TriviaVisualization localCategorySelected={localCategorySelected}
                                     selectLocalCategory={selectLocalCategory} triviaStatistics={triviaStatistics}
                                     distributionsLoading={statisticsLoading}
                                     getNewTriviaDistributions={getNewTriviaStatistics}/>

                <CategorySelector
                    categories={categories}
                    selectedCategory={selectedCategory}
                    onSelectCategory={selectCategory}
                />
            </Container>

        </Box>
    );
}

export default MainPage
