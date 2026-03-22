import {useState, useEffect} from "react";
import {Box, Typography, TextField, Button} from "@mui/material";
import {getCurrentGoal, createOrUpdateGoal, deleteGoal, getRandomQuote} from "../api/mainApi";
import {motion} from "framer-motion";

const MotionBox = motion(Box);

export const WeeklyGoal = () => {
    const [goal, setGoal] = useState("");
    const [input, setInput] = useState("");
    const [loading, setLoading] = useState(false);
    const [quote, setQuote] = useState("");

    // Загружаем цель и цитату один раз при монтировании
    useEffect(() => {
        const loadGoalAndQuote = async () => {
            try {
                const res = await getCurrentGoal();
                const currentGoal = res.data.text || "";
                setGoal(currentGoal);
                setInput(currentGoal);

                if (!currentGoal) {
                    const quoteRes = await getRandomQuote();
                    setQuote(quoteRes.data.quote || "Ставьте цель на неделю!");
                }
            } catch {
                setGoal("");
                setInput("");
                try {
                    const quoteRes = await getRandomQuote();
                    setQuote(quoteRes.data.quote || "Ставьте цель на неделю!");
                } catch {
                    setQuote("Ставьте цель на неделю!");
                }
            }
        };

        loadGoalAndQuote();
    }, []);

    const handleSave = async () => {
        if (!input.trim()) return; // не сохраняем пустую цель
        setLoading(true);
        try {
            await createOrUpdateGoal(input);
            setGoal(input);
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async () => {
        setLoading(true);
        try {
            await deleteGoal();
            setGoal("");
            setInput("");
            const quoteRes = await getRandomQuote();
            setQuote(quoteRes.data.quote || "Ставьте цель на неделю!");
        } finally {
            setLoading(false);
        }
    };

    return (
        <MotionBox
            initial={{opacity: 0, y: -10}}
            animate={{opacity: 1, y: 0}}
            sx={{
                bgcolor: "surfaceContainer",
                borderRadius: "20px",
                p: 3,
                mb: 3,
                maxHeight: {xs: "50vh", sm: "auto"},
                overflowY: {xs: "auto", sm: "visible"},
                display: "flex",
                flexDirection: "column",
                gap: 2
            }}
        >
            <Typography variant="titleMedium" color="onSurface">Цель недели</Typography>
            <TextField
                multiline
                minRows={2}
                maxRows={6}
                placeholder={goal ? "" : quote || "Ставьте цель на неделю!"}
                value={input}
                onChange={e => setInput(e.target.value)}
                fullWidth
                variant="filled"
                sx={{bgcolor: "surface", borderRadius: 2}}
            />
            <Box sx={{display: "flex", gap: 1, flexWrap: "wrap"}}>
                <Button
                    onClick={handleSave}
                    disabled={loading}
                    sx={{bgcolor: "primary", color: "onPrimary", borderRadius: 2, textTransform: "none"}}
                >
                    {loading ? "Сохраняем..." : goal ? "Сохранить" : "Создать"}
                </Button>
                {goal && (
                    <Button
                        onClick={handleDelete}
                        disabled={loading}
                        sx={{
                            bgcolor: "secondaryContainer",
                            color: "onSecondaryContainer",
                            borderRadius: 2,
                            textTransform: "none"
                        }}
                    >
                        Удалить
                    </Button>
                )}
            </Box>
        </MotionBox>);
};