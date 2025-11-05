import type {CategoryDistribution} from "../../models/triviaDistribution.ts";
import {Bar, BarChart, Legend, Rectangle, Tooltip, XAxis, YAxis} from "recharts";
import { useTheme } from '@mui/material/styles';

type CategoryVisualizerProps = {
    categoryDistribution: CategoryDistribution[];
}

function CategoryVisualizer({categoryDistribution}: CategoryVisualizerProps) {
    const theme = useTheme();

    return (
        <BarChart
            style={{width: '100%', maxWidth: '600px', maxHeight: '400px', aspectRatio: 1.618}}
            responsive
            data={categoryDistribution}
        >
            {/*<CartesianGrid strokeDasharray="3 3"/>*/}
            <XAxis dataKey="category"
                   // interval={0}
                   // angle={-60}
                   // textAnchor="end"
                   // height={200}
            />
            <YAxis width="auto"/>
            <Tooltip/>
            <Legend/>
            <Bar dataKey="questionCount" name='No. of questions' fill={theme.palette.primary.light}
                 activeBar={<Rectangle fill={theme.palette.secondary.light}/>}/>
        </BarChart>
    )
}

export default CategoryVisualizer;