'use client'

import { Search } from 'lucide-react'
import React, { ChangeEvent, useEffect, useRef, useState } from 'react'
import { Input } from './ui/input'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { useDebounce } from '@/hooks/use-debounce'

interface SearchInputProps {
    queryKey?: string;
    value?: string;
}
const SearchInput: React.FC<SearchInputProps> = ({
    queryKey = 'search',
    value
}) => {

    const router = useRouter();
    const initialRender = useRef<boolean>(true);
    const searchParams = useSearchParams();
    const pathname = usePathname();

    const [text, setText] = useState<string>(value || "");
    const searchText = useDebounce(text);

    useEffect(() => {
        if (initialRender.current) {
            initialRender.current = false;
            return;
        }

        const newQuery = new URLSearchParams(searchParams.toString());
        if (!newQuery) {
            router.push(`${pathname}`);
        } else {
            if (searchText.trim().length !== 0) {
                newQuery.set(queryKey, searchText);
            } else {
                newQuery.delete(queryKey);
            }
            router.push(`${pathname}?${newQuery.toString()}`);
        }
    }, [queryKey, searchText, pathname, router, searchParams]);

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => setText(e.target.value);

    return (
        <>
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
                onChange={handleChange}
                type="search"
                placeholder="Search..."
                className="w-full rounded-lg bg-background pl-8 md:w-[200px] lg:w-[336px]"
            />
        </>
    )
}

export default SearchInput