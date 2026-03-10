import {useEffect, useState} from "react"
import {getFiles} from "../api/libraryApi.js"

export default function FilesList() {
    const [files, setFiles] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)

    useEffect(() => {
        async function fetchFiles() {
            try {
                setLoading(true)
                const response = await getFiles()
                setFiles(response.data)
            } catch (err) {
                console.error(err)
                setError("Ошибка при загрузке файлов")
            } finally {
                setLoading(false)
            }
        }

        fetchFiles()
    }, [])

    if (loading) return <div>Загрузка...</div>
    if (error) return <div>{error}</div>
    if (!files.length) return <div>Файлы не найдены</div>

    return (
        <div>
            {files.map((file) => (
                <div key={file.slug} style={{marginBottom: "1rem", padding: "0.5rem", border: "1px solid #ccc"}}>
                    <h3>{file.title}</h3>
                    <p>{file.description}</p>
                    <p>Автор: {file.author_name}</p>
                    <p>Тип: {file.file_type}</p>
                    <a href={file.file} target="_blank" rel="noopener noreferrer">Скачать</a>
                </div>
            ))}
        </div>
    )
}