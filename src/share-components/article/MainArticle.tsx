import { News } from "../../types/News";
import { Box, Chip, Link, Zoom } from "@mui/material";
import styled from 'styled-components';
import { ReactionArea } from "./ReactionArea";

type Props = {
    news: News;
    isDisplayReactions?: boolean;
}

export function MainArticle ({ news, isDisplayReactions = false }: Props) {
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
                <Article>
                    { news.articleImageUrl && 
                        <a href={news.articleUrl}>
                            <Image>
                                <img src={news.articleImageUrl} alt="" />
                            </Image>
                        </a>
                    }
                    <Title>
                        <Link href={news.articleUrl} sx={{ color: 'primary.dark' }}>{news.title}</Link>
                    </Title>
                    <Description>
                        { textEllipsis(news.description, 100) }
                    </Description>
                    <Box sx={{ color: 'secondary.main' }}>
                        <ScrapedDateTime>{news.scrapedDateTime}</ScrapedDateTime>
                    </Box>
                    { news.sourceBy &&
                        <Chip label={news.sourceBy} size="small" onClick={clickSourceBy} />
                    }
                    { isDisplayReactions &&
                        <ReactionArea 
                        news={news} 
                        reactionCount={news.reactionCount}></ReactionArea>
                    }
                </Article>
            </Zoom>
        </div>
    );
}

const Article = styled.article`
    background-color: #f5f5f5;
    padding: 0.5rem 2rem;
    border-radius: 3.8rem;
    border-color: #a7a750;
    & a {
        &:link {
            text-decoration: none;
        }
        &:hover {
            text-decoration: underline;
        }
        &:visited {
            color: #aaa;
        }
    }
`;

const Title = styled.div`
    font-size: 1.2rem;
    font-weight: bold;
    margin: 0.3rem 0;
`;

const Description = styled.div`
    font-size: 0.8rem;
    color: #939393;
    overflow: hidden;
`;

const ScrapedDateTime = styled.div`
    font-size: 0.9rem;
    margin: 0.3rem 0;
`;

const Image = styled.div`
    height: 10rem;
    margin: 0.4rem 0;

    & > img {
        object-fit: cover;
        height: 10rem;
        width: 100%;
        border-radius: 0.3rem;
    }
`;
