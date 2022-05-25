import { createTheme, PaletteOptions, Theme } from "@mui/material";
import { amber, blue, cyan, deepOrange, green, indigo, lightBlue, orange, pink, purple, red, teal, yellow } from "@mui/material/colors";
import { MuiThemeNames } from "./mui-theme-names";

export class MuiTheme {
  public static readonly themeItemList = [
    {
      themeName: MuiThemeNames.Nature,
      themePalette: {
          primary: teal,
          secondary: pink,
      },
    },
    {
      themeName: MuiThemeNames.Aqua,
      themePalette: {
          primary: blue,
          secondary: deepOrange,
      },
    },
    {
      themeName: MuiThemeNames.Horror,
      themePalette: {
          primary: purple,
          secondary: red,
      },
    },
    {
      themeName: MuiThemeNames.Sunny,
      themePalette: {
          primary: orange,
          secondary: blue,
      },
    },
  ];

  public static readonly DefaultThemeName = MuiThemeNames.Nature;

  public static GetDefaultTheme(): PaletteOptions {
    return this.themeItemList.find(x => x.themeName === this.DefaultThemeName)!.themePalette;
  }

  public static GetTheme(themeName: string): PaletteOptions {
    this.AssertTheme(themeName);
    const themeItem = this.themeItemList.find(x => x.themeName === themeName);
    return themeItem!.themePalette;
  }

  public static AssertTheme(themeName: string | null): void {
    if (!themeName || !this.themeItemList.some(x => x.themeName === themeName)) {
      throw new Error(`themeName: ${themeName} is not exist.`);
    }
  }
}