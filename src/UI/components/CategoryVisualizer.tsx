import type {CategoryDistribution} from "../../models/triviaStatistics.ts";
import {Bar, BarChart, Legend, Rectangle, Tooltip, XAxis, YAxis} from "recharts";
import {useTheme} from '@mui/material/styles';
import Typography from "@mui/material/Typography";
import Card from "@mui/material/Card";

type CategoryVisualizerProps = {
    categoryDistribution: CategoryDistribution[];
    selectLocalCategory: (category: string) => void;
    localCategorySelected: boolean;
}

function CategoryVisualizer({
                                categoryDistribution,
                                selectLocalCategory,
                                localCategorySelected
                            }: CategoryVisualizerProps) {
    const theme = useTheme();

    return (
        <Card
            variant="elevation"
            elevation={2}
            sx={{
                height: "100%",
                width: "100%",
                paddingInline: '1rem'
            }}
        >
            <Typography variant='h6' mb='1rem' sx={{fontWeight: 'bold'}}>Category Distribution</Typography>
            {!localCategorySelected &&
                <Typography color='textSecondary' mb='1rem' variant='body1'>Click a category bar to filter questions by
                    that category</Typography>
            }
            {localCategorySelected &&
                <Typography color='textSecondary' mb='1rem' variant='body1'>Click the bar again to reset the
                    filter</Typography>
            }
            <BarChart
                style={{width: '100%', maxWidth: '600px', maxHeight: '500px', aspectRatio: 1.618}}
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
                <Bar onClick={(data) => selectLocalCategory(data.category)} dataKey="questionCount"
                     name='No. of questions' fill={theme.palette.primary.light}
                     activeBar={<Rectangle fill={theme.palette.primary.dark}/>}/>
            </BarChart>

        </Card>
    )
}

export default CategoryVisualizer;