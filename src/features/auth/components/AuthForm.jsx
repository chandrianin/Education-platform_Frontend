import {useState} from "react";
import {
    Box,
    TextField,
    Button,
    Typography,
    Link,
} from "@mui/material";
import {motion, AnimatePresence} from "framer-motion";
import useAuth from "../hooks/useAuth";

const MotionBox = motion(Box);

export default function AuthPage() {
    const [isLogin, setIsLogin] = useState(true);
    const {login, register, loading, error, clearError} = useAuth();

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");
    const [fullName, setFullName] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (isLogin) {
            await login({username, password});
        } else {
            await register({username, password, email, full_name: fullName});
        }
    };

    const formatError = (err) => {
        if (!err) return "";
        if (err.non_field_errors) return err.non_field_errors.join(" ");
        if (typeof err === "string") return err;
        return JSON.stringify(err);
    };

    return (
        <Box
            sx={{
                minHeight: "100vh",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                bgcolor: "surface",
                p: 2,
            }}
        >
            <MotionBox
                key={isLogin ? "login-form" : "register-form"}
                initial={{opacity: 0, y: -20}}
                animate={{opacity: 1, y: 0}}
                exit={{opacity: 0, y: 20}}
                transition={{duration: 0.3}}
                sx={{width: "100%", maxWidth: 400}}
            >
                <Box
                    component="form"
                    onSubmit={handleSubmit}
                    sx={{
                        width: "100%",
                        p: 4,
                        borderRadius: 3,
                        bgcolor: "surfaceContainer",
                        display: "flex",
                        flexDirection: "column",
                        gap: 2,
                    }}
                >
                    <Typography variant="titleLarge" color="onSurface">
                        {isLogin ? "Вход" : "Регистрация"}
                    </Typography>

                    <TextField
                        label="Имя пользователя"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                        fullWidth
                        variant="filled"
                        sx={{borderRadius: 2}}
                    />

                    {!isLogin && (
                        <>
                            <TextField
                                label="Email"
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                                fullWidth
                                variant="filled"
                                sx={{borderRadius: 2}}
                            />

                            <TextField
                                label="ФИО"
                                value={fullName}
                                onChange={(e) => setFullName(e.target.value)}
                                required
                                fullWidth
                                variant="filled"
                                sx={{borderRadius: 2}}
                            />
                        </>
                    )}

                    <TextField
                        label="Пароль"
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        fullWidth
                        variant="filled"
                        sx={{bgcolor: "surface", borderRadius: 2}}
                    />

                    {error && (
                        <Typography color="error" variant="bodySmall">
                            {formatError(error)}
                        </Typography>
                    )}

                    <Button
                        type="submit"
                        disabled={loading}
                        sx={{
                            mt: 1,
                            borderRadius: 2,
                            textTransform: "none",
                            bgcolor: "primary",
                            color: "onPrimary",
                            "&:hover": {bgcolor: "primary"},
                        }}
                    >
                        {loading
                            ? isLogin
                                ? "Вход..."
                                : "Регистрация..."
                            : isLogin
                                ? "Войти"
                                : "Зарегистрироваться"}
                    </Button>

                    <Box sx={{display: "flex", justifyContent: "center", mt: 1}}>
                        <Typography variant="bodySmall" color="onSurfaceVariant">
                            {isLogin ? "Нет аккаунта?" : "Уже есть аккаунт?"}{" "}
                            <Link
                                component="button"
                                variant="bodySmall"
                                onClick={() => {
                                    setIsLogin(!isLogin);
                                    clearError();
                                }}
                                sx={{textDecoration: "none", color: "primary"}}
                            >
                                {isLogin ? "Регистрация" : "Вход"}
                            </Link>
                        </Typography>
                    </Box>
                </Box>
            </MotionBox>
        </Box>
    );
};