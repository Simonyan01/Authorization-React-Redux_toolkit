import { Route, Routes, useRoutes } from "react-router-dom"
import UserAccount from "../components/account/UserAccount";
import SignUp from "../components/authorization/sign-up/SignUp";
import SignIn from "../components/authorization/login/SignIn";

const Router = () => {
    const element = useRoutes([
        { path: "/", element: <UserAccount /> },
        {
            path: "/register",
            element: <SignUp />,
        },
        {
            path: "/login",
            element: <SignIn />
        }
    ])

    const routes = [
        { path: '/' },
        { path: '/register' },
        { path: '/login' },
    ];

    return (
        <Routes>
            {routes.map(({ path }, i) => <Route key={i} path={path} element={element} />)}
        </Routes>
    )
}

export default Router
