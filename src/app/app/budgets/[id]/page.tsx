import BackButton from '@/components/back-button'
import BudgetCard from '@/components/budget-card'
import { BudgetActivity, budgetRetrive } from '@/server/budget.actions'
import React from 'react'
import ExpenseForm from './_components/expense-form'
import ExpenseTable from '@/components/expense-table'
import { Button, buttonVariants } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Edit, ListFilter, Search } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { DropdownMenu, DropdownMenuCheckboxItem, DropdownMenuContent, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import Link from 'next/link'
import BudgetDelete from './_components/budget-delete'
import dayjs from 'dayjs'

interface BudgetPageProps {
  params: { id: number }
}
const BudgetPage: React.FC<BudgetPageProps> = async ({
  params
}) => {

  const budget = await budgetRetrive(params.id);

  const budgetActivity: BudgetActivity = {
    ...budget,
    items: budget.expenses.length,
    spend: budget.expenses.reduce((prev, curr) => prev + curr.amount, 0)
  }

  return (
    <div className='relative'>
      <div className='mb-4 grid grid-cols-2'>
        <div className='flex flex-row gap-x-2 md:gap-x-4'>
          <BackButton />
          <p className='text-3xl font-bold lg:text-[25px] xl:text-[30px]'>{budget.name}</p>
        </div>
        <div className='flex flex-row gap-x-2 md:gap-x-4 justify-end items-center'>
          <Link
            href={`/app/budgets/${params.id}/update`}
            className={buttonVariants({ variant: 'ghost', size: 'icon' })}>
            <Edit className='w-5 h-5' />
          </Link>
          <BudgetDelete id={params.id} />
        </div>
      </div>
      <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
        <BudgetCard {...budgetActivity} notLink />
        <ExpenseForm
          spend={budgetActivity.spend}
          remaining={budgetActivity.budget}
          budget={Number(params.id)} />
      </div>
      <div className='flex flex-col gap-y-2 mt-8'>
        <div className="flex item-center gap-x-1">
          <div className="relative flex-1">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search..."
              className="w-full rounded-lg bg-background pl-8 md:w-[200px] lg:w-[336px]"
            />
          </div>
          <div className="ml-auto flex items-center gap-2">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  size="sm"
                  className="h-full gap-1 text-sm"
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

        <Card className='p-2'>
          <CardContent>
            <ExpenseTable
              data={budget.expenses.sort((a, b) => dayjs(b.createAt).diff(a.createAt)).map(e => ({ ...e, budget: budget.name }))}
              showDate
              showAction
            />
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

export default BudgetPage