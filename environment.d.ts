export {}

declare global {
    namespace NodeJS {
        interface ProcessEnv {
            apikey: string;
        }
    }
}
