import {useState} from "react";
import {useLocation, useNavigate} from "react-router-dom";
import {Box, Tabs, Tab, Avatar, BottomNavigation, BottomNavigationAction, useTheme, useMediaQuery} from "@mui/material";
import HomeIcon from '@mui/icons-material/Home';
import MapIcon from '@mui/icons-material/Map';
import SchoolIcon from '@mui/icons-material/School';
import AssessmentIcon from '@mui/icons-material/Assessment';
import PsychologyIcon from '@mui/icons-material/Psychology';
import LibraryBooksIcon from '@mui/icons-material/LibraryBooks';

export const Navigation = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const [value, setValue] = useState(location.pathname);
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

    const tabs = [
        {label: "Главная", path: "/main", icon: <HomeIcon/>},
        {label: "Маршрут", path: "/route", icon: <MapIcon/>},
        {label: "Практикум", path: "/practicum", icon: <SchoolIcon/>},
        {label: "Мониторинг", path: "/monitoring", icon: <AssessmentIcon/>},
        {label: "Рефлексия", path: "/reflection", icon: <PsychologyIcon/>},
        {label: "Библиотека", path: "/library", icon: <LibraryBooksIcon/>},
    ];
    const mobileTabs = tabs.filter(tab => tab.path !== "/library");

    const isProfileActive = location.pathname.startsWith("/profile");

    const handleNavigate = (newPath) => {
        setValue(newPath);
        navigate(newPath);
    };

    if (isMobile) {
        // BottomNavigation для телефона
        return (
            <Box sx={{position: "fixed", bottom: 0, left: 0, right: 0, zIndex: 1300}}>
                <BottomNavigation
                    value={value}
                    onChange={(_, newValue) => handleNavigate(newValue)}
                    showLabels={false}
                    sx={{
                        position: "fixed",
                        bottom: 0,
                        left: 0,
                        right: 0,
                        zIndex: 1300,
                        height: 64,
                        px: 1,
                        bgcolor: "surfaceContainerHigh",
                    }}
                >
                    {mobileTabs.map(tab => (
                        <BottomNavigationAction
                            key={tab.path}
                            value={tab.path}
                            icon={tab.icon}
                            sx={{
                                minWidth: 0,
                                px: 0.5,
                            }}
                        />
                    ))}
                </BottomNavigation>
            </Box>
        );
    }

    // Верхняя навигация для больших экранов
    return (
        <Box sx={{display: "flex", justifyContent: "center", mt: 3}}>
            <Box sx={{
                display: "flex",
                alignItems: "center",
                bgcolor: "surfaceContainer",
                borderRadius: 4,
                p: 0.5,
                gap: 1
            }}>
                <Tabs
                    value={value}
                    onChange={(_, v) => handleNavigate(v)}
                    sx={{
                        minHeight: "auto",
                        "& .MuiTabs-flexContainer": {display: "flex", gap: 0.5},
                        "& .MuiTabs-indicator": {display: "none"},
                    }}
                >
                    {tabs.map(tab => (
                        <Tab
                            key={tab.path}
                            value={tab.path}
                            label={tab.label}
                            sx={{
                                textTransform: "none",
                                borderRadius: 3,
                                minHeight: 36,
                                py: 0.75,
                                px: 2,
                                transition: "background-color 200ms",
                                "&:hover": {bgcolor: "surfaceContainerHigh"},
                                "&.Mui-selected": {bgcolor: "surfaceContainerHighest"},
                                "&.Mui-selected:hover": {filter: "brightness(0.98)"},
                                "&:not(.Mui-selected)": {color: "text.primary"},
                            }}
                        />
                    ))}
                </Tabs>
                <Box sx={{pl: 1}}>
                    <Avatar
                        onClick={() => handleNavigate("/profile")}
                        sx={{
                            width: 36,
                            height: 36,
                            cursor: "pointer",
                            borderRadius: 3,
                            bgcolor: isProfileActive ? "surfaceContainerHighest" : "surfaceContainer",
                            "&:hover": {bgcolor: isProfileActive ? "surfaceContainerHighest" : "surfaceContainerHigh"},
                            color: isProfileActive ? "primary.main" : "text.primary",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            transition: "background-color 0.2s",
                        }}
                    />
                </Box>
            </Box>
        </Box>
    );
};