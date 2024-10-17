import React from 'react'

const ShellNavBottom: React.FC<{ children: React.ReactNode }> = ({
    children
}) => {
    return (
        <nav className="mt-auto flex flex-col items-center gap-4 px-2 sm:py-5">
            {children}
        </nav>
    )
}

export default ShellNavBottom