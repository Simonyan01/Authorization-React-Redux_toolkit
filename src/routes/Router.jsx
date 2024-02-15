import { Route, Routes, useRoutes } from "react-router-dom"
import SignUp from "components/authorization/sign-up/SignUp";
import SignIn from "components/authorization/sign-in/SignIn";
import UserAccount from "components/account/UserAccount";

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
