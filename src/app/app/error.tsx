'use client'

import React, { useEffect } from "react";

interface ErrorProps {
    error: Error & { digets?: string }
    reset: () => void;
}
const ErrorPage: React.FC<ErrorProps> = ({
    error,
    reset
}) => {

    useEffect(() => {
        console.error(error);
    }, [error]);


    return (
        <div className="w-full h-full flex flex-column justify-center items-center gap-y-4">
            <p className="font-bold text-2xl">Oops! There Was an Error.</p>
            <div className="div">
                <br />
                <p className="text-md text-left">- {error.message}</p>
                <p className="text-md text-left">- {error.stack}</p>
                {error.digets && <p className="text-md text-left">- {error.digets}</p>}
            </div>
        </div>
    )
}

export default ErrorPage