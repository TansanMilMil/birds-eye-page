import axios, { AxiosResponse } from "axios";
import { TrendData } from "../types/trendData";
import { TrendSeries } from "../types/trendsSeries";

export class TrendsApi {
    private static readonly API_ENDPOINT: string = 'https://72qwoctig2.execute-api.ap-northeast-1.amazonaws.com/prod';

    public static getTrends(keyword: string): Promise<AxiosResponse<any, any>> {
        return axios.get(`${this.API_ENDPOINT}`, { 
            params: {
                keyword: keyword
            }
        });
    }    
}