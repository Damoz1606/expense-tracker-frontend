import BackButton from '@/components/back-button'
import BudgetCard from '@/components/budget-card'
import { BudgetActivity, budgetRetrive } from '@/server/budget.actions'
import React from 'react'
import ExpenseForm from './_components/expense-form'
import ExpenseTable from '@/components/expense-table'
import { buttonVariants } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Edit } from 'lucide-react'
import Link from 'next/link'
import BudgetDelete from './_components/budget-delete'
import dayjs from 'dayjs'
import SearchInput from '@/components/search-input'

interface BudgetPageProps {
  params: { id: number },
  searchParams: { [key: string]: string | string[] | undefined }
}
const BudgetPage: React.FC<BudgetPageProps> = async ({
  params,
  searchParams
}) => {

  const budget = await budgetRetrive(params.id);
  const searchExpense = typeof searchParams.search === 'string' ? searchParams.search : undefined;

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
            <SearchInput value={searchExpense} />
          </div>
        </div>

        <Card className='p-2'>
          <CardContent>
            <ExpenseTable
              data={(() => {
                const expenses = budget.expenses;
                const filteredExpenses = searchExpense ? expenses.filter(e =>
                  e.name.includes(searchExpense) ||
                  dayjs(e.createAt).format('YYYY-MM-DD').includes(searchExpense) ||
                  e.amount.toString().includes(searchExpense)) : expenses;
                return filteredExpenses.sort((a, b) => dayjs(b.createAt).diff(a.createAt)).map(e => ({ ...e, budget: budget.name }));
              })()}
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