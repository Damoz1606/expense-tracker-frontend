import ExpenseTable from '@/components/expense-table'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardFooter } from '@/components/ui/card'
import { Pagination, PaginationContent, PaginationItem } from '@/components/ui/pagination'
import { Expense } from '@/server/expense.actions'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import React from 'react'

const data: Expense[] = [
  { id: 1, name: 'Nike Shoes', budget: 'Shopping', amount: 120, createAt: new Date('2024-04-20') },
  { id: 2, name: 'Shirts Adidas', budget: 'Shopping', amount: 150, createAt: new Date('2024-04-20') },
  { id: 3, name: 'Leaving Room', budget: 'Home Decor', amount: 800, createAt: new Date('2024-04-20') },
  { id: 4, name: 'Bath', budget: 'Home Decor', amount: 1000, createAt: new Date('2024-04-20') },
  { id: 5, name: 'Source Code', budget: 'Youtube', amount: 800, createAt: new Date('2024-04-20') },
  { id: 6, name: 'Youtube Ads', budget: 'Youtube', amount: 300, createAt: new Date('2024-04-20') },
  { id: 7, name: 'Oil Change', budget: 'Car', amount: 120, createAt: new Date('2024-04-20') },

  { id: 9, name: 'Nike Shoes', budget: 'Shopping', amount: 120, createAt: new Date('2024-04-20') },
  { id: 10, name: 'Shirts Adidas', budget: 'Shopping', amount: 150, createAt: new Date('2024-04-20') },
  { id: 11, name: 'Leaving Room', budget: 'Home Decor', amount: 800, createAt: new Date('2024-04-20') },
  { id: 12, name: 'Bath', budget: 'Home Decor', amount: 1000, createAt: new Date('2024-04-20') },
  { id: 13, name: 'Source Code', budget: 'Youtube', amount: 800, createAt: new Date('2024-04-20') },
  { id: 14, name: 'Youtube Ads', budget: 'Youtube', amount: 300, createAt: new Date('2024-04-20') },
  { id: 15, name: 'Oil Change', budget: 'Car', amount: 120, createAt: new Date('2024-04-20') },

  { id: 16, name: 'Nike Shoes', budget: 'Shopping', amount: 120, createAt: new Date('2024-04-20') },
  { id: 17, name: 'Shirts Adidas', budget: 'Shopping', amount: 150, createAt: new Date('2024-04-20') },
  { id: 18, name: 'Leaving Room', budget: 'Home Decor', amount: 800, createAt: new Date('2024-04-20') },
  { id: 19, name: 'Bath', budget: 'Home Decor', amount: 1000, createAt: new Date('2024-04-20') },
  { id: 20, name: 'Source Code', budget: 'Youtube', amount: 800, createAt: new Date('2024-04-20') },
  { id: 21, name: 'Youtube Ads', budget: 'Youtube', amount: 300, createAt: new Date('2024-04-20') },
  { id: 22, name: 'Oil Change', budget: 'Car', amount: 120, createAt: new Date('2024-04-20') },
]

const ExpensesPage = () => {
  return (
    <div className='relative'>
      <div className='mb-4 flex flex-col gap-y-1 md:gap-y-4'>
        <p className='text-3xl font-bold lg:text-[25px] xl:text-[30px]'>My expenses</p>
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
  )
}

export default ExpensesPage