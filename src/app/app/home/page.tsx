import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { PiggyBank, NotepadText, Wallet } from 'lucide-react'
import React from 'react'
import BudgetChart from './_components/chart'
import BudgetCard from '@/components/budget-card'
import { expenseLastest } from '@/server/expense.actions'
import ExpenseTable from '@/components/expense-table'
import { retriveMe } from '@/server/user.actions'
import { budgetRetriveActivity } from '@/server/budget.actions'
import SearchInput from '@/components/search-input'
import FilterInput from '@/components/filter-input'

interface HomePageProps {
    searchParams: { [key: string]: string | string[] | undefined }
}
const HomePage: React.FC<HomePageProps> = async ({
    searchParams
}) => {

    const searchExpense = typeof searchParams.search === 'string' ? searchParams.search : undefined;
    const filterExpense = typeof searchParams.filter === 'string' ? searchParams.filter : undefined;

    const user = await retriveMe();

    const budgetActivity = await budgetRetriveActivity();

    const currentExpenses = await expenseLastest();
    const filteredExpenses = filterExpense ? currentExpenses.filter(e => e.budget === filterExpense) : currentExpenses;
    const latestExpenses = searchExpense ? filteredExpenses.filter(e => e.name.includes(searchExpense)) : filteredExpenses;

    const totalBudget = budgetActivity.reduce((prev, curr) => prev + curr.budget, 0);
    const totalSpend = budgetActivity.reduce((prev, curr) => prev + curr.spend, 0);

    return (
        <div className='grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8 lg:grid-cols-3 xl:grid-cols-3'>
            <div className='col-span-3'>
                <div className='flex flex-col gap-y-1 md:gap-y-4'>
                    <p className='text-3xl font-bold lg:text-[40px] xl:text-[50px]'>Hi! {user.username}</p>
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
                                        ${totalBudget}
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
                                        ${totalSpend}
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
                                        {budgetActivity.length}
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
                        <BudgetChart data={budgetActivity.map(e => ({
                            budget: e.name,
                            remaining: e.budget - e.spend,
                            spend: e.spend
                        }))} />
                    </CardContent>
                </Card>
                <div className='flex flex-col gap-y-2'>
                    <div className="flex item-center gap-x-1">
                        <div className="relative flex-1">
                            <SearchInput value={searchExpense} />
                        </div>
                        <div className="ml-auto flex items-center gap-2">
                            <FilterInput initial={filterExpense} values={Array.from(new Set(latestExpenses.map(e => e.budget)))} />
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
                            <ExpenseTable
                                data={latestExpenses}
                                showDate
                                showBudget />
                        </CardContent>
                    </Card>
                </div>
            </div>
            <div className='col-span-3 md:col-span-1'>
                <div className="flex flex-col items-start gap-4 w-full">
                    <span className='font-bold'>Top 5 budget expenses</span>
                    <div className="flex flex-col gap-y-2 w-full">
                        {budgetActivity.sort((a, b) => b.spend - a.spend).slice(0, 5).map(e => <BudgetCard key={e.id} {...e} />)}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default HomePage