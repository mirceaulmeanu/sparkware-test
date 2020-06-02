import { IMediaQueries, mediaQueries } from "./mediaQueries";

export interface ITheme {
    colors: IThemeColors;
    spacing: IThemeSpacing;
    media: IThemeMediaQueries;
    font: IThemeFont;
}

interface IThemeMediaQueries extends IMediaQueries {

}

interface IThemeFont {
}

interface IThemeColors {
}

interface IThemeSpacing {
}

/*
 * We don't export a theme object directly to avoid importing it by accident without dependency injection
 */
export const createTheme: () => ITheme = () => {
    let colors: IThemeColors = {};
    let spacing: IThemeSpacing = {};
    let media: IThemeMediaQueries = { ...mediaQueries };
    let font: IThemeFont = {};

    return {
        colors,
        spacing,
        media,
        font
    };
};
