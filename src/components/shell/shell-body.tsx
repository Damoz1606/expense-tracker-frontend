import React from 'react'

const ShellBody: React.FC<{
    children: React.ReactNode
}> = ({
    children
}) => {
        return (
            <main className="p-4 sm:px-6 sm:py-0">
                {children}
            </main>
        )
    }

export default ShellBody