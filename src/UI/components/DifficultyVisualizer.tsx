import type {DifficultyDistribution} from "../../models/triviaDistribution.ts";
import {PieChart, Pie, Cell, Tooltip, Legend} from "recharts";
import {useTheme} from "@mui/material/styles";

type DifficultyVisualizerProps = {
    difficultyDistribution: DifficultyDistribution[];
};


function DifficultyVisualizer({difficultyDistribution}: DifficultyVisualizerProps) {
    const theme = useTheme();
    const COLORS = [theme.palette.primary.light, theme.palette.secondary.light, theme.palette.success.light];

    return (
        <PieChart
            responsive
            style={{width: '100%', maxWidth: '800px', maxHeight: '500px', aspectRatio: 1}}
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
    );
}

export default DifficultyVisualizer;
