import {useState, useEffect} from "react";
import {Box, Typography, LinearProgress, CircularProgress} from "@mui/material";
import {getModules, getCompletedModules} from "../../route/api/routeApi.js";
import {motion} from "framer-motion";

const MotionBox = motion(Box);

export const Progress = () => {
    const [completed, setCompleted] = useState(0);
    const [total, setTotal] = useState(0);
    const [loading, setLoading] = useState(true);

    const fetchProgress = async () => {
        try {
            setLoading(true);
            const modules = (await getModules()).data.flat();
            const done = (await getCompletedModules()).data.flat();
            setTotal(modules.length);
            setCompleted(done.length);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchProgress();
    }, []);

    const progress = total > 0 ? Math.round((completed / total) * 100) : 0;

    if (loading) return <CircularProgress sx={{mt: 2}}/>;

    return (
        <MotionBox
            initial={{opacity: 0, y: -10}}
            animate={{opacity: 1, y: 0}}
            sx={{
                bgcolor: "surfaceContainer",
                borderRadius: "20px",
                p: 3,
                display: "flex",
                flexDirection: "column",
                gap: 2
            }}
        >
            <Typography variant="titleMedium" color="onSurface">Мой прогресс</Typography>
            <Box sx={{display: "flex", alignItems: "center", gap: 2}}>
                <Box sx={{flex: 1}}>
                    <LinearProgress variant="determinate" value={progress} sx={{height: 8, borderRadius: 2}}/>
                </Box>
                <Typography variant="bodySmall" color="onSurfaceVariant">{progress}%</Typography>
            </Box>
        </MotionBox>);
};