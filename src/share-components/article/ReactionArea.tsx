import Box from "@mui/material/Box";
import CircularProgress from "@mui/material/CircularProgress/CircularProgress";
import { useState } from "react";
import { BirdsEyeApi } from "../../api/birdsEyeApi";
import { NewsReaction } from "../../types/newsReaction";
import { Reaction } from "./Reaction";
import CommentIcon from '@mui/icons-material/Comment';
import { Badge, Button, Dialog, DialogActions, DialogContent, DialogTitle, IconButton, Link } from "@mui/material";
import styled from "styled-components";
import { News } from "../../types/news";

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

    const textEllipsis = (text: string, maxLength: number) => {
        if (!text || text.length <= maxLength) {
            return text;
        }
        return text.substring(0, maxLength - 1)  + '...';
    };

    return (
        <div>
            <div>
                { reactionCount >= 1 &&
                    <Box sx={{ textAlign: 'right' }}>
                        <IconButton onClick={getReactions}>
                            <Badge badgeContent={reactionCount} color="secondary">
                                <CommentIcon />
                            </Badge>
                        </IconButton>
                    </Box>
                }
            </div>
            { toggle && 
                <div>
                    <Dialog
                        open={toggle}
                        onClose={removeReactions}
                        scroll={'paper'}
                        aria-labelledby="scroll-dialog-title"
                        aria-describedby="scroll-dialog-description">
                        <DialogTitle id="scroll-dialog-title">
                            <Title>
                                <Link href={news.articleUrl} target="_blank" rel="noreferrer">{news.title}</Link>
                            </Title>
                            <Description>{textEllipsis(news.description, 100)}</Description>
                        </DialogTitle>
                        <DialogContent dividers={true}>
                            <div
                                id="scroll-dialog-description"
                                tabIndex={-1}>
                                { isLoading && 
                                    <Box sx={{ textAlign: 'center', margin: '1rem' }}>
                                        <CircularProgress color="primary" />
                                    </Box>
                                }                                    
                                { !isLoading && 
                                    [...reactions].map((reaction, i) => 
                                        <Reaction 
                                            key={i} 
                                            reaction={reaction}
                                            newsTitle={news.title}
                                            index={i}></Reaction>
                                    )
                                }
                            </div>
                        </DialogContent>
                        <DialogActions>
                            <Button onClick={removeReactions}>Close</Button>
                        </DialogActions>
                    </Dialog>
                </div>
            }
        </div>
    );
}

const Title = styled.div`
    & a {
        &:link {
            text-decoration: none;
        }
        &:hover {
            text-decoration: underline;
        }        
    }
`;

const Description = styled.div`
    font-size: 0.8rem;
    color: #aaa;
`;
