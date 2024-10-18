import { validateCredential } from '@/server/auth.actions';
import { redirect } from 'next/navigation';

interface AuthCodePageProps {
    params: { key: string }
}
const AuthCodePage: React.FC<AuthCodePageProps> = async ({
    params
}) => {
    const flag = await validateCredential(params.key);
    redirect(`/auth/login?flag=${flag}`)
}

export default AuthCodePage