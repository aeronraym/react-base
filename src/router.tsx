import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import ProtectedRoute  from "./app/auth/protected";
import NotFound from "./app/landings/notfound";
import Layout from "./app/layout";
import Login from "./app/auth/login";
import Unauthorized from "./app/landings/unauthorized";
import Dashboard from "./app/default/dashboard";
import Users from "./app/users/page";
import Roles from "./app/roles/page";
import Resources from "./app/resources/page";
import CreateUserPage from "./app/users/create/page";
import CreateRolePage from "./app/roles/create/page";
import CreateResourcePage from "./app/resources/create/page";
import EditUserPage from "./app/users/edit/page";
const AppRouter = () => {
    return (
    <BrowserRouter>
        <Routes>
            <Route path="*" element={<NotFound />} />
            <Route path="/unauthorized" element={<Unauthorized />} />
            <Route path="/" element={<Navigate to="/login" replace />} />
            <Route path="/login" element={<Login />} />
            <Route path="/admin" element={
                <ProtectedRoute>
                    <Layout />
                </ProtectedRoute>
            }>
                <Route path="/admin/dashboard" element={<Dashboard />} />

                <Route path="/admin/users" element={<Users />} />
                <Route path="/admin/users/create" element={<CreateUserPage />} />
                <Route path="/admin/users/:id/edit" element={<EditUserPage />} />

                <Route path="/admin/roles" element={<Roles />} />
                <Route path="/admin/roles/create" element={<CreateRolePage />} />

                <Route path="/admin/resources" element={<Resources />} />
                <Route path="/admin/resources/create" element={<CreateResourcePage />} />
            </Route>
        </Routes>
    </BrowserRouter>);
}
 
export default AppRouter;