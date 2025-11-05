import './App.css'
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import CircularProgress from '@mui/material/CircularProgress';
import {useTriviaData} from "../../hooks/useTriviaData.tsx";
import CategorySelector from "../components/CategorySelector.tsx";
import TriviaVisualization from "../components/TriviaVisualization.tsx";

function MainPage() {
    const {
        categories,
        categoriesLoading,
        selectedCategory,
        selectCategory,
        distributionsLoading,
        getNewTriviaDistributions,
        triviaDist
    } = useTriviaData();

    if (categoriesLoading) {
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
                <TriviaVisualization triviaDist={triviaDist} distributionsLoading={distributionsLoading}
                                     getNewTriviaDistributions={getNewTriviaDistributions}/>

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
