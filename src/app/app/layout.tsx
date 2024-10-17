import ShellBody from '@/components/shell/shell-body'
import ShellNavbar from '@/components/shell/shell-navbar'
import ShellNavMainContent from '@/components/shell/shell-nav-main-content'
import ShellNavBottom from '@/components/shell/shell-nav-bottom'
import ShellNavButton from '@/components/shell/shell-nav-button'
import ShellWrapper from '@/components/shell/shell-wrapper'
import { LayoutDashboard, Package2, PiggyBank, ReceiptText } from 'lucide-react'
import React from 'react'
import ShellAccount from '@/components/shell/shell-account'
import ShellAccountTheme from '@/components/shell/shell-account-theme'
import ShellAccountLogout from '@/components/shell/shell-account-logout'
import ShellMobileNavSheet from '@/components/shell/shell-mobile-nav-sheet'
import ShellHeader from '@/components/shell/shell-header'
import ShellMobileNavButton from '@/components/shell/shell-mobile-nav-button'

const navigation = [
    {
        label: 'Home',
        href: '/app/home',
        children: <LayoutDashboard className="h-5 w-5" />
    },
    {
        label: 'Budgets',
        href: '/app/budgets',
        children: <PiggyBank className="h-5 w-5" />
    },
    {
        label: 'Expenses',
        href: '/app/expenses',
        children: <ReceiptText className="h-5 w-5" />
    }
]

const AppLayout: React.FC<{
    children: React.ReactNode
}> = ({
    children
}) => {
        return (
            <ShellWrapper>
                <ShellNavbar>
                    <ShellNavMainContent>
                        <div className="group flex h-10 w-10 shrink-0 items-center justify-center gap-2 rounded-full bg-primary text-lg font-semibold text-primary-foreground md:text-base">
                            <Package2 className="h-5 w-5 transition-all group-hover:scale-110" />
                            <span className="sr-only">Acme Inc</span>
                        </div>
                        {navigation.map(e => <ShellNavButton key={e.href} {...e} />)}
                    </ShellNavMainContent>
                    <ShellNavBottom>
                        <ShellAccount>
                            <ShellAccountTheme />
                            <ShellAccountLogout />
                        </ShellAccount>
                    </ShellNavBottom>
                </ShellNavbar>
                <div className="flex flex-col sm:gap-4 sm:py-4 sm:pl-14 h-screen">
                    <ShellHeader>
                        <ShellMobileNavSheet>
                            <div className="ml-6 mb-4 group flex h-10 w-10 shrink-0 items-center justify-center gap-2 rounded-full bg-primary text-lg font-semibold text-primary-foreground md:text-base">
                                <Package2 className="h-5 w-5 transition-all group-hover:scale-110" />
                            </div>
                            {navigation.map(e => <ShellMobileNavButton key={e.href} {...e} />)}
                        </ShellMobileNavSheet>
                        <div className='max-w-full ml-auto sm:hidden'>
                            <ShellAccount side='bottom'>
                                <ShellAccountTheme />
                                <ShellAccountLogout />
                            </ShellAccount>
                        </div>
                    </ShellHeader>
                    <ShellBody>
                        {children}
                    </ShellBody>
                </div>
            </ShellWrapper>
        )
    }

export default AppLayout