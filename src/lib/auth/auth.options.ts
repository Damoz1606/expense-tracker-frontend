import { AuthOptions } from 'next-auth';
import CredentialProvider from './credential.provider'

const options: AuthOptions = {
    providers: [CredentialProvider],
    secret: process.env.NEXT_NEXTAUTH_SECRET,
    session: {
        strategy: 'jwt'
    },
    pages: {
        signIn: '/auth/login'
    },
    callbacks: {
        jwt: async ({ token, user }: any) => {
            if (user) {
                try {
                    return { token, ...user }
                } catch (error) {
                    console.error(error);
                    throw error;
                }
            }
            return token;
        },
        session: async ({ session, token }: any) => {
            if (token) {
                session.token = token.token;
            }
            return session;
        },
    }
}

export default options;