import React from 'react'

const AuthContainer: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    return (
        <div className="flex flex-col gap-y-4 max-w-[70%] md:max-w-[30%] h-screen justify-center mx-auto my-0">
            {children}
        </div>
    )
}

export default AuthContainer