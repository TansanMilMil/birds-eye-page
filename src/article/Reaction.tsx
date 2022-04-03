import styled from "styled-components";
import { NewsReaction } from "../types/newsReaction";
import reactStringReplace from 'react-string-replace';
import { Box, Link } from "@mui/material";

type Props = {
    reaction: NewsReaction;
    newsTitle: string;
}

export function Reaction({ reaction, newsTitle }: Props) {
    const changeTitleColor = (text: string, title: string) => {
        if (!text) return text;

        let dom: React.ReactNodeArray = [text];
        dom = reactStringReplace(dom, new RegExp('(' + title + ')', 'g'), (match, i) => 
            <Link key={match + i} href={match} target="_blank" rel="noreferrer" className="ref-title">{match}</Link>
        );
        dom = reactStringReplace(dom, /(https?:\/\/\S+)/g, (match, i) => (
            <Link key={match + i} href={match} target="_blank" rel="noreferrer">{match}</Link>
        ));
        dom = reactStringReplace(dom, /#(\S+)/g, (match, i) => (
            <Link key={match + i} href={`https://twitter.com/hashtag/${match}`} target="_blank" rel="noreferrer">#{match}</Link>
          ));        
        return dom;
    };
    
    return (
        <div>
            <ReactionArea>
                {/* <Author>{reaction.author}</Author> */}
                <Comment>{changeTitleColor(reaction.comment, newsTitle)}</Comment>
                <Box sx={{ color: 'info.main' }}>
                    <ScrapedDateTime>{reaction.scrapedDateTime}</ScrapedDateTime>
                </Box>
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
    font-size: 0.9rem;
    margin: 0.3rem 0;
`;