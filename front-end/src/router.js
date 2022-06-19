import Dashboard from "./pages/dashboard";
import Circle from "./pages/create-circle"
import AdminPanel from "./pages/admin-panel"

export const RoutesList = [
    {
        path: "/",
        component: <Dashboard />
    },
    {
        path: "/circle",
        component: <Circle />
    },
    {
        path: "/admin",
        component: <AdminPanel />
    }
]