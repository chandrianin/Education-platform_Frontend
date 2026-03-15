import {Tabs, Tab, Box} from "@mui/material";
import {useLocation, useNavigate} from "react-router-dom";

export const Navigation = () => {

    const location = useLocation();
    const navigate = useNavigate();

    const tabs = [
        {label: "Главная", path: "/main"},
        {label: "Маршрут", path: "/route"},
        {label: "Практикум", path: "/practicum"},
        {label: "Мониторинг", path: "/monitoring"},
        {label: "Рефлексия", path: "/reflection"},
        {label: "Библиотека", path: "/library"},
    ];

    const currentTab =
        tabs.find(tab => location.pathname.startsWith(tab.path))?.path || false;

    const handleChange = (_, newValue) => {
        navigate(newValue);
    };

    return (
        <Box
            sx={{
                display: "flex",
                justifyContent: "center",
                mt: 3
            }}
        >
            <Box
                sx={{
                    bgcolor: "surfaceContainer",
                    borderRadius: 4,
                    px: 1,
                    py: 1,
                    display: "flex",
                    justifyContent: "center",
                }}
            >
                <Tabs
                    value={currentTab}
                    onChange={handleChange}
                    TabIndicatorProps={{style: {display: "none"}}}
                    sx={{
                        minHeight: "auto",
                        "& .MuiTabs-flexContainer": {
                            display: "flex",
                            gap: 0.5
                        }
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
                                px: 2,
                                transition: "all 0.2s ease",

                                "&:hover": {
                                    bgcolor: "action.hover",
                                },

                                "&.Mui-selected": {
                                    bgcolor: "primaryContainer",
                                    color: "onPrimaryContainer",
                                    border: "1px solid",
                                    borderColor: "primaryContainer"

                                },

                                "&:not(.Mui-selected)": {
                                    border: "1px solid",
                                    borderColor: "divider"
                                }
                            }}
                        />
                    ))}
                </Tabs>
            </Box>
        </Box>
    );
};