import { Box, IconButton } from "@mui/material";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import styled from "styled-components";
import { changeThemePalette } from "../../app/themeSlice";
import { LocalStorageKey } from "../../localStorage/localStorageKey";
import { MuiTheme } from "../../mui-theme";
import { MuiThemeNames } from "../../mui-theme-names";
import ForestIcon from '@mui/icons-material/Forest';
import BeachAccessIcon from '@mui/icons-material/BeachAccess';
import MosqueIcon from '@mui/icons-material/Mosque';
import LightModeIcon from '@mui/icons-material/LightMode';

export function ThemeColorSetting() {
    const dispatch = useDispatch();

    useEffect(() => {
        const themeName: string | null = localStorage.getItem(LocalStorageKey.ThemeName);
        if (themeName) {
            MuiTheme.AssertTheme(themeName);
            dispatch(changeThemePalette(themeName));
        }
    }, []);
    
    const changeTheme = (themeName: string) => {
        MuiTheme.AssertTheme(themeName);
        localStorage.setItem(LocalStorageKey.ThemeName, themeName);
        dispatch(changeThemePalette(themeName));
    }

    return (<div>
        <Box sx={{ textAlign: 'center' }}>
            <IconButton onClick={() => changeTheme(MuiThemeNames.Nature)}>
                <ForestIcon />
            </IconButton>
            <IconButton onClick={() => changeTheme(MuiThemeNames.Aqua)}>
                <BeachAccessIcon />
            </IconButton>
            <IconButton onClick={() => changeTheme(MuiThemeNames.Horror)}>
                <MosqueIcon />
            </IconButton>
            <IconButton onClick={() => changeTheme(MuiThemeNames.Sunny)}>
                <LightModeIcon />
            </IconButton>
        </Box>
    </div>);
}
