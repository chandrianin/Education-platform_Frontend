import {createTheme} from "@mui/material/styles";
import materialTokens from "./material-theme.json";


export const getTheme = (mode) => {
    const scheme = materialTokens.schemes[mode];


    return createTheme({
        palette: {
            mode,

            primary: {
                main: scheme.primary,
                contrastText: scheme.onPrimary
            },
            secondary: {
                main: scheme.secondary,
                contrastText: scheme.onSecondary
            },

            error: {
                main: scheme.error,
                contrastText: scheme.onError
            },

            background: {
                default: scheme.background,
                paper: scheme.surface
            },

            text: {
                primary: scheme.onSurface,
                secondary: scheme.onSurfaceVariant
            },

            onSurface: scheme.onSurface,
            onSurfaceVariant: scheme.onSurfaceVariant,

            divider: scheme.outlineVariant,

            primaryContainer: scheme.primaryContainer,
            onPrimaryContainer: scheme.onPrimaryContainer,
            surface: scheme.surface,
            surfaceContainer: scheme.surfaceContainer,
            surfaceContainerVariant: scheme.surfaceContainerVariant,
            surfaceContainerLow: scheme.surfaceContainerLow,
            surfaceContainerHigh: scheme.surfaceContainerHigh,
            surfaceContainerHighest: scheme.surfaceContainerHighest
        },
        typography: {
            fontFamily: [
                "Google Sans",
                "Roboto",
                "Arial",
                "sans-serif"
            ].join(","),

            titleMedium: {
                fontSize: "1rem",
                fontWeight: 500
            },

            bodyMedium: {
                fontSize: "0.875rem",
                fontWeight: 400
            }
        },
        components: {
            MuiTypography: {
                defaultProps: {
                    variantMapping: {
                        titleMedium: "h6",
                        bodyMedium: "p"
                    }
                }
            }
        }


    });
}
