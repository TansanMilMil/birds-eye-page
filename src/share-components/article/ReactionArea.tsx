import Box from "@mui/material/Box";
import CircularProgress from "@mui/material/CircularProgress/CircularProgress";
import { useEffect, useState } from "react";
import { BirdsEyeApi } from "../../api/BirdsEyeApi";
import { NewsReaction } from "../../types/NewsReaction";
import { Reaction } from "./Reaction";
import CommentIcon from '@mui/icons-material/Comment';
import { Badge, IconButton } from "@mui/material";
import { CommentsDisabled, Newspaper } from "@mui/icons-material";
import styled from "styled-components";
import { News } from "../../types/News";

type Props = {
    news: News;
    reactionCount: number;
}

export function ReactionArea({ news, reactionCount }: Props) {
    const [reactions, setReactions] = useState<NewsReaction[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [toggle, setToggle] = useState<boolean>(false);

    const getReactions = (e: React.MouseEvent<HTMLElement, MouseEvent>) => {
        e.preventDefault();

        setIsLoading(true);
        setToggle(true);
        BirdsEyeApi.getReactions(news.id)
            .then(result => {
                setIsLoading(false);
                result.data = result.data.map(r => {
                    r.scrapedDateTime = new Date(Date.parse(r.scrapedDateTime)).toLocaleString();
                    return r;
                })
                setReactions(result.data);
            })
            .catch(e => {
                setIsLoading(false);
            });
    };

    const removeReactions = (e: React.MouseEvent<HTMLElement, MouseEvent>) => {
        e.preventDefault();

        setToggle(false);
    };

    return (
        <div>
            { isLoading && 
                <Box sx={{ textAlign: 'center', margin: '1rem' }}>
                <CircularProgress color="primary" />
                </Box>
            }
            { !isLoading && !toggle &&
                <div>
                    { reactionCount >= 1 &&
                        <Box sx={{ textAlign: 'right' }}>
                            <IconButton onClick={getReactions}>
                                <Badge badgeContent={reactionCount} color="primary">
                                    <CommentIcon />
                                </Badge>
                            </IconButton>
                        </Box>
                    }
                </div>
            }
            { !isLoading && toggle && 
                <div>
                    <ReactionsWrap>
                        { reactions.map((reaction, i) => 
                            <Reaction 
                                key={i} 
                                reaction={reaction}
                                newsTitle={news.title}
                                index={i}></Reaction>
                        )}
                    </ReactionsWrap>
                        { reactions.length === 0 &&
                            <NoComment>no comment...</NoComment>
                        }
                    <Box sx={{ textAlign: 'right' }}>
                        <IconButton onClick={removeReactions}>
                            <CommentsDisabled />
                        </IconButton>
                    </Box>
                </div>
            }
        </div>
    );
}

const ReactionsWrap = styled.div`
    max-height: 500px;
    overflow: auto;
`;

const NoComment = styled.div`
    font-size: 0.9rem;
    margin: 1rem;
    text-align: center;
    color: gray;
`;