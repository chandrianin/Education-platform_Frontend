import { useState } from "react"
import useAuth from "../hooks/useAuth"

export default function RegisterForm() {
    const { register, loading, error } = useAuth()
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [email, setEmail] = useState("")
    const [fullName, setFullName] = useState("")

    const handleSubmit = async (e) => {
        e.preventDefault()
        await register({ username, password, email, full_name: fullName })
    }

    return (
        <form onSubmit={handleSubmit}>
            <input type="text" placeholder="Имя пользователя" value={username} onChange={(e) => setUsername(e.target.value)} required />
            <input type="password" placeholder="Пароль" value={password} onChange={(e) => setPassword(e.target.value)} required />
            <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
            <input type="text" placeholder="ФИО" value={fullName} onChange={(e) => setFullName(e.target.value)} required />
            <button type="submit" disabled={loading}>{loading ? "Регистрация..." : "Зарегистрироваться"}</button>
            {error && <p style={{ color: "red" }}>{JSON.stringify(error)}</p>}
        </form>
    )
}