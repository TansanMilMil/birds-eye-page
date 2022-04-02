import axios, { AxiosResponse } from "axios";
import { News } from "../types/news";
import { NewsGroup } from "../types/newsGroup";
import { NewsReaction } from "../types/newsReaction";

export class BirdsEyeApi {
    private static readonly API_ENDPOINT: string = 'https://birds-eye-api.ts-soda.net';

    public static getTodayNews(): Promise<AxiosResponse<News[], any>> {
        return axios.get(`${this.API_ENDPOINT}/news/today-news`);
    }

    public static getTrends(): Promise<AxiosResponse<News[], any>> {
        return axios.get(`${this.API_ENDPOINT}/news/trends`);
    }

    public static getReactions(id: number): Promise<AxiosResponse<NewsReaction[], any>> {
        const data = {
            id: id
        };
        return axios.post(`${this.API_ENDPOINT}/news/scrape-ref`, data);
    }        
}