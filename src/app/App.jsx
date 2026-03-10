import {ThemeProvider} from "@mui/material/styles";
import {theme} from "../shared/theme/theme.js";
import {CssBaseline} from "@mui/material";

export const App = () => {
    return (
        <ThemeProvider theme={theme}>
            <CssBaseline/>
        </ThemeProvider>
    );
};