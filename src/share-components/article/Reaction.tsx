import styled from "styled-components";
import { NewsReaction } from "../../types/NewsReaction";
import reactStringReplace from 'react-string-replace';
import { Avatar, Box, Grow, Link } from "@mui/material";
import PersonIcon from "@mui/icons-material/Person";
import TwitterIcon from "@mui/icons-material/Twitter";
import { blue, indigo, lightBlue } from "@mui/material/colors";

type Props = {
    reaction: NewsReaction;
    newsTitle: string;
    index: number;
}

export function Reaction({ reaction, newsTitle, index }: Props) {
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

    const transitionDelay = () => (index * 100) + 'ms';
    
    return (
        <div>
            <Grow in={true} style={{ transitionDelay: transitionDelay() }}>
                <ReactionArea>
                    <Author>
                        {(() => {
                            switch (reaction.author) {
                                case 'twitter user':
                                    return <Avatar sx={{ width: 24, height: 24, bgcolor: lightBlue[500] }}><TwitterIcon /></Avatar>;
                                case 'hatena user':
                                    return <Avatar sx={{ width: 24, height: 24, bgcolor: blue[500] }}>B!</Avatar>;
                                default:
                                    return <Avatar sx={{ width: 24, height: 24 }}><PersonIcon /></Avatar>;
                            }
                        })()}                        
                        <Box sx={{ paddingLeft: '0.5rem' }}>{reaction.author}</Box>
                    </Author>
                    <Comment>{changeTitleColor(reaction.comment, newsTitle)}</Comment>
                    <Box sx={{ color: 'info.main' }}>
                        <ScrapedDateTime>{reaction.scrapedDateTime}</ScrapedDateTime>
                    </Box>
                </ReactionArea>
            </Grow>
        </div>
    );
}

const Author = styled.div`
    color: #939393;
    font-size: 0.9rem;
    display: flex;
    align-items: center;    
    margin: 0.3rem 0;
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