import React from 'react'
import { ScrollArea } from '../ui/scroll-area'

const ShellBody: React.FC<{
    children: React.ReactNode
}> = ({
    children
}) => {
        return (
            <main className="relative w-full h-full">
                <ScrollArea className='!absolute top-0 bottom-0 left-0 right-0'>
                    <div className='p-4 sm:px-6 sm:py-0'>
                        {children}
                    </div>
                </ScrollArea>
            </main>
        )
    }

export default ShellBody