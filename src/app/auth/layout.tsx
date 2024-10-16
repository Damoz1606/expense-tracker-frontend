import React from 'react'
import AuthContainer from './_components/auth-container'

const AuthLayout: React.FC<{ children: React.ReactNode }> = ({
    children
}) => {
    return (
        <AuthContainer>
            {children}
        </AuthContainer>
    )
}

export default AuthLayout