'use client'

import React, { useState } from 'react'
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { FormField, FormItem, FormLabel, FormControl, FormMessage, Form } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Loader2 } from 'lucide-react';
import BudgetSchema from '../app/schemas/budget.schema';
import { BudgetRequest } from '@/server/budget.actions';

interface BudgetFormProps extends Partial<BudgetRequest> {
    title: string;
    label: string;
    loading?: boolean
    onSubmit: (data: BudgetRequest) => void;
}
const BudgetForm: React.FC<BudgetFormProps> = ({
    label,
    title,
    budget,
    name,
    loading,
    onSubmit
}) => {

    const form = useForm<z.infer<typeof BudgetSchema>>({
        resolver: zodResolver(BudgetSchema),
        defaultValues: {
            budget: 0,
            name: ""
        },
        values: {
            budget: budget || 0,
            name: name || ""
        }
    });

    const handleSubmit = async (data: { name: string; budget: number; }) => {
        onSubmit(data);
        form.reset({ name: "", budget: 0 });
    }

    return (
        <Form {...form}>
            <form
                onSubmit={form.handleSubmit(handleSubmit)}>
                <Card>
                    <CardHeader>
                        <CardTitle>{title}</CardTitle>
                    </CardHeader>
                    <CardContent className='flex flex-col gap-y-2'>
                        <FormField
                            control={form.control}
                            name="name"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Budget name</FormLabel>
                                    <FormControl>
                                        <Input placeholder="eg. Shopping" {...field} />
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
                                    <FormLabel>Budget amount</FormLabel>
                                    <FormControl>
                                        <Input type="number" step={0.01} placeholder="eg. 1000" {...field} />
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
                            {label}
                        </Button>
                    </CardFooter>
                </Card>
            </form>
        </Form>
    )
}

export default BudgetForm