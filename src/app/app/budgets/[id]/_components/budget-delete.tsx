'use client'

import { Button } from '@/components/ui/button'
import { toast } from '@/hooks/use-toast'
import { budgetDelete } from '@/server/budget.actions'
import { Loader2, Trash } from 'lucide-react'
import { useRouter } from 'next/navigation'
import React, { useCallback, useState } from 'react'

interface BudgetDeleteProps {
    id: number
}
const BudgetDelete: React.FC<BudgetDeleteProps> = ({
    id
}) => {

    const [loading, setLoading] = useState(false);
    const router = useRouter();

    const handleClick = useCallback(async () => {
        setLoading(true);
        try {
            await budgetDelete(id);
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
        <Button
            variant='destructive'
            size='icon'
            onClick={handleClick}>
            {loading
                ? <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                : <Trash className='w-5 h-5' />}
        </Button>
    )
}

export default BudgetDelete