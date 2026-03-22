import {Box, Typography} from "@mui/material";

export const Welcome = ({userName}) => {

    const hour = new Date().getHours();
    let greeting;

    if (hour >= 5 && hour < 12) greeting = "Доброе утро";
    else if (hour >= 12 && hour < 18) greeting = "Добрый день";
    else if (hour >= 18 && hour < 23) greeting = "Добрый вечер";
    else greeting = "Доброй ночи";

    return (
        <Box
            sx={{
                bgcolor: "surfaceContainer",
                borderRadius: "20px",
                px: 3,
                py: 2,
                mb: 3,
            }}
        >
            <Typography variant="titleLarge" color="onSurface" sx={{mb: 3}}>
                {greeting}, {userName}!
            </Typography>
        </Box>
    )
};