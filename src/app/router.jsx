import {createBrowserRouter, Navigate} from "react-router-dom"

import AuthPage from "../pages/AuthPage"
import LibraryPage from "../pages/LibraryPage"
import {RedirectIfAuth, RequireAuth} from "../shared/utilities/utilities.jsx";
import {Layout} from "./Layout.jsx";
import MainPage from "../pages/MainPage.jsx";
import MyRoutePage from "../pages/MyRoutePage.jsx";
import PracticumPage from "../pages/PracticumPage.jsx";
import MonitoringPage from "../pages/MonitoringPage.jsx";
import ReflectionPage from "../pages/ReflectionPage.jsx";
import ProfilePage from "../pages/ProfilePage.jsx";

export const router = createBrowserRouter([
    {
        path: "/auth",
        element: <RedirectIfAuth/>,
        children: [
            {
                path: "",
                element: <AuthPage/>
            }
        ]
    },
    {
        element: <RequireAuth/>,
        children: [
            {
                element: <Layout/>,
                children: [
                    {
                        path: "",
                        element: <Navigate to="/main" replace/>
                    },
                    {
                        path: "/main",
                        element: <MainPage/>
                    },
                    {
                        path: "/route",
                        element: <MyRoutePage/>
                    },
                    {
                        path: "/practicum",
                        element: <PracticumPage/>
                    },
                    {
                        path: "/monitoring",
                        element: <MonitoringPage/>
                    },
                    {
                        path: "/reflection",
                        element: <ReflectionPage/>
                    },
                    {
                        path: "/library",
                        element: <LibraryPage/>
                    },
                    {
                        path: "/profile",
                        element: <ProfilePage/>
                    }

                ]
            }
        ],
    },
    {
        path: "*",
        element: <div>404</div>
    }
])