import { News } from "../types/news";
import './Article.css';
import { Chip, Zoom, Slide, Grow } from "@mui/material";

export function Article (props: News) {
    const clickSourceBy = (e: React.MouseEvent<HTMLElement, MouseEvent>) => {
        e.preventDefault();
        window.open(props.scrapedUrl, '_blank')
    }

    const transitionDelay = () => Math.floor(Math.random() * 400) + 'ms';

    return (
        <div>
            <Zoom in={true} style={{ transitionDelay: transitionDelay() }}>
                <article>
                    { props.articleImageUrl && 
                        <a href={props.articleUrl}>
                            <div className="image">
                                <img src={props.articleImageUrl} alt="" />
                            </div>
                        </a>
                    }
                    <div className="title">
                        <a href={props.articleUrl}>{props.title}</a>
                    </div>            
                    <div className="scrapedDateTime">{props.scrapedDateTime}</div>
                    <Chip label={props.sourceBy} size="small" onClick={clickSourceBy} />
                </article>
            </Zoom>
        </div>
    );
}