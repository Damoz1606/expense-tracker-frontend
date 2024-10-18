'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import { Button, buttonVariants } from '@/components/ui/button'
import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Loader2 } from 'lucide-react'
import SignupSchema from './_schemas/signup.schema'
import { toast } from '@/hooks/use-toast'
import { useRouter } from 'next/navigation'
import { userCreate } from '@/server/user.actions'

const SignupPage = () => {

    const [loading, setLoading] = useState<boolean>(false);
    const router = useRouter();

    const form = useForm<z.infer<typeof SignupSchema>>({
        resolver: zodResolver(SignupSchema),
        defaultValues: {
            email: "",
            username: "",
            password: "",
        },
    })

    const handleSubmit = async (data: { email: string, password: string, username: string }) => {
        setLoading(true);
        try {
            await userCreate(data);
            toast({
                title: "Left one step!",
                description: 'Check your mail and verify you account.',
            });
            router.push('/auth/login');
        } catch (error: any) {
            console.error(error);
            toast({
                title: "Ups! Something went wrong",
                description: 'Check the submitted form.',
                variant: 'destructive'
            });
        } finally {
            setLoading(false);
        }
    }

    return (
        <>
            <h1 className='text-2xl font-medium'>Sign up</h1>
            <Form {...form}>
                <form
                    onSubmit={form.handleSubmit(handleSubmit)}
                    className="flex flex-col gap-2">
                    <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Email</FormLabel>
                                <FormControl>
                                    <Input placeholder="pepitos@email.com" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="username"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Username</FormLabel>
                                <FormControl>
                                    <Input placeholder="username" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="password"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Password</FormLabel>
                                <FormControl>
                                    <Input type='password' placeholder="Password" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <Button
                        disabled={loading}
                        type="submit"
                        className="w-full mt-8">
                        {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                        Sign up
                    </Button>
                </form>
            </Form>
            <Link
                href='/auth/login'
                className={buttonVariants({ variant: 'ghost' })}>
                Login
            </Link>
        </>
    )
}

export default SignupPage