'use client'

import { ChartConfig, ChartContainer, ChartLegend, ChartLegendContent, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart'
import React from 'react'
import { CartesianGrid, XAxis, Bar, BarChart } from 'recharts'

const chartConfig = {
    remaining: {
        label: "Remaining",
        color: "hsl(var(--chart-1))",
    },
    spend: {
        label: "Spend",
        color: "hsl(var(--chart-2))",
    },
} satisfies ChartConfig

interface BudgetChartProps {
    data: {
        budget: string;
        remaining: number;
        spend: number;
    }[]
}
const BudgetChart: React.FC<BudgetChartProps> = ({
    data
}) => {
    return (
        <ChartContainer config={chartConfig}>
            <BarChart accessibilityLayer data={data}>
                <CartesianGrid vertical={false} />
                <XAxis
                    dataKey="budget"
                    tickLine={false}
                    tickMargin={10}
                    axisLine={false}
                    tickFormatter={(value) => value.slice(0, 3)}
                />
                <ChartTooltip content={<ChartTooltipContent hideLabel />} />
                <ChartLegend content={<ChartLegendContent />} />
                <Bar
                    dataKey="spend"
                    stackId="a"
                    fill="var(--color-spend)"
                    radius={[0, 0, 4, 4]}
                />
                <Bar
                    dataKey="remaining"
                    stackId="a"
                    fill="var(--color-remaining)"
                    radius={[4, 4, 0, 0]}
                />
            </BarChart>
        </ChartContainer>
    )
}

export default BudgetChart