import {RouterProvider} from "react-router-dom";
import {ThemeProvider} from "@mui/material/styles";
import {theme} from "../shared/theme/theme.js";
import {router} from "./router.jsx";
import {CssBaseline} from "@mui/material";

export const App = () => {
    return (
        <ThemeProvider theme={theme}>
            <CssBaseline/>
            <RouterProvider router={router}/>
        </ThemeProvider>
    );
};