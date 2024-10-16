interface BackendConfig {
    uri: string,
}

const config: BackendConfig = {
    uri: process.env.NEXT_URI || ''
}

export default Object.freeze(config);