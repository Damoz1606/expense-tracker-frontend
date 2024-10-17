import BackButton from '@/components/back-button'
import BudgetCard from '@/components/budget-card'
import { BudgetActivity, BudgetWithExpenses } from '@/server/budget.actions'
import React from 'react'
import ExpenseForm from './_components/expense-form'
import ExpenseTable from '@/components/expense-table'
import { Button, buttonVariants } from '@/components/ui/button'
import { Card, CardContent, CardFooter } from '@/components/ui/card'
import { Pagination, PaginationContent, PaginationItem } from '@/components/ui/pagination'
import { ChevronLeft, ChevronRight, Edit, ListFilter, Search, Trash } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { DropdownMenu, DropdownMenuCheckboxItem, DropdownMenuContent, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import Link from 'next/link'

const budget: BudgetWithExpenses = {
  expenses: [{
    id: 1,
    name: 'Nike shoes',
    amount: 120,
    createAt: new Date('2024-04-20')
  }],
  id: 1,
  name: 'Shopping',
  budget: 2500
}

interface BudgetPageProps {
  params: { id: number }
}
const BudgetPage: React.FC<BudgetPageProps> = ({
  params
}) => {

  const budgetActivity: BudgetActivity = {
    ...budget,
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
          <Button
            variant='destructive'
            size='icon'>
            <Trash className='w-5 h-5' />
          </Button>
        </div>
      </div>
      <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
        <BudgetCard {...budgetActivity} notLink />
        <ExpenseForm budget={params.id} />
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
              data={budget.expenses.map(e => ({ ...e, budget: budget.name }))}
              showDate
              showAction
            />
          </CardContent>
          <CardFooter className="flex flex-row items-center border-t bg-muted/50 px-6 py-3">
            <Pagination className="mx-auto w-auto">
              <PaginationContent>
                <PaginationItem>
                  <Button size="icon" variant="outline" className="h-6 w-6">
                    <ChevronLeft className="h-3.5 w-3.5" />
                    <span className="sr-only">Previous Order</span>
                  </Button>
                </PaginationItem>
                <span className='text-sm'>Page: 1</span>
                <PaginationItem>
                  <Button size="icon" variant="outline" className="h-6 w-6">
                    <ChevronRight className="h-3.5 w-3.5" />
                    <span className="sr-only">Next Order</span>
                  </Button>
                </PaginationItem>
              </PaginationContent>
            </Pagination>
          </CardFooter>
        </Card>
      </div>
    </div>
  )
}

export default BudgetPage