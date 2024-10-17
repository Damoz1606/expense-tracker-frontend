import React from 'react'

interface ShellNavMainContentProps {
    children: React.ReactNode
}
const ShellNavMainContent: React.FC<ShellNavMainContentProps> = ({
    children
}) => {
    return (
        <nav className="flex flex-col items-center gap-4 px-2 sm:py-5">
            {children}
        </nav>
    )
}

export default ShellNavMainContent