'use client'

import BudgetForm from '@/components/budget-form'
import { toast } from '@/hooks/use-toast'
import { BudgetRequest } from '@/server/budget.actions'
import React, { useState } from 'react'

interface BudgetUpdateProps {
    id: number;
}
const BudgetUpdate: React.FC<BudgetUpdateProps> = ({
    id
}) => {

    const [loading, setLoading] = useState(false);

    const handleUpdate = (data: BudgetRequest) => {
        setLoading(true);
        try {

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
        <BudgetForm
            title='Modify budget'
            label='Save budget'
            onSubmit={handleUpdate}
            loading={loading} />
    )
}

export default BudgetUpdate