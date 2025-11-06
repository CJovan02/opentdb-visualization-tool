import type {CategoryDistribution} from "../../models/triviaStatistics.ts";
import {Bar, BarChart, Legend, Rectangle, Tooltip, XAxis, YAxis} from "recharts";
import {useTheme} from '@mui/material/styles';
import Typography from "@mui/material/Typography";
import Card from "@mui/material/Card";
import type {BarRectangleItem} from "recharts/types/cartesian/Bar";

type CategoryVisualizerProps = {
    categoryDistribution: CategoryDistribution[];
    selectLocalCategory: (category: string) => void;
    localCategorySelected: boolean | null;
}

function CategoryVisualizer({
                                categoryDistribution,
                                selectLocalCategory,
                                localCategorySelected
                            }: CategoryVisualizerProps) {
    const theme = useTheme();

    function onBarClickHandle(data: BarRectangleItem) {
        const barData = data as unknown as { category: string };
        selectLocalCategory(barData.category)
    }

    return (
        <Card
            variant="elevation"
            elevation={2}
            sx={{
                height: "100%",
                width: "100%",
                paddingInline: '1rem 2rem',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
            }}
        >
            <Typography variant='h6' mb='1rem' sx={{fontWeight: 'bold'}}>Category Distribution</Typography>
            {localCategorySelected === false &&
                <Typography color='textSecondary' mb='1rem' variant='body1'>Click a category bar to filter questions by
                    that category</Typography>
            }
            {localCategorySelected === true &&
                <Typography color='textSecondary' mb='1rem' variant='body1'>Click the bar again to reset the
                    filter</Typography>
            }
            <BarChart
                style={{width: '100%', maxWidth: '800px', maxHeight: '500px', aspectRatio: 1.618}}
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
                <Bar onClick={localCategorySelected !== null ? onBarClickHandle : () => {
                }} dataKey="questionCount"
                     name='No. of questions' fill={theme.palette.primary.light}
                     activeBar={<Rectangle fill={theme.palette.primary.dark}/>}/>
            </BarChart>

        </Card>
    )
}

export default CategoryVisualizer;