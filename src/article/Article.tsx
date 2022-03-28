import { News } from "../types/news";
import './Article.css';
import { Chip, Zoom, Slide, Grow } from "@mui/material";

type Props = {
    news: News;
}

export function Article ({ news }: Props) {
    const clickSourceBy = (e: React.MouseEvent<HTMLElement, MouseEvent>) => {
        e.preventDefault();
        window.open(news.scrapedUrl, '_blank')
    }

    const transitionDelay = () => Math.floor(Math.random() * 400) + 'ms';

    const textEllipsis = (text: string, maxLength: number) => {
        if (!text || text.length <= maxLength) {
            return text;
        }
        return text.substring(0, maxLength - 1)  + '...';
    };

    return (
        <div>
            <Zoom in={true} style={{ transitionDelay: transitionDelay() }}>
                <article>
                    { news.articleImageUrl && 
                        <a href={news.articleUrl}>
                            <div className="image">
                                <img src={news.articleImageUrl} alt="" />
                            </div>
                        </a>
                    }
                    <div className="title">
                        <a href={news.articleUrl}>{news.title}</a>
                    </div>
                    <div className="description">
                        { textEllipsis(news.description, 100) }
                    </div>
                    <div className="scrapedDateTime">{news.scrapedDateTime}</div>
                    { news.sourceBy &&
                        <Chip label={news.sourceBy} size="small" onClick={clickSourceBy} />
                    }
                </article>
            </Zoom>
        </div>
    );
}