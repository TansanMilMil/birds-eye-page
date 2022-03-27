import axios, { AxiosResponse } from "axios";
import { News } from "../types/news";
import { NewsGroup } from "../types/newsGroup";

export class BirdsEyeApi {
    private static readonly API_ENDPOINT: string = 'https://birds-eye-api.ts-soda.net';

    public static getTodayNews(): Promise<AxiosResponse<News[], any>> {
        return axios.get(`${this.API_ENDPOINT}/news/today-news`);
    }
}