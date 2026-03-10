import {useState} from "react"
import useAuth from "../hooks/useAuth"

export default function LoginForm() {
    const {login, loading, error, token} = useAuth()
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")

    const handleSubmit = async (e) => {
        e.preventDefault()
        await login({username, password})
    }

    return (
        <form onSubmit={handleSubmit}>
            <input
                type="text"
                placeholder="Имя пользователя"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
            />
            <input
                type="password"
                placeholder="Пароль"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
            />
            <button type="submit" disabled={loading}>
                {loading ? "Вход..." : "Войти"}
            </button>
            {error && <p style={{color: "red"}}>{JSON.stringify(error)}</p>}
        </form>
    )
}