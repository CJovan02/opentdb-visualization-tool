import type {TriviaDistribution} from "../../models/triviaDistribution.ts";
import Container from '@mui/material/Container';
import Stack from '@mui/material/Stack';
import CategoryVisualizer from "./CategoryVisualizer.tsx";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import DifficultyVisualizer from "./DifficultyVisualizer.tsx";

type TriviaVisualizationProps = {
    triviaDist: TriviaDistribution | undefined;
    distributionsLoading: boolean;
    getNewTriviaDistributions: () => void;
}

function TriviaVisualization({triviaDist, distributionsLoading, getNewTriviaDistributions}: TriviaVisualizationProps) {
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
                {!distributionsLoading && triviaDist && (
                    <Grid container spacing={2} width="100%" sx={{alignItems: 'center', justifyContent: 'center'}}>
                        <Grid size={{md: 6, sm: 12}}
                              sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}
                        >
                            <CategoryVisualizer categoryDistribution={triviaDist.byCategory}/>
                        </Grid>
                        <Grid size={{md: 6, sm: 12}}
                              sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}
                        >
                            <DifficultyVisualizer difficultyDistribution={triviaDist.byDifficulty}/>
                        </Grid>
                    </Grid>
                )}
            </Stack>
        </Container>
    )
}

export default TriviaVisualization;