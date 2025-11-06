import type {TriviaStatistics} from "../../models/triviaStatistics.ts";
import Container from '@mui/material/Container';
import Stack from '@mui/material/Stack';
import CategoryVisualizer from "./CategoryVisualizer.tsx";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import DifficultyVisualizer from "./DifficultyVisualizer.tsx";

type TriviaVisualizationProps = {
    triviaStatistics: TriviaStatistics | undefined;
    distributionsLoading: boolean;
    getNewTriviaDistributions: () => void;
    selectLocalCategory: (category: string) => void;
    localCategorySelected: boolean;
}

function TriviaVisualization({
                                 triviaStatistics,
                                 distributionsLoading,
                                 getNewTriviaDistributions,
                                 selectLocalCategory,
                                 localCategorySelected,
                             }: TriviaVisualizationProps) {
    return (
        <Container>
            <Stack
                direction="column"
                spacing={2}
                justifyContent="center"
                alignItems="center"
                sx={{width: '100%'}}
            >
                <Button variant="contained" onClick={getNewTriviaDistributions} loading={distributionsLoading}>Reload
                    new
                    data</Button>
                {/*{distributionsLoading && <CircularProgress/>}*/}
                {!distributionsLoading && triviaStatistics && (
                    <Grid container spacing={4} width="100%" sx={{alignItems: 'stretch', justifyContent: 'center'}}>
                        <Grid size={{md: 6, sm: 12}}
                              sx={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}
                        >
                            <CategoryVisualizer localCategorySelected={localCategorySelected}
                                                selectLocalCategory={selectLocalCategory}
                                                categoryDistribution={triviaStatistics.distribution.byCategory}/>
                        </Grid>
                        <Grid size={{md: 6, sm: 12}}
                              sx={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}
                        >
                            <DifficultyVisualizer difficultyDistribution={triviaStatistics.distribution.byDifficulty}/>
                        </Grid>
                    </Grid>
                )}
            </Stack>
        </Container>
    )
}

export default TriviaVisualization;