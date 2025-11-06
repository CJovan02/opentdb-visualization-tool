import type {TriviaStatistics} from "../../models/triviaStatistics.ts";
import Container from '@mui/material/Container';
import Stack from '@mui/material/Stack';
import CategoryVisualizer from "./CategoryVisualizer.tsx";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import DifficultyVisualizer from "./DifficultyVisualizer.tsx";
import CategorySelector from "./CategorySelector.tsx";
import type {Category} from "../../models/category.ts";
import Refresh from "@mui/icons-material/Refresh";
import QuestionsTable from "./QuestionsTable.tsx";

type TriviaVisualizationProps = {
    triviaStatistics: TriviaStatistics | undefined;
    distributionsLoading: boolean;
    getNewTriviaDistributions: () => void;
    selectLocalCategory: (category: string) => void;
    localCategorySelected: boolean | null;
    categories: Category[];
    selectedCategory: Category;
    selectCategory: (categoryId: number) => void;
}

function TriviaVisualization({
                                 triviaStatistics,
                                 distributionsLoading,
                                 getNewTriviaDistributions,
                                 selectLocalCategory,
                                 localCategorySelected,
                                 categories,
                                 selectedCategory,
                                 selectCategory,
                             }: TriviaVisualizationProps) {
    return (
        <Container sx={{padding: '0'}}>
            <Stack
                direction="column"
                spacing={2}
                justifyContent="center"
                alignItems="center"
                sx={{width: '100%'}}
            >
                <Stack spacing={2} alignItems="center" direction={{xs: "column", sm: "row"}}>
                    <CategorySelector
                        categories={categories}
                        selectedCategory={selectedCategory}
                        onSelectCategory={selectCategory}
                    />
                    <Button startIcon={<Refresh/>} variant="contained" onClick={() => getNewTriviaDistributions()}
                            loading={distributionsLoading}>Refresh Data</Button>
                </Stack>
                {/*{distributionsLoading && <CircularProgress/>}*/}
                {!distributionsLoading && triviaStatistics && (
                    <>
                        <Stack
                            direction={{sm: 'column', md: 'row'}}
                            //spacing={2}
                            gap={2}
                            sx={{width: '100%'}}
                        >
                            <Box sx={{flex: 1, display: 'flex', flexDirection: 'column'}}>
                                <CategoryVisualizer categoryDistribution={triviaStatistics.distribution.byCategory}
                                                    selectLocalCategory={selectLocalCategory}
                                                    localCategorySelected={localCategorySelected}/>
                            </Box>
                            <Box sx={{flex: 1, display: 'flex', flexDirection: 'column'}}>
                                <DifficultyVisualizer difficultyDistribution={triviaStatistics.distribution.byDifficulty}
                                />
                            </Box>
                        </Stack>

                        <QuestionsTable questions={triviaStatistics?.questions ?? []} />

                    </>
                )}
            </Stack>
        </Container>
    )
}

export default TriviaVisualization;