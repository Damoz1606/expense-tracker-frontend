interface AuthConfig {
    uri: string;
}

const config: AuthConfig = {
    uri: process.env.NEXT_URI_AUTH || ''
}

export default Object.freeze(config);