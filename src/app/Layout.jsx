import {Outlet, useLocation, useNavigate} from "react-router-dom";
import {AppBar, Box, IconButton, Toolbar, Typography, useMediaQuery, useTheme} from "@mui/material";
import {Navigation} from "../widgets/navigation/ui/Navigation";
import LibraryBooksIcon from "@mui/icons-material/LibraryBooks";
import Person2Icon from '@mui/icons-material/Person2';

export const Layout = () => {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

    const getTitle = (pathname) => {
        if (pathname.startsWith("/main")) return "Главная";
        if (pathname.startsWith("/route")) return "Мой маршрут";
        if (pathname.startsWith("/practicum")) return "Практикум";
        if (pathname.startsWith("/monitoring")) return "Мониторинг";
        if (pathname.startsWith("/reflection")) return "Рефлексия";
        if (pathname.startsWith("/library")) return "Библиотека";
        if (pathname.startsWith("/profile")) return "Профиль";
        return "";
    };

    const location = useLocation();
    const navigate = useNavigate();

    return (
        <Box
            sx={{
                minHeight: "100vh",
                bgcolor: "surface",
                display: "flex",
                flexDirection: "column",
            }}
        >
            {(isMobile && <AppBar
                    position="sticky"
                    elevation={0}
                    sx={{
                        bgcolor: "surface",
                        borderBottom: "1px solid",
                        borderColor: "divider",
                    }}
                >
                    <Toolbar sx={{
                        justifyContent: "space-between",
                        color: "text.primary"
                    }}>
                        <Typography variant="titleLarge">
                            {getTitle(location.pathname)}
                        </Typography>

                        <Box sx={{display: "flex", gap: 1}}>
                            <IconButton onClick={() => navigate("/library")}>
                                <LibraryBooksIcon/>
                            </IconButton>

                            <IconButton onClick={() => navigate("/profile")}>
                                <Person2Icon/>
                            </IconButton>
                        </Box>
                    </Toolbar>
                </AppBar>
            )}
            <Navigation/>
            <Box sx={{
                p: 3,
                pb: "72px",
                position: "relative",
                overflow: "hidden"
            }}>
                <Outlet/>
            </Box>
        </Box>
    );
};