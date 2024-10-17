import { PanelLeft } from 'lucide-react'
import React from 'react'
import { Button } from '../ui/button'
import { SheetTrigger, SheetContent, Sheet } from '../ui/sheet'

const ShellMobileNavSheet: React.FC<{
    children: React.ReactNode
}> = ({
    children
}) => {
        return (
            <Sheet>
                <SheetTrigger asChild>
                    <Button size="icon" variant="outline" className="sm:hidden">
                        <PanelLeft className="h-5 w-5" />
                        <span className="sr-only">Toggle Menu</span>
                    </Button>
                </SheetTrigger>
                <SheetContent side="left" className="sm:max-w-xs">
                    <nav className="grid gap-2 text-lg font-medium">
                        {children}
                    </nav>
                </SheetContent>
            </Sheet>
        )
    }

export default ShellMobileNavSheet