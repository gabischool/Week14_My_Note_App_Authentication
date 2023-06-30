import React from "react"
import Cookies from 'js-cookie'
import { Navigate, Outlet, useLocation} from "react-router-dom"

function PrivateRoute() {
    const token = Cookies.get("token")

    if(!token) {
        return <Navigate to="/login"/>;
    }

    return <Outlet/>
}

export default PrivateRoute