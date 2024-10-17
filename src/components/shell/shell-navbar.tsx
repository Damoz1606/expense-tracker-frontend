import React from 'react'

const ShellNavbar: React.FC<{
    children: React.ReactNode
}> = ({
    children
}) => {
        return (
            <aside className="fixed inset-y-0 left-0 z-10 hidden w-14 flex-col border-r bg-background sm:flex">
                {children}
            </aside>
        )
    }

export default ShellNavbar