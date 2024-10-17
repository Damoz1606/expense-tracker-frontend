import React from 'react'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from './ui/table'
import { Badge } from './ui/badge'
import { Expense } from '@/server/expense.actions'
import dayjs from 'dayjs'
import ExpenseDelete from './expense-delete'

interface ExpenseTableProps {
    data: Expense[];
    showBudget?: boolean;
    showDate?: boolean;
    showAction?: boolean;
}
const ExpenseTable: React.FC<ExpenseTableProps> = ({
    data,
    showBudget,
    showDate,
    showAction
}) => {
    return (
        <Table className='relative w-full'>
            <TableHeader className='sticky top-0'>
                <TableRow>
                    <TableHead>Name</TableHead>
                    {
                        showDate && <TableHead className="hidden sm:table-cell">
                            Date
                        </TableHead>
                    }
                    {
                        showBudget && <TableHead className="hidden md:table-cell">
                            Budget
                        </TableHead>
                    }
                    <TableHead className="text-right">Amount</TableHead>
                    {
                        showAction && <TableHead className="text-right">Action</TableHead>
                    }
                </TableRow>
            </TableHeader>
            <TableBody>
                {
                    data.map(e => (
                        <TableRow key={e.id}>
                            <TableCell>
                                <div className="font-medium">{e.name}</div>
                            </TableCell>
                            {
                                showDate && <TableCell className="hidden sm:table-cell">
                                    {dayjs(e.createAt).format('YYYY-MM-DD')}
                                </TableCell>
                            }
                            {
                                showBudget && <TableCell className="hidden sm:table-cell">
                                    <Badge className="text-xs" variant="secondary">
                                        {e.budget}
                                    </Badge>
                                </TableCell>
                            }
                            <TableCell className="text-right">
                                ${e.amount}
                            </TableCell>
                            {
                                showAction && <TableCell className='flex justify-end'>
                                    <ExpenseDelete {...e} />
                                </TableCell>
                            }
                        </TableRow>
                    ))
                }
            </TableBody>
        </Table>
    )
}

export default ExpenseTable