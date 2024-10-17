import BudgetCard from '@/components/budget-card'
import { Card, CardContent } from '@/components/ui/card'
import { Plus } from 'lucide-react'
import Link from 'next/link'
import React from 'react'

const budgetActivity = [
  { id: 1, items: 1, name: "Shopping", spend: 2230, budget: 3450 },
  { id: 2, items: 2, name: "Home Decor", spend: 3000, budget: 3500 },
  { id: 3, items: 3, name: "Garden", spend: 200, budget: 2400 },
  { id: 4, items: 4, name: "Car", spend: 2500, budget: 5200 },
  { id: 5, items: 5, name: "Youtube", spend: 3350, budget: 8000 },
]


const BudgetsPage = () => {
  return (
    <div className='relative'>
      <div className='mb-4 flex flex-col gap-y-1 md:gap-y-4'>
        <p className='text-3xl font-bold lg:text-[25px] xl:text-[30px]'>My budgets</p>
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