import {useEffect, useState} from "react"
import {
    Box,
    Typography,
    Tabs,
    Tab,
    Collapse,
    Button,
    Chip,
    CircularProgress
} from "@mui/material"
import ExpandMoreIcon from "@mui/icons-material/ExpandMore"

import {
    getModules,
    getCompletedModules,
    completeModule,
    unCompleteModule
} from "../api/routeApi.js"

const MODULE_TYPES = [
    {label: "Теория", value: "theory"},
    {label: "Практика", value: "practice"},
    {label: "Рефлексия", value: "reflection"}
]

export default function ModulesList() {
    const [modules, setModules] = useState([])
    const [completed, setCompleted] = useState([])
    const [expanded, setExpanded] = useState(null)

    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)
    const [type, setType] = useState("theory")

    useEffect(() => {
        async function fetchData() {
            try {
                const [modulesRes, completedRes] = await Promise.all([
                    getModules(),
                    getCompletedModules()
                ])

                setModules(modulesRes.data)
                setCompleted(completedRes.data.map(m => m.module))
            } catch {
                setError("Ошибка загрузки")
            } finally {
                setLoading(false)
            }
        }

        fetchData()
    }, [])

    const handleToggle = (id) => {
        setExpanded(prev => (prev === id ? null : id))
    }

    const handleToggleComplete = async (id) => {
        if (completed.includes(id)) {
            await unCompleteModule(id)
            setCompleted(prev => prev.filter(i => i !== id))
        } else {
            await completeModule(id)
            setCompleted(prev => [...prev, id])
        }
    }

    const filteredModules = modules.filter(m => m.type === type)

    if (loading) {
        return (
            <Box sx={{display: "flex", justifyContent: "center", mt: 6}}>
                <CircularProgress/>
            </Box>
        )
    }

    if (error) return <div>{error}</div>

    return (
        <Box>
            {/* Tabs */}
            <Box
                sx={{
                    mb: 3,
                    p: 0.5,
                    borderRadius: "16px",
                    bgcolor: "surfaceContainer"
                }}
            >
                <Tabs
                    value={type}
                    onChange={(e, v) => setType(v)}
                    variant="fullWidth"
                    sx={{
                        "& .MuiTab-root": {
                            borderRadius: "12px",
                            textTransform: "none"
                        },
                        "& .Mui-selected": {
                            bgcolor: "surface"
                        },
                        "& .MuiTabs-indicator": {
                            display: "none"
                        }
                    }}
                >
                    {MODULE_TYPES.map(t => (
                        <Tab key={t.value} label={t.label} value={t.value}/>
                    ))}
                </Tabs>
            </Box>

            {/* List Container */}
            <Box
                sx={{
                    borderRadius: "20px",
                    overflow: "hidden",
                    bgcolor: "surfaceContainer"
                }}
            >
                {filteredModules.map((module, index) => {
                    const isCompleted = completed.includes(module.id)
                    const isOpen = expanded === module.id

                    return (
                        <Box key={module.id}>
                            {/* Header */}
                            <Box
                                onClick={() => handleToggle(module.id)}
                                sx={{
                                    px: 2.5,
                                    py: 2,
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "space-between",
                                    cursor: "pointer",
                                    transition: "background 0.2s",

                                    "&:hover": {
                                        bgcolor: "surfaceContainerHigh"
                                    }
                                }}
                                TouchRippleProps={{
                                    center: false
                                }}
                            >
                                <Box sx={{display: "flex", gap: 2}}>
                                    <Typography variant="titleMedium">
                                        {module.title}
                                    </Typography>

                                    <Chip
                                        label={isCompleted ? "Выполнен" : "Не выполнен"}
                                        sx={{
                                            bgcolor: isCompleted
                                                ? "primaryContainer"
                                                : "surfaceContainerHigh",
                                            color: isCompleted
                                                ? "onPrimaryContainer"
                                                : "text.secondary"
                                        }} size="small"
                                    />
                                </Box>

                                <ExpandMoreIcon
                                    sx={{
                                        transition: "all 200ms cubic-bezier(0.2, 0, 0, 1)",
                                        transform: isOpen ? "rotate(180deg)" : "rotate(0deg)"
                                    }}
                                />
                            </Box>

                            {/* Divider */}
                            {index !== filteredModules.length - 1 && (
                                <Box
                                    sx={{
                                        height: "1px",
                                        bgcolor: "divider"
                                    }}
                                />
                            )}

                            {/* Content */}
                            <Collapse in={isOpen} timeout={200} easing="cubic-bezier(0.2, 0, 0, 1)">
                                <Box sx={{px: 2.5, pb: 2}}>
                                    {module.items.map((item, idx) => (
                                        <Box
                                            key={item.id}
                                            sx={{
                                                mb: 2,
                                                p: 1.5,
                                                borderRadius: "12px",
                                                bgcolor: "surface",
                                                mt: idx === 0 ? 2 : 0
                                            }}
                                        >
                                            {item.type === "text" && (
                                                <Typography>{item.text}</Typography>
                                            )}

                                            {item.type === "file" && item.library_file && (
                                                <Box>
                                                    <Typography>{item.library_file.title}</Typography>
                                                    <Button
                                                        size="small"
                                                        href={item.library_file.file}
                                                        target="_blank"
                                                        sx={{mt: 1}}
                                                    >
                                                        Скачать
                                                    </Button>
                                                </Box>
                                            )}
                                        </Box>
                                    ))}

                                    <Button
                                        fullWidth
                                        onClick={() => handleToggleComplete(module.id)}
                                        sx={{
                                            mt: 1,
                                            borderRadius: "12px",
                                            textTransform: "none",
                                            bgcolor: "surfaceContainerHigh",
                                            color: "text.primary",
                                            "&:hover": {bgcolor: "surfaceContainerHighest"}
                                        }}
                                    >
                                        {isCompleted
                                            ? "Отметить как невыполненный"
                                            : "Отметить как выполненный"}
                                    </Button>
                                </Box>
                            </Collapse>
                        </Box>
                    )
                })}
            </Box>
        </Box>
    )
}