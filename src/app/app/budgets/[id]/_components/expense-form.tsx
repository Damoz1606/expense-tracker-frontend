'use client'

import React, { useState } from 'react'
import ExpenseSchema from '../_schema/expense.schema';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { FormField, FormItem, FormLabel, FormControl, FormMessage, Form } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Loader2 } from 'lucide-react';

interface ExpenseFormProps {
    budget: number;
}
const ExpenseForm: React.FC<ExpenseFormProps> = ({
    budget
}) => {

    const [loading, setLoading] = useState<boolean>(false);

    const form = useForm<z.infer<typeof ExpenseSchema>>({
        resolver: zodResolver(ExpenseSchema),
        defaultValues: {
            amount: 0,
            budget: budget,
            name: ""
        },
        values: {
            budget,
            amount: 0,
            name: ""
        }
    });

    const handleSubmit = async (data: { name: string; amount: number; budget: number; }) => {
        form.reset({
            amount: 0,
            name: "",
            budget: budget
        })
    }

    return (
        <Form {...form}>
            <form
                onSubmit={form.handleSubmit(handleSubmit)}>
                <Card>
                    <CardHeader>
                        <CardTitle>Add Expense</CardTitle>
                    </CardHeader>
                    <CardContent className='flex flex-col gap-y-2'>
                        <FormField
                            control={form.control}
                            name="name"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Expense Name</FormLabel>
                                    <FormControl>
                                        <Input placeholder="eg. Shoes" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="amount"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Expense amount</FormLabel>
                                    <FormControl>
                                        <Input type="number" step={0.01} placeholder="eg. 1000" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="budget"
                            render={({ field }) => (
                                <FormItem>
                                    <FormControl>
                                        <Input type="hidden" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </CardContent>
                    <CardFooter>
                        <Button
                            disabled={loading}
                            type="submit"
                            className='w-full'>
                            {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                            Add new expense
                        </Button>
                    </CardFooter>
                </Card>
            </form>
        </Form>
    )
}

export default ExpenseForm