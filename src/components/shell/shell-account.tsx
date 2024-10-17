import { Button } from '@/components/ui/button'
import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import clsx from 'clsx'
import { CircleUser } from 'lucide-react'
import React from 'react'

const ShellAccount: React.FC<{
    children: React.ReactNode;
    side?: "right" | "top" | "bottom" | "left" | undefined
}> = ({
    children,
    side = 'right'
}) => {

        return (
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button
                        variant="ghost"
                        size="icon"
                        className={clsx("overflow-hidden rounded-lg")}
                        aria-label='Account'
                    >
                        <CircleUser className="size-5" />
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" side={side} sideOffset={5}>
                    {children}
                </DropdownMenuContent>
            </DropdownMenu>
        )
    }

export default ShellAccount