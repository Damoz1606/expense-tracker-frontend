'use client'

import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { ChartConfig, ChartContainer, ChartLegend, ChartLegendContent, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart'
import { DropdownMenu, DropdownMenuCheckboxItem, DropdownMenuContent, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import { Progress } from '@/components/ui/progress'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { PiggyBank, NotepadText, Wallet, ListFilter } from 'lucide-react'
import React from 'react'
import { Bar, BarChart, CartesianGrid, XAxis } from 'recharts'

const chartConfig = {
    desktop: {
        label: "Desktop",
        color: "hsl(var(--chart-1))",
    },
    mobile: {
        label: "Mobile",
        color: "hsl(var(--chart-2))",
    },
} satisfies ChartConfig

const chartData = [
    { month: "January", desktop: 186, mobile: 80 },
    { month: "February", desktop: 305, mobile: 200 },
    { month: "March", desktop: 237, mobile: 120 },
    { month: "April", desktop: 73, mobile: 190 },
    { month: "May", desktop: 209, mobile: 130 },
    { month: "June", desktop: 214, mobile: 140 },
]

const HomePage = () => {
    return (
        <div className='grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8 lg:grid-cols-3 xl:grid-cols-3'>
            <div className='col-span-3'>
                <div className='flex flex-col gap-y-1 md:gap-y-4'>
                    <p className='text-3xl font-bold lg:text-[40px] xl:text-[50px]'>Hi! Username</p>
                    <p className='text-xs md:text-sm font-light'>Here&apos;s what happening with your money. Let&apos;s Manage your expense</p>
                </div>
            </div>
            <div className="grid auto-rows-max items-start gap-4 col-span-3 md:gap-8">
                <div className="grid gap-4 grid-cols-1 md:grid-cols-3">
                    <Card>
                        <div className='flex flex-row justify-between items-center'>
                            <div>
                                <CardHeader className="pb-2">
                                    <CardDescription>Total budget</CardDescription>
                                </CardHeader>
                                <CardContent>
                                    <span className="text-2xl font-bold">
                                        $15300
                                    </span>
                                </CardContent>
                            </div>
                            <div className="mr-4 group flex h-16 w-16 shrink-0 items-center justify-center gap-2 rounded-full bg-primary text-lg font-semibold text-primary-foreground md:text-base">
                                <PiggyBank className="h-8 w-8" />
                            </div>
                        </div>
                    </Card>
                    <Card>
                        <div className='flex flex-row justify-between items-center'>
                            <div>
                                <CardHeader className="pb-2">
                                    <CardDescription>Total spend</CardDescription>
                                </CardHeader>
                                <CardContent>
                                    <span className="text-2xl font-bold">
                                        $4950
                                    </span>
                                </CardContent>
                            </div>
                            <div className="mr-4 group flex h-16 w-16 shrink-0 items-center justify-center gap-2 rounded-full bg-primary text-lg font-semibold text-primary-foreground md:text-base">
                                <NotepadText className="h-8 w-8" />
                            </div>
                        </div>
                    </Card>
                    <Card>
                        <div className='flex flex-row justify-between items-center'>
                            <div>
                                <CardHeader className="pb-2">
                                    <CardDescription>No. Of budget</CardDescription>
                                </CardHeader>
                                <CardContent>
                                    <span className="text-2xl font-bold">
                                        5
                                    </span>
                                </CardContent>
                            </div>
                            <div className="mr-4 group flex h-16 w-16 shrink-0 items-center justify-center gap-2 rounded-full bg-primary text-lg font-semibold text-primary-foreground md:text-base">
                                <Wallet className="h-8 w-8" />
                            </div>
                        </div>
                    </Card>
                </div>
            </div>
            <div className="grid auto-rows-max items-start gap-4 col-span-3 md:col-span-3 md:gap-8 lg:col-span-2">
                <Card>
                    <CardHeader>
                        <CardTitle>Activity</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <ChartContainer config={chartConfig}>
                            <BarChart accessibilityLayer data={chartData}>
                                <CartesianGrid vertical={false} />
                                <XAxis
                                    dataKey="month"
                                    tickLine={false}
                                    tickMargin={10}
                                    axisLine={false}
                                    tickFormatter={(value) => value.slice(0, 3)}
                                />
                                <ChartTooltip content={<ChartTooltipContent hideLabel />} />
                                <ChartLegend content={<ChartLegendContent />} />
                                <Bar
                                    dataKey="desktop"
                                    stackId="a"
                                    fill="var(--color-desktop)"
                                    radius={[0, 0, 4, 4]}
                                />
                                <Bar
                                    dataKey="mobile"
                                    stackId="a"
                                    fill="var(--color-mobile)"
                                    radius={[4, 4, 0, 0]}
                                />
                            </BarChart>
                        </ChartContainer>
                    </CardContent>
                </Card>
                <div className='flex flex-col gap-y-2'>
                    <div className="flex item-center">
                        <Card>
                            <CardContent className="p-2 flex items-center gap-1 h-full">
                                <Button variant='ghost' className='bg-muted'>Week</Button>
                                <Button variant='ghost'>Month</Button>
                                <Button variant='ghost'>Year</Button>
                            </CardContent>
                        </Card>
                        <div className="ml-auto flex items-center gap-2">
                            <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                    <Button
                                        variant="outline"
                                        size="sm"
                                        className="h-7 gap-1 text-sm"
                                    >
                                        <ListFilter className="h-3.5 w-3.5" />
                                        <span className="sr-only sm:not-sr-only">Filter</span>
                                    </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="end">
                                    <DropdownMenuLabel>Filter by</DropdownMenuLabel>
                                    <DropdownMenuSeparator />
                                    <DropdownMenuCheckboxItem checked>
                                        Fulfilled
                                    </DropdownMenuCheckboxItem>
                                    <DropdownMenuCheckboxItem>
                                        Declined
                                    </DropdownMenuCheckboxItem>
                                    <DropdownMenuCheckboxItem>
                                        Refunded
                                    </DropdownMenuCheckboxItem>
                                </DropdownMenuContent>
                            </DropdownMenu>
                        </div>
                    </div>
                    <Card>
                        <CardHeader className="px-7">
                            <CardTitle>My latest expenses</CardTitle>
                            <CardDescription>
                                Recent expenses added to a budget.
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead>Customer</TableHead>
                                        <TableHead className="hidden sm:table-cell">
                                            Type
                                        </TableHead>
                                        <TableHead className="hidden sm:table-cell">
                                            Status
                                        </TableHead>
                                        <TableHead className="hidden md:table-cell">
                                            Date
                                        </TableHead>
                                        <TableHead className="text-right">Amount</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    <TableRow className="bg-accent">
                                        <TableCell>
                                            <div className="font-medium">Liam Johnson</div>
                                            <div className="hidden text-sm text-muted-foreground md:inline">
                                                liam@example.com
                                            </div>
                                        </TableCell>
                                        <TableCell className="hidden sm:table-cell">
                                            Sale
                                        </TableCell>
                                        <TableCell className="hidden sm:table-cell">
                                            <Badge className="text-xs" variant="secondary">
                                                Fulfilled
                                            </Badge>
                                        </TableCell>
                                        <TableCell className="hidden md:table-cell">
                                            2023-06-23
                                        </TableCell>
                                        <TableCell className="text-right">$250.00</TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell>
                                            <div className="font-medium">Olivia Smith</div>
                                            <div className="hidden text-sm text-muted-foreground md:inline">
                                                olivia@example.com
                                            </div>
                                        </TableCell>
                                        <TableCell className="hidden sm:table-cell">
                                            Refund
                                        </TableCell>
                                        <TableCell className="hidden sm:table-cell">
                                            <Badge className="text-xs" variant="outline">
                                                Declined
                                            </Badge>
                                        </TableCell>
                                        <TableCell className="hidden md:table-cell">
                                            2023-06-24
                                        </TableCell>
                                        <TableCell className="text-right">$150.00</TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell>
                                            <div className="font-medium">Noah Williams</div>
                                            <div className="hidden text-sm text-muted-foreground md:inline">
                                                noah@example.com
                                            </div>
                                        </TableCell>
                                        <TableCell className="hidden sm:table-cell">
                                            Subscription
                                        </TableCell>
                                        <TableCell className="hidden sm:table-cell">
                                            <Badge className="text-xs" variant="secondary">
                                                Fulfilled
                                            </Badge>
                                        </TableCell>
                                        <TableCell className="hidden md:table-cell">
                                            2023-06-25
                                        </TableCell>
                                        <TableCell className="text-right">$350.00</TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell>
                                            <div className="font-medium">Emma Brown</div>
                                            <div className="hidden text-sm text-muted-foreground md:inline">
                                                emma@example.com
                                            </div>
                                        </TableCell>
                                        <TableCell className="hidden sm:table-cell">
                                            Sale
                                        </TableCell>
                                        <TableCell className="hidden sm:table-cell">
                                            <Badge className="text-xs" variant="secondary">
                                                Fulfilled
                                            </Badge>
                                        </TableCell>
                                        <TableCell className="hidden md:table-cell">
                                            2023-06-26
                                        </TableCell>
                                        <TableCell className="text-right">$450.00</TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell>
                                            <div className="font-medium">Liam Johnson</div>
                                            <div className="hidden text-sm text-muted-foreground md:inline">
                                                liam@example.com
                                            </div>
                                        </TableCell>
                                        <TableCell className="hidden sm:table-cell">
                                            Sale
                                        </TableCell>
                                        <TableCell className="hidden sm:table-cell">
                                            <Badge className="text-xs" variant="secondary">
                                                Fulfilled
                                            </Badge>
                                        </TableCell>
                                        <TableCell className="hidden md:table-cell">
                                            2023-06-23
                                        </TableCell>
                                        <TableCell className="text-right">$250.00</TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell>
                                            <div className="font-medium">Liam Johnson</div>
                                            <div className="hidden text-sm text-muted-foreground md:inline">
                                                liam@example.com
                                            </div>
                                        </TableCell>
                                        <TableCell className="hidden sm:table-cell">
                                            Sale
                                        </TableCell>
                                        <TableCell className="hidden sm:table-cell">
                                            <Badge className="text-xs" variant="secondary">
                                                Fulfilled
                                            </Badge>
                                        </TableCell>
                                        <TableCell className="hidden md:table-cell">
                                            2023-06-23
                                        </TableCell>
                                        <TableCell className="text-right">$250.00</TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell>
                                            <div className="font-medium">Olivia Smith</div>
                                            <div className="hidden text-sm text-muted-foreground md:inline">
                                                olivia@example.com
                                            </div>
                                        </TableCell>
                                        <TableCell className="hidden sm:table-cell">
                                            Refund
                                        </TableCell>
                                        <TableCell className="hidden sm:table-cell">
                                            <Badge className="text-xs" variant="outline">
                                                Declined
                                            </Badge>
                                        </TableCell>
                                        <TableCell className="hidden md:table-cell">
                                            2023-06-24
                                        </TableCell>
                                        <TableCell className="text-right">$150.00</TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell>
                                            <div className="font-medium">Emma Brown</div>
                                            <div className="hidden text-sm text-muted-foreground md:inline">
                                                emma@example.com
                                            </div>
                                        </TableCell>
                                        <TableCell className="hidden sm:table-cell">
                                            Sale
                                        </TableCell>
                                        <TableCell className="hidden sm:table-cell">
                                            <Badge className="text-xs" variant="secondary">
                                                Fulfilled
                                            </Badge>
                                        </TableCell>
                                        <TableCell className="hidden md:table-cell">
                                            2023-06-26
                                        </TableCell>
                                        <TableCell className="text-right">$450.00</TableCell>
                                    </TableRow>
                                </TableBody>
                            </Table>
                        </CardContent>
                    </Card>
                </div>
            </div>
            <div className='col-span-3 md:col-span-1'>
                <div className="flex flex-col items-start gap-4 w-full">
                    <span className='font-bold'>Latest Budgets</span>
                    <div className="flex flex-col gap-y-2 w-full">
                        <Card>
                            <CardHeader className="pb-2">
                                <div className="flex flex-row justify-between items-center">
                                    <div>
                                        <CardTitle className="text-xl">Shopping</CardTitle>
                                        <CardDescription>2 Item</CardDescription>
                                    </div>
                                    <span className='text-xl font-bold'>
                                        $2500
                                    </span>
                                </div>
                            </CardHeader>
                            <CardContent>
                                <div className='w-full'>
                                    <div className="flex flex-row justify-between mb-1">
                                        <span className='text-xs text-muted-foreground'>$270 Spend</span>
                                        <span className='text-xs text-muted-foreground'>$2230 Remaining</span>
                                    </div>
                                    <Progress value={25} aria-label="25% increase" />
                                </div>
                            </CardContent>
                        </Card>
                        <Card>
                            <CardHeader className="pb-2">
                                <div className="flex flex-row justify-between items-center">
                                    <div>
                                        <CardTitle className="text-xl">Home Decor</CardTitle>
                                        <CardDescription>2 Item</CardDescription>
                                    </div>
                                    <span className='text-xl font-bold'>
                                        $3800
                                    </span>
                                </div>
                            </CardHeader>
                            <CardContent>
                                <div className='w-full'>
                                    <div className="flex flex-row justify-between mb-1">
                                        <span className='text-xs text-muted-foreground'>$330 Spend</span>
                                        <span className='text-xs text-muted-foreground'>$500 Remaining</span>
                                    </div>
                                    <Progress value={25} aria-label="25% increase" />
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default HomePage