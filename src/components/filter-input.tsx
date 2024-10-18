'use client'

import { ListFilter } from 'lucide-react'
import React, { useEffect, useRef, useState } from 'react'
import { Button } from './ui/button'
import { DropdownMenu, DropdownMenuContent, DropdownMenuLabel, DropdownMenuRadioGroup, DropdownMenuRadioItem, DropdownMenuSeparator, DropdownMenuTrigger } from './ui/dropdown-menu';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';

interface FilterInputProps {
    title?: string;
    queryKey?: string;
    notDefault?: boolean;
    initial?: string;
    values: ({
        label: string;
        value: string;
    } | string)[];
}
const FilterInput: React.FC<FilterInputProps> = ({
    queryKey = 'filter',
    title = 'Filter by',
    notDefault,
    initial,
    values
}) => {

    const router = useRouter();
    const initialRender = useRef<boolean>(true);
    const searchParams = useSearchParams();
    const pathname = usePathname();

    const [value, setValue] = useState<string>(initial || "");

    useEffect(() => {
        if (initialRender.current) {
            initialRender.current = false;
            return;
        }
        const newQuery = new URLSearchParams(searchParams.toString());
        if (!newQuery) {
            router.push(`${pathname}`);
        } else {
            if (value.trim().length !== 0) {
                newQuery.set(queryKey, value);
            } else {
                newQuery.delete(queryKey);
            }
            router.push(`${pathname}?${newQuery.toString()}`);
        }
    }, [queryKey, value, router, pathname, searchParams]);


    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button
                    size="sm"
                    className="h-full gap-1 text-sm"
                >
                    <ListFilter className="h-3.5 w-3.5" />
                    <span className="sr-only sm:not-sr-only">Filter</span>
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
                <DropdownMenuLabel>{title}</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuRadioGroup value={value} onValueChange={setValue}>
                    {!notDefault && <DropdownMenuRadioItem value="">All</DropdownMenuRadioItem>}
                    {values.map(e => typeof e === 'string' ? <DropdownMenuRadioItem key={e} value={e}>{e}</DropdownMenuRadioItem> : <DropdownMenuRadioItem key={e.value} value={e.value}>{e.label}</DropdownMenuRadioItem>)}
                </DropdownMenuRadioGroup>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}

export default FilterInput