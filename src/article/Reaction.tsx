import styled from "styled-components";
import { NewsReaction } from "../types/newsReaction";

type Props = {
    reaction: NewsReaction;
}

export function Reaction({ reaction }: Props) {
    return (
        <div>
            <ReactionArea>
                <Author>{reaction.author}</Author>
                <Comment>{reaction.comment}</Comment>
                <ScrapedDateTime>{reaction.scrapedDateTime}</ScrapedDateTime>
            </ReactionArea>
        </div>
    );
}

const Author = styled.div`
    color: #939393;
    font-size: 0.9rem;
`;

const Comment = styled.div`
    color: #333a0c;
    padding: 0.3rem;
    word-break: break-word;
    font-size: 0.9rem;
`;

const ReactionArea = styled.div`
    background-color: #ffffff;
    margin: 0.3rem 0;
    padding: 0.5rem 0.9rem;
    border-radius: 0.4rem;
`;

const ScrapedDateTime = styled.div`
    color: #d2ae0d;
    font-size: 0.9rem;
    margin: 0.3rem 0;
`;