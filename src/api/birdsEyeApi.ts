import axios from "axios";
import { AxiosResponse } from "axios";
import { Env } from "../env";
import { News } from "../types/news";
import { NewsReaction } from "../types/newsReaction";

export class BirdsEyeApi {
    private static readonly API_ENDPOINT: string = Env.BirdsEyeApiEndpoint();

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