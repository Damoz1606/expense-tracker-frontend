'use client'

import React, { useState } from 'react'
import BudgetForm from '../../../../components/budget-form'
import { budgetCreate, BudgetRequest } from '@/server/budget.actions'
import { toast } from '@/hooks/use-toast'
import BackButton from '@/components/back-button'
import { useRouter } from 'next/router'

const BudgetCreatePage = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const router = useRouter();

  const handleCreate = async (data: BudgetRequest) => {
    setLoading(true);
    try {
      const newBudget = await budgetCreate(data);
      router.push(`/app/budgets/${newBudget.id}`);
    } catch (error) {
      console.error(error);
      toast({
        title: "Ups! Something went wrong",
        description: 'Check your data, maybe something is wrong.',
        variant: 'destructive'
      });
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className='relative'>
      <div className='mb-4 flex flex-row gap-x-2 md:gap-x-4'>
        <BackButton />
        <p className='text-3xl font-bold lg:text-[25px] xl:text-[30px]'>Create budget</p>
      </div>
      <div className='flex flex-row items-center justify-center'>
        <div className='max-w-[500px] w-full'>
          <BudgetForm
            title='Add budget'
            label='Add new budget'
            onSubmit={handleCreate}
            loading={loading} />
        </div>
      </div>
    </div>
  )
}

export default BudgetCreatePage