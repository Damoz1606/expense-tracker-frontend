'use client'

import { buttonVariants } from '@/components/ui/button'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import clsx from 'clsx';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React from 'react'

interface ShellNavButtonProps {
    children: React.ReactNode;
    href: string,
    label: string;
}
const ShellNavButton: React.FC<ShellNavButtonProps> = ({ children, label, href }) => {

    const path = usePathname();

    return (
        <TooltipProvider>
            <Tooltip>
                <TooltipTrigger asChild>
                    <Link
                        href={href}
                        className={clsx("rounded-lg", buttonVariants({
                            variant: 'ghost',
                            size: 'icon'
                        }), {
                            ['bg-muted']: path === href
                        })}
                        aria-label={label}
                    >
                        {children}
                    </Link>
                </TooltipTrigger>
                <TooltipContent side="right" sideOffset={5}>
                    {label}
                </TooltipContent>
            </Tooltip>
        </TooltipProvider>
    )
}

export default ShellNavButton