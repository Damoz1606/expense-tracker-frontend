import BackButton from '@/components/back-button'
import React from 'react'
import BudgetUpdate from './_components/budget-update'
import { budgetRetrive } from '@/server/budget.actions'

interface BudgetUpdatePageProps {
    params: { id: number }
}
const BudgetUpdatePage: React.FC<BudgetUpdatePageProps> = async ({
    params
}) => {

    const budget = await budgetRetrive(params.id);

    return (
        <div className='relative'>
            <div className='mb-4 flex flex-row gap-x-2 md:gap-x-4'>
                <BackButton />
                <p className='text-3xl font-bold lg:text-[25px] xl:text-[30px]'>Update budget</p>
            </div>
            <div className='flex flex-row items-center justify-center'>
                <div className='max-w-[500px] w-full'>
                    <BudgetUpdate {...budget} />
                </div>
            </div>
        </div>
    )
}

export default BudgetUpdatePage