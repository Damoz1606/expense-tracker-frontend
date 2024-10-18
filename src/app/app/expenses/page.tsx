import ExpenseTable from '@/components/expense-table'
import Pagination from '@/components/pagination';
import SearchInput from '@/components/search-input';
import { Card, CardContent, CardFooter } from '@/components/ui/card'
import { expensePageCount, expenseSearch } from '@/server/expense.actions'
import React from 'react'

const take: number = 50;
interface ExpensesPageProps {
  searchParams: { [key: string]: string | string[] | undefined }
}
const ExpensesPage: React.FC<ExpensesPageProps> = async ({
  searchParams
}) => {

  const searchExpense = typeof searchParams.search === 'string' ? searchParams.search : undefined;
  const pageExpense = typeof searchParams.page === 'string' ? Number(searchParams.page) : 1;

  const data = await expenseSearch({ skip: pageExpense - 1, take, filter: searchExpense });
  const pages = await expensePageCount({ take, filter: searchExpense });

  return (
    <div className='relative'>
      <div className='mb-4 flex flex-col gap-y-1 md:gap-y-4'>
        <p className='text-3xl font-bold lg:text-[25px] xl:text-[30px]'>My expenses</p>
      </div>
      <div className='mb-4'>
        <SearchInput />
      </div>
      <Card className='p-2'>
        <CardContent>
          <ExpenseTable
            data={data}
            showDate
            showAction
            showBudget
          />
        </CardContent>
        <CardFooter className="flex flex-row items-center border-t bg-muted/50 px-6 py-3">
          <Pagination top={pages} page={pageExpense} />
        </CardFooter>
      </Card>
    </div>
  )
}

export default ExpensesPage