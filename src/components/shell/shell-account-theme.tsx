'use client'

import { DropdownMenuPortal, DropdownMenuRadioGroup, DropdownMenuRadioItem, DropdownMenuSub, DropdownMenuSubContent, DropdownMenuSubTrigger } from '@/components/ui/dropdown-menu'
import { Moon, Sun } from 'lucide-react'
import { useTheme } from 'next-themes'
import React from 'react'

const ShellAccountTheme = () => {

    const { theme, setTheme } = useTheme()

    return (
        <DropdownMenuSub>
            <DropdownMenuSubTrigger>
                <Sun className="mr-2 h-4 w-4 transition-all inline dark:hidden" />
                <Moon className="mr-2 h-4 w-4 transition-all hidden dark:inline" />
                <span>Modo</span>
            </DropdownMenuSubTrigger>
            <DropdownMenuPortal>
                <DropdownMenuSubContent radioGroup=''>
                    <DropdownMenuRadioGroup value={theme} onValueChange={setTheme}>
                        <DropdownMenuRadioItem value='light'>
                            <span>Light</span>
                        </DropdownMenuRadioItem>
                        <DropdownMenuRadioItem value='dark'>
                            <span>Dark</span>
                        </DropdownMenuRadioItem>
                        <DropdownMenuRadioItem value='system'>
                            <span>System</span>
                        </DropdownMenuRadioItem>
                    </DropdownMenuRadioGroup>
                </DropdownMenuSubContent>
            </DropdownMenuPortal>
        </DropdownMenuSub>
    )
}

export default ShellAccountTheme