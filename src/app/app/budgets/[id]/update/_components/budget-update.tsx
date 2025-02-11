'use client'

import BudgetForm from '@/components/budget-form'
import { toast } from '@/hooks/use-toast'
import { BudgetRequest, budgetUpdate } from '@/server/budget.actions'
import { useRouter } from 'next/navigation'
import React, { useCallback, useState } from 'react'

interface BudgetUpdateProps extends BudgetRequest {
    id: number;
}
const BudgetUpdate: React.FC<BudgetUpdateProps> = ({
    id,
    ...budget
}) => {

    const [loading, setLoading] = useState(false);
    const router = useRouter();

    const handleUpdate = useCallback(async (data: BudgetRequest) => {
        setLoading(true);
        try {
            await budgetUpdate(id, data)
            router.back();
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
    }, [id, router]);

    return (
        <BudgetForm
            title='Modify budget'
            label='Save budget'
            onSubmit={handleUpdate}
            loading={loading}
            {...budget} />
    )
}

export default BudgetUpdate