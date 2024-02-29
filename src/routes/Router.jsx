import ForgotPassword from "components/authorization/sign-in/reset-pwd/ForgotPassword";
import ResetPassword from "components/authorization/sign-in/reset-pwd/ResetPassword";
import SignUp from "components/authorization/sign-up/SignUp";
import SignIn from "components/authorization/sign-in/SignIn";
import UserAccount from "components/account/UserAccount";
import { Route, Routes, useRoutes } from "react-router-dom"

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
        },
        {
            path: "/forgot-password",
            element: <ForgotPassword />
        },
        {
            path: "/reset",
            element: <ResetPassword />
        }
    ])

    const routes = [
        { path: '/' },
        { path: '/register' },
        { path: '/login' },
        { path: '/forgot-password' },
        { path: '/reset' },
    ];

    return (
        <Routes>
            {routes.map(({ path }, i) => <Route key={i} path={path} element={element} />)}
        </Routes>
    )
}

export default Router
