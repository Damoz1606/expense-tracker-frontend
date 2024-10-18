'use client'

import { ChevronLeft, ChevronRight } from 'lucide-react'
import React, { useCallback, useEffect, useRef } from 'react'
import { Button } from './ui/button'
import { PaginationContent, PaginationItem, Pagination as ShadcnPagination } from './ui/pagination'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'

interface PaginationProps {
    top: number;
    page: number;
    queryKey?: string;
}
const Pagination: React.FC<PaginationProps> = ({
    top,
    page,
    queryKey = 'page'
}) => {

    const router = useRouter();
    const initialRender = useRef<boolean>(true);
    const searchParams = useSearchParams();
    const pathname = usePathname();

    useEffect(() => {
        if (initialRender.current) {
            initialRender.current = false;
            return;
        }
    }, []);

    const handleClick = useCallback((dir: boolean) => {
        const newPage = page + (dir ? 1 : -1);
        const newQuery = new URLSearchParams(searchParams.toString());
        if (1 <= newPage && newPage <= top) {
            newQuery.set(queryKey, newPage.toString());
            router.push(`${pathname}?${newQuery.toString()}`);
        } else {
            newQuery.delete(queryKey);
        }
    }, [page, pathname, queryKey, router, searchParams, top]);

    return (
        <ShadcnPagination className="mx-auto w-auto">
            <PaginationContent>
                {
                    page > 1 && <PaginationItem>
                        <Button size="icon" variant="outline" className="h-6 w-6" onClick={() => handleClick(false)}>
                            <ChevronLeft className="h-3.5 w-3.5" />
                            <span className="sr-only">Previous Order</span>
                        </Button>
                    </PaginationItem>
                }
                <span className='text-sm'>Page: {page} / {top}</span>
                {
                    page < top && <PaginationItem>
                        <Button size="icon" variant="outline" className="h-6 w-6" onClick={() => handleClick(true)}>
                            <ChevronRight className="h-3.5 w-3.5" />
                            <span className="sr-only">Next Order</span>
                        </Button>
                    </PaginationItem>
                }
            </PaginationContent>
        </ShadcnPagination>
    )
}

export default Pagination