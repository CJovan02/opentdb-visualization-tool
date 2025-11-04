import './App.css'
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import CircularProgress from '@mui/material/CircularProgress';
import {useTriviaData} from "../../hooks/useTriviaData.tsx";
import CategorySelector from "../components/CategorySelector.tsx";

function MainPage() {
    const {categories, categoriesLoading, selectedCategory, selectCategory} = useTriviaData();

    if (categoriesLoading) {
        return (
            <Container>
                <CircularProgress/>
            </Container>
        )
    }

    return (
        <Box sx={{display: 'flex', flexDirection: 'column', height: '100vh'}}>
            <CategorySelector
                categories={categories}
                selectedCategory={selectedCategory}
                onSelectCategory={selectCategory}/>
        </Box>
    );
}

export default MainPage
