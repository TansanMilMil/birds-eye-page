import { Box, CircularProgress } from "@mui/material";
import { useEffect, useState } from "react";
import { TrendsApi } from "../api/trends-api";
import { Error } from '@mui/icons-material';
import { TrendSeries } from "../types/trendsSeries";
import './Trends.css';
import { TrendData } from "../types/trendData";
declare var Highcharts: any;

export function Trends() {
    const KEYWORDS = ['news', 'cnn', 'trends'];
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [hasError, setHasError] = useState<boolean>(false);

    useEffect(() => {
        try {
            setIsLoading(true);
            generateSeriesAsync(KEYWORDS)
                .then(series => {
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

    async function generateSeriesAsync(keywords: string[]): Promise<TrendSeries[]> {
        let series: TrendSeries[] = [{
            type: 'wordcloud',
            name: 'trends',
            data: [],
        }];
        const results = await Promise.all(keywords.map(keyword => getTrends(keyword)));
        series[0].data = results.flat(1);

        return series;
    }

    async function getTrends(keyword: string): Promise<TrendData[]> {
        const res = await TrendsApi.getTrends(keyword);
        let result: any[] = res.data.result;
        let trend: TrendData[] = result.map(trend => {
            return {
                name: trend.name,
                weight: Math.floor(Math.random() * 5) + 1,
            };
        })
        return trend;
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
                text: 'Trends'
            }
        });
    }
    
    return (
        <div>
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
            <Box sx={{ marginBottom: '5rem' }}>
                <figure className="highcharts-figure">
                    <div id="container"></div>
                    <p className="highcharts-description"></p>
                </figure>
            </Box>
        </div>
    )
}