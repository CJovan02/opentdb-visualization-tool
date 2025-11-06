import type {DifficultyDistribution} from "../../models/triviaStatistics.ts";
import {PieChart, Pie, Cell, Tooltip, Legend} from "recharts";
import {useTheme} from "@mui/material/styles";
import Typography from "@mui/material/Typography";
import Card from "@mui/material/Card";

type DifficultyVisualizerProps = {
    difficultyDistribution: DifficultyDistribution[];
};

function DifficultyVisualizer({difficultyDistribution}: DifficultyVisualizerProps) {
    const theme = useTheme();
    const COLORS = [theme.palette.primary.light, theme.palette.secondary.light, theme.palette.success.light];

    return (
        <Card
            variant="elevation"
            elevation={2}
            sx={{
                height: "100%",
                width: "100%",
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
            }}
        >
            <Typography variant='h6' mb='1rem' sx={{fontWeight: 'bold'}}>Difficulty Distribution</Typography>

            <PieChart
                responsive
                style={{width: '100%', maxWidth: '300px', maxHeight: '300px', aspectRatio: 1}}
            >
                <Pie
                    data={difficultyDistribution}
                    dataKey="questionCount"
                    nameKey="difficulty"
                    cx="50%"
                    cy="50%"
                    //outerRadius={130}
                    label
                    style={{maxHeight: '300px'}}
                >
                    {difficultyDistribution.map((_, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]}/>
                    ))}
                </Pie>
                <Tooltip/>
                <Legend/>
            </PieChart>
        </Card>
    );
}

export default DifficultyVisualizer;
