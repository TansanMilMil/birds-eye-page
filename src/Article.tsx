import { News } from "./types/news";
import './Article.css';

export function Article (props: News) {
    return (
        <article>
            <div className="scrapedDateTime">{props.scrapedDateTime}</div>
            <div className="title">
                <a href={props.articleUrl} target="_blank" rel="noreferrer">{props.title}</a>
            </div>
            <div className="description">{props.description}</div>
            <div className="articleUrl">
                <a href={props.articleUrl} target="_blank" rel="noreferrer">{props.articleUrl}</a>
            </div>
        </article>
    );
}