import { User } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import authConfig from "../config/auth.config";

const provider = Credentials({
    name: 'credentials',
    credentials: {
        'email': { name: 'email', type: 'email' },
        'password': { name: 'password', type: 'password' }
    },
    authorize: async (credentials: Record<string, string> | undefined): Promise<User | null> => {
        if (!credentials) return null;
        try {
            const res = await fetch(authConfig.uri, {
                method: 'POST',
                body: JSON.stringify(credentials),
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            if (!res.ok) {
                const data = await res.json();
                throw new Error(data.message);
            }
            const json = await res.json();
            return { token: json.access }
        } catch (error) {
            console.error(error);
            throw error;
        }
    }
});

export default provider;