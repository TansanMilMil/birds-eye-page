import { TrendData } from "./TrendData";

export type TrendSeries = {
    type: string;
    data: TrendData[];
    name: string;
}