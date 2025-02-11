import React from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card'
import { BudgetActivity } from '@/server/budget.actions'
import Link from 'next/link'
import { Progress } from './ui/progress'
import clsx from 'clsx'

type BudgetCardProps = BudgetActivity & {
    notLink?: boolean;
}
const BudgetCard: React.FC<BudgetCardProps> = ({
    id,
    notLink,
    budget,
    name,
    items,
    spend
}) => {

    const budgetPercentage = spend > budget ? 100 : spend / budget * 100;

    const content = <Card className='pb-4 h-fit'>
        <CardHeader className="pb-4">
            <div className="flex flex-row justify-between items-center">
                <div>
                    <CardTitle className="text-xl">{name}</CardTitle>
                    <CardDescription>{items} Item</CardDescription>
                </div>
                <span className='text-xl font-bold'>
                    ${budget}
                </span>
            </div>
        </CardHeader>
        <CardContent>
            <div className='w-full'>
                <div className={clsx("flex flex-row justify-between mb-1 text-xs", {
                    "text-muted-foreground": spend <= budget,
                    "text-red-500": spend > budget,
                    "font-bold": spend > budget,
                })}>
                    <span>${spend} Spend</span>
                    <span>${budget - spend} Remaining</span>
                </div>
                <Progress
                    value={budgetPercentage}
                    aria-label={`${budgetPercentage}% ${name}`} />
            </div>
        </CardContent>
    </Card>;

    return (
        notLink
            ? <>{content}</>
            : <Link href={`/app/budgets/${id}`}>{content}</Link>
    )
}

export default BudgetCard