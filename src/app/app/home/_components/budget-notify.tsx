'use client'

import { BudgetActivity } from '@/server/budget.actions'
import { useRouter } from 'next/navigation'
import React, { useEffect } from 'react'
import { toast } from 'sonner'

interface BudgetNotifyProps {
    budgets: BudgetActivity[]
}
const BudgetNotify: React.FC<BudgetNotifyProps> = ({
    budgets
}) => {

    const router = useRouter();

    useEffect(() => {
        for (const budget of budgets) {
            if (budget.spend >= budget.budget) {
                console.log(budget);
                toast(`Budget without credits: ${budget.name}`, {
                    position: 'top-center',
                    duration: 1000,
                    action: {
                        label: "Increase credits",
                        onClick: () => router.push(`/app/budgets/${budget.id}/update`),
                    },
                });
            }
        }
    }, [budgets, router]);

    return null;
}

export default BudgetNotify