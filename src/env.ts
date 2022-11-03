export class Env {
    public static BirdsEyeApiEndpoint(): string {
        console.log(process.env);
        return process.env.REACT_APP_BIRDS_EYE_API_ENDPOINT ? process.env.REACT_APP_BIRDS_EYE_API_ENDPOINT : 'https://birds-eye-api.ts-soda.net';
    }
}