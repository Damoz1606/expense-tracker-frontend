'use client'

import { DropdownMenuItem } from '@/components/ui/dropdown-menu';
import { toast } from '@/hooks/use-toast';
import { LogOutIcon } from 'lucide-react';
import { signOut } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import React from 'react'

const ShellAccountLogout = () => {

    const router = useRouter();

    const handleLogout = async () => {
        try {
            await signOut();
            router.push('/auth/login');
        } catch (error: any) {
            toast({
                variant: 'destructive',
                title: "Uh oh! Something went wrong.",
                description: error.message
            });
        }
    }

    return (
        <DropdownMenuItem onClick={handleLogout}>
            <LogOutIcon className="mr-2 h-4 w-4" />
            <span>Logout</span>
        </DropdownMenuItem>
    )
}

export default ShellAccountLogout