import { Loader2 } from 'lucide-react'
import React from 'react'

const Loading = () => {
    return (
        <div className="w-full h-full px-4 py-8 relative">
            <div className="absolute top-0 left-0 right-0 bottom-0 flex items-center justify-center">
                <Loader2 className="h-8 w-8 animate-spin" />
            </div>
        </div>
    )
}

export default Loading