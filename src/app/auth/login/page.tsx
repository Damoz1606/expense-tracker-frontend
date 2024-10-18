'use client'

import React, { useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import { Button, buttonVariants } from '@/components/ui/button'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Loader2 } from 'lucide-react'
import LoginSchema from './_schema/login.schema'
import { toast } from '@/hooks/use-toast'
import { useRouter } from 'next/navigation'
import { signIn } from 'next-auth/react'

interface LoginPageProps {
    searchParams: { [key: string]: string | string[] | undefined }
}
const LoginPage: React.FC<LoginPageProps> = ({
    searchParams
}) => {

    const flag = typeof searchParams.flag === 'string' ? Boolean(searchParams.flag) : undefined;
    const initalRender = useRef<boolean>(false);

    if (flag !== undefined && !initalRender.current) {
        if (flag) {
            toast({
                title: "Your user was verified",
                description: 'Now you can login to the app.',
            });
        } else {
            toast({
                title: "Token invalid",
                description: 'The url used for email validation was not valid.',
                variant: 'destructive'
            });
        }
    }

    useEffect(() => {
        if (!initalRender.current) {
            initalRender.current = true;
        }
    }, [])


    const [loading, setLoading] = useState<boolean>(false);
    const router = useRouter();

    const form = useForm<z.infer<typeof LoginSchema>>({
        resolver: zodResolver(LoginSchema),
        defaultValues: {
            email: "",
            password: "",
        },
    });

    const handleSubmit = async (data: { email: string; password: string; }) => {
        setLoading(true);
        try {
            const res = await signIn('credentials', { redirect: false, ...data });
            if (res?.error) {
                throw new Error(res.error);
            }
            router.push('/app');
        } catch (error: any) {
            console.error(error);
            toast({
                title: "Ups! Something went wrong",
                description: 'Check your credentials, maybe something is wrong.',
                variant: 'destructive'
            });
        } finally {
            setLoading(false);
        }
    }

    return (
        <>
            <h1 className='text-2xl font-medium'>Login</h1>
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
                        name="password"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Password</FormLabel>
                                <FormControl>
                                    <Input type="password" placeholder="Password" {...field} />
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
                        Login
                    </Button>
                </form>
            </Form>
            <Link
                href='/auth/signup'
                className={buttonVariants({ variant: 'ghost' })}>
                Signup
            </Link>
        </>
    )
}

export default LoginPage