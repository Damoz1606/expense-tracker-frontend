'use client'

import { usePathname } from 'next/navigation'
import React from 'react'
import { buttonVariants } from '../ui/button'
import clsx from 'clsx'
import Link from 'next/link'

interface ShellMobileNavButtonProps {
    children: React.ReactNode;
    href: string,
    label: string;
}
const ShellMobileNavButton: React.FC<ShellMobileNavButtonProps> = ({
    children,
    href,
    label
}) => {

    const path = usePathname();

    return (
        <Link
            href={href}
            className={clsx("rounded-lg", buttonVariants({
                variant: 'ghost',
                size: 'lg'
            }), {
                ['bg-muted']: path === href
            })}
            aria-label={label}
        >
            <div className='flex h-full w-full items-center justify-start gap-4'>
                {children}
                {label}
            </div>
        </Link>
    )
}

export default ShellMobileNavButton