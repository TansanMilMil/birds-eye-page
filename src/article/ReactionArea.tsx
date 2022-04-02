import Box from "@mui/material/Box";
import CircularProgress from "@mui/material/CircularProgress/CircularProgress";
import { useEffect, useState } from "react";
import { BirdsEyeApi } from "../api/birds-eye-api";
import { NewsReaction } from "../types/newsReaction";
import { Reaction } from "./Reaction";
import CommentIcon from '@mui/icons-material/Comment';
import { IconButton } from "@mui/material";
import { CommentsDisabled } from "@mui/icons-material";
import styled from "styled-components";

type Props = {
    searchId: number;
}

export function ReactionArea({ searchId }: Props) {
    const [reactions, setReactions] = useState<NewsReaction[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [toggle, setToggle] = useState<boolean>(false);

    const getReactions = (e: React.MouseEvent<HTMLElement, MouseEvent>) => {
        e.preventDefault();

        setIsLoading(true);
        setToggle(true);
        BirdsEyeApi.getReactions(searchId)
            .then(result => {
                setIsLoading(false);
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
                    <Box sx={{ textAlign: 'right' }}>
                        <IconButton onClick={getReactions}>
                            <CommentIcon />
                        </IconButton>
                    </Box>
                </div>
            }
            { !isLoading && toggle && 
                <div>
                    {
                        reactions.map(reaction => 
                            <div>
                                <Reaction reaction={reaction}></Reaction>
                            </div>
                        )
                    }
                    {
                        reactions.length === 0 &&
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

const NoComment = styled.div`
    font-size: 0.9rem;
    margin: 1rem;
    text-align: center;
    color: gray;
`;