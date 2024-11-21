import { createBrowserRouter, LoaderFunctionArgs, redirect } from "react-router-dom";

import AllUsers from "../pages/AllUsers/AllUsers";
import AuthPage from "../Auth/AuthPage";
import PrivateRoute from "../components/PrivateRoute";
import AuthPageChecker from "../components/AuthPageChecker";
import AppointmentList from "../pages/AppointmentList/AppointmentList";

export const router = createBrowserRouter([
    {
        path: '/',
        element: <PrivateRoute />,
        loader: ({ request }: LoaderFunctionArgs) => {
            const url = new URL(request.url);
            console.log({ request });

            if (url.pathname === "/") {
                return redirect("/all-users");
            }

            return null;
        },
        children: [
            {
                path: '/all-users',
                element: <AllUsers />
            },
            {
                path: '/my-appointments',
                element: <AppointmentList />
            },
            {
                path: '/requested-appointments',
                element: <AppointmentList />
            }
        ]

    },
    {
        path: '/login',
        element: <AuthPageChecker />,
        children:
            [
                {
                    path: '/login',
                    element: <AuthPage />,
                }
            ]
    },
    {
        path: '/sign-up',
        element: <AuthPageChecker />,
        children:
            [
                {
                    path: '/sign-up',
                    element: <AuthPage />,
                }
            ]
    }
])