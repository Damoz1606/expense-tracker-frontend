import React from 'react'

interface ShellWrapperProps {
    children: React.ReactNode
}
const ShellWrapper: React.FC<ShellWrapperProps> = ({
    children
}) => {
    return (
        <div className="flex min-h-screen w-full flex-col bg-muted/40">
            {children}
        </div>
    )
}

export default ShellWrapper