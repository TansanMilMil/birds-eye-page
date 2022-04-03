import axios, { AxiosResponse } from "axios";
import { News } from "../types/News";
import { NewsGroup } from "../types/NewsGroup";
import { NewsReaction } from "../types/NewsReaction";

export class BirdsEyeApi {
    private static readonly API_ENDPOINT: string = 'https://birds-eye-api.ts-soda.net';

    public static getTodayNews(): Promise<AxiosResponse<News[], any>> {
        return axios.get(`${this.API_ENDPOINT}/news/today-news`);
    }

    public static getTrends(): Promise<AxiosResponse<News[], any>> {
        return axios.get(`${this.API_ENDPOINT}/news/trends`);
    }

    public static getReactions(id: number): Promise<AxiosResponse<NewsReaction[], any>> {
        const query = {
            id: id
        };
        return axios.get(`${this.API_ENDPOINT}/news/news-reactions`, { params: query });
    }        
}