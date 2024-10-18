import BudgetCard from '@/components/budget-card'
import SearchInput from '@/components/search-input'
import { Card, CardContent } from '@/components/ui/card'
import { budgetRetriveActivity } from '@/server/budget.actions'
import { Plus } from 'lucide-react'
import Link from 'next/link'
import React from 'react'

interface BudgetsPageProps {
  searchParams: { [key: string]: string | string[] | undefined }
}
const BudgetsPage: React.FC<BudgetsPageProps> = async ({
  searchParams
}) => {

  const searchBudget = typeof searchParams.search === 'string' ? searchParams.search : undefined;

  const retrivedBudgets = await budgetRetriveActivity();
  const budgetActivity = searchBudget ? retrivedBudgets.filter(e => e.name.includes(searchBudget)) : retrivedBudgets;

  return (
    <div className='relative'>
      <div className='mb-4 flex flex-col gap-y-1 md:gap-y-4'>
        <p className='text-3xl font-bold lg:text-[25px] xl:text-[30px]'>My budgets</p>
      </div>
      <div className='mb-4'>
        <SearchInput />
      </div>
      <div className="grid gap-4 grid-cols-1 md:grid-cols-3">
        <Link
          href='/app/budgets/create'>
          <Card className='h-full'>
            <CardContent className='h-full flex justify-center items-center  pt-6'>
              <div className='max-w-full mx-auto'>
                <Plus className='h-7 w-7' />
              </div>
            </CardContent>
          </Card>
        </Link>
        {budgetActivity.map(e => <BudgetCard key={Math.random()} {...e} />)}
      </div>
    </div>
  )
}

export default BudgetsPage