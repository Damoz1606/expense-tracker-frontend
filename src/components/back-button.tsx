'use client'

import { useRouter } from 'next/navigation'
import React from 'react'
import { Button } from './ui/button';
import { ChevronLeft } from 'lucide-react';

const BackButton = () => {

    const router = useRouter();

    return (
        <Button variant='ghost' onClick={router.back}>
            <ChevronLeft className='w-5 h-5' />
        </Button>
    )
}

export default BackButton