import { GetServerSidePropsContext, NextApiRequest, NextApiResponse } from "next";
import { getServerSession, Session } from "next-auth";
import authOptions from "./auth.options";

/**
 * Retrives the current session, if it not exists throws error
 * @param args
 * @returns {Promise<Session>} Session object from NextAuth
 */
const auth = async (...args:
    | [GetServerSidePropsContext['req'], GetServerSidePropsContext['res']]
    | [NextApiRequest, NextApiResponse]
    | []
): Promise<Session> => {
    const session = await getServerSession(...args, authOptions);
    if (!session) throw new Error();
    return session;
}

export default auth;