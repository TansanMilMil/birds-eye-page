import { News } from "./News";

export type NewsGroup = {
    sourceBy: string;
    scrapedUrl: string;
    news: News[];
}