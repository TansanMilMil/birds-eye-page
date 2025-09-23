import { Alert, Box, CircularProgress } from "@mui/material";
import { useEffect, useState } from "react";
import { TrendSeries } from "../../types/trendsSeries";
import { TrendData } from "../../types/trendData";
import { BirdsEyeApi } from "../../api/birdsEyeApi";
import { News } from "../../types/news";
import { MainArticle } from "../../share-components/article/MainArticle";
import { Masonry } from "@mui/lab";
import styled from "styled-components";
declare var Highcharts: any;

export function Trends() {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [hasError, setHasError] = useState<boolean>(false);
  const [newsList, setNewsList] = useState<News[]>([]);

  useEffect(() => {
    try {
      setIsLoading(true);
      BirdsEyeApi.getTrends()
        .then((result) => {
          const newsList: News[] = result.trends.map((trend) => {
            trend.scrapedDateTime = new Date(
              Date.parse(trend.scrapedDateTime)
            ).toLocaleString();
            return trend;
          });
          setNewsList(newsList);
          let series: TrendSeries[] = generateSeriesAsync(result.trends);
          renderCharts(series);
          setIsLoading(false);
        })
        .catch((e) => {
          throw e;
        });
    } catch {
      setHasError(true);
      setIsLoading(false);
    }
  }, []);

  function generateSeriesAsync(newsList: News[]): TrendSeries[] {
    const newsListReversed: News[] = JSON.parse(JSON.stringify(newsList));
    newsListReversed.reverse();
    let series: TrendSeries[] = [
      {
        type: "wordcloud",
        name: "trends",
        data: [],
      },
    ];
    let trend: TrendData[] = newsListReversed.map((trend, i) => {
      return {
        name: trend.title,
        weight: i + 1,
      };
    });
    series[0].data = trend;

    return series;
  }

  function renderCharts(series: TrendSeries[]) {
    Highcharts.chart("container", {
      accessibility: {
        screenReaderSection: {
          beforeChartFormat:
            "<h5>{chartTitle}</h5>" +
            "<div>{chartSubtitle}</div>" +
            "<div>{chartLongdesc}</div>" +
            "<div>{viewTableButton}</div>",
        },
      },
      series: series,
      title: {
        text: "Current Trends",
      },
    });
  }

  return (
    <Charts>
      <Box sx={{ maxWidth: "1200px", margin: "0 auto" }}>
        {hasError && <Alert severity="error">network error...</Alert>}
        {isLoading && (
          <Box sx={{ textAlign: "center", margin: "3rem" }}>
            <CircularProgress color="secondary" />
          </Box>
        )}
        <Box sx={{ marginBottom: "1rem" }}>
          <figure className="highcharts-figure">
            <div id="container"></div>
            <p className="highcharts-description"></p>
          </figure>
        </Box>
        <Masonry
          columns={{ xs: 1, sm: 2, md: 4, lg: 5 }}
          spacing={{ xs: 1, sm: 1, md: 1 }}
        >
          {newsList.map((news, i) => (
            <MainArticle key={i} news={news}></MainArticle>
          ))}
        </Masonry>
      </Box>
    </Charts>
  );
}

const Charts = styled.div`
  & .highcharts-figure,
  .highcharts-data-table table {
    min-width: 320px;
    max-width: 800px;
    margin: 1em auto;
  }

  & .highcharts-data-table table {
    font-family: Verdana, sans-serif;
    border-collapse: collapse;
    border: 1px solid #ebebeb;
    margin: 10px auto;
    text-align: center;
    width: 100%;
    max-width: 500px;
  }

  & .highcharts-data-table caption {
    padding: 1em 0;
    font-size: 1.2em;
    color: #555;
  }

  & .highcharts-data-table th {
    font-weight: 600;
    padding: 0.5em;
  }

  & .highcharts-data-table td,
  .highcharts-data-table th,
  .highcharts-data-table caption {
    padding: 0.5em;
  }

  & .highcharts-data-table thead tr,
  .highcharts-data-table tr:nth-child(even) {
    background: #f8f8f8;
  }

  & .highcharts-data-table tr:hover {
    background: #f1f7ff;
  }

  & svg.highcharts-root {
    border-radius: 1rem;
  }
`;
