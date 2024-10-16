declare module "next-auth" {
    interface User {
        id?: string;
        token: string;
    }

    interface Session {
        token: string;
    }
}

declare module "next-auth/jwt" {
    interface JWT {
        token: string;
    }
}