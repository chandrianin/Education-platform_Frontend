import {createBrowserRouter} from "react-router-dom"

import LoginPage from "../pages/LoginPage"
import RegisterPage from "../pages/RegisterPage"
import LibraryPage from "../pages/LibraryPage"
import {RequireAuth} from "../shared/utilities/utilities.jsx";

export const router = createBrowserRouter([
    {
        path: "/login",
        element: <LoginPage/>,
    },
    {
        path: "/register",
        element: <RegisterPage/>,
    },
    {
        path: "/",
        element: <RequireAuth/>,
        children: [
            {
                path: "/files",
                element: <LibraryPage/>
            },
        ],
    },
    {
        path: "*",
        element: <div>404</div>
    }
])