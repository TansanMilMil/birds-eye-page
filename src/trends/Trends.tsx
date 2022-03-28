import { Box, CircularProgress } from "@mui/material";
import { useEffect, useState } from "react";
import { TrendsApi } from "../api/trends-api";
import { Error } from '@mui/icons-material';
import { TrendSeries } from "../types/trendsSeries";
import './Trends.css';
import { TrendData } from "../types/trendData";
import { BirdsEyeApi } from "../api/birds-eye-api";
import { News } from "../types/news";
import { Article } from "../article/Article";
import { Masonry } from "@mui/lab";
import { reverse } from "dns";
declare var Highcharts: any;

export function Trends() {
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [hasError, setHasError] = useState<boolean>(false);
    const [newsList, setNewsList] = useState<News[]>([]);

    useEffect(() => {
        try {
            setIsLoading(true);
            BirdsEyeApi.getTrends()
                .then(res => {
                    setNewsList(res.data);
                    let series: TrendSeries[] = generateSeriesAsync(res.data);
                    renderCharts(series);
                    setIsLoading(false);
                })
                .catch(e => { throw e; });
        }
        catch {
            setHasError(true);
            setIsLoading(false);
        }
    }, []);

    function generateSeriesAsync(newsList: News[]): TrendSeries[] {
        const newsListReversed: News[] = JSON.parse(JSON.stringify(newsList));
        newsListReversed.reverse();
        let series: TrendSeries[] = [{
            type: 'wordcloud',
            name: 'trends',
            data: [],
        }];        
        let trend: TrendData[] = newsListReversed.map((trend, i) => {
            return {
                name: trend.title,
                weight: i + 1,
            };
        })        
        series[0].data = trend;

        return series;
    }

    function renderCharts(series: TrendSeries[]) {
        Highcharts.chart('container', {
            accessibility: {
                screenReaderSection: {
                    beforeChartFormat: '<h5>{chartTitle}</h5>' +
                        '<div>{chartSubtitle}</div>' +
                        '<div>{chartLongdesc}</div>' +
                        '<div>{viewTableButton}</div>'
                }
            },
            series: series,
            title: {
                text: 'Current Trends'
            }
        });
    }
    
    return (
        <div>
            <Box sx={{ maxWidth: '1200px', margin: '0 auto' }}>
                { hasError &&
                    <Box sx={{ textAlign: 'center', color: 'error.dark' }}>
                    <Error fontSize="large" />
                    <div>network error...</div>
                    </Box>
                }
                { isLoading && 
                    <Box sx={{ textAlign: 'center', margin: '3rem' }}>
                    <CircularProgress color="secondary" />
                    </Box>
                }
                <Box sx={{ marginBottom: '1rem' }}>
                    <figure className="highcharts-figure">
                        <div id="container"></div>
                        <p className="highcharts-description"></p>
                    </figure>
                </Box>
                <Masonry columns={{ xs: 2, sm: 3, md: 5 }} spacing={{ xs: 1, sm: 1, md: 1 }}>
                    {newsList.map((news, i) => 
                        <Article 
                        key={i}
                        news={news}></Article>
                    )}                
                </Masonry>
            </Box>
        </div>
    )
}