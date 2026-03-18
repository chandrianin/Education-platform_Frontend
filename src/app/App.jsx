import {RouterProvider} from "react-router-dom";
import {ThemeProvider} from "@mui/material/styles";
import {router} from "./router.jsx";
import {CssBaseline, useMediaQuery} from "@mui/material";
import {useMemo} from "react";
import {getTheme} from "../shared/theme/getTheme.js";

export const App = () => {
    const prefersDarkMode = useMediaQuery("(prefers-color-scheme: dark)");

    const theme = useMemo(
        () => getTheme(prefersDarkMode ? "dark" : "light"),
        [prefersDarkMode]
    );
    return (
        <ThemeProvider theme={theme}>
            <CssBaseline/>
            <RouterProvider router={router}/>
        </ThemeProvider>
    );
};