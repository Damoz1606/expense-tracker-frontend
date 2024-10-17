'use client'

import React, { useCallback, useState } from 'react'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from './ui/tooltip'
import { Loader2, Trash } from 'lucide-react'
import { Button } from './ui/button'
import { expenseDelete } from '@/server/expense.actions'
import { toast } from '@/hooks/use-toast'

interface ExpenseDeleteProps {
    id: number;
}
const ExpenseDelete: React.FC<ExpenseDeleteProps> = ({
    id
}) => {

    const [loading, setLoading] = useState(false);

    const handleClick = useCallback(async () => {
        setLoading(true);
        try {
            await expenseDelete(id);
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
    }, [id]);


    return (
        <TooltipProvider>
            <Tooltip>
                <TooltipTrigger asChild>
                    <Button
                        size='icon'
                        variant='destructive'
                        onClick={handleClick}>
                        {loading
                            ? <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                            : <Trash className='w-5 h-5' />}
                    </Button>
                </TooltipTrigger>
                <TooltipContent side="right" sideOffset={5}>
                    Eliminar
                </TooltipContent>
            </Tooltip>
        </TooltipProvider>
    )
}

export default ExpenseDelete