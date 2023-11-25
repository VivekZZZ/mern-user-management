import { BrowserRouter, Route, Routes } from "react-router-dom";
import { AuthProvider } from "./Auth/AuthContext";
import HomePage from "./components/HomePage";
import CreateUser from "./components/CreateUser";
import Users from "./components/Users";
import EditUser from "./components/EditUser";
import Login from "./components/Login/Login";
import Register from "./components/Login/Register";
import Error from "./components/Error";
import ProtectedRoute from "./ProtectedRoute/ProtectedRoute";

const App = () => {
  return (
    <AuthProvider>
      <div>
        <BrowserRouter>
          <HomePage />
          <Routes>
            <Route element={<Login />} path="/" />
            <Route element={<Register />} path="/register" />
            <Route element={<Login />} path="/login" />
            <Route element={<Error />} path="/error" />
            <Route element={<ProtectedRoute />}>
              <Route element={<CreateUser />} path="/createUser" />
              <Route element={<Users />} path="/users" />
              <Route element={<EditUser />} path="/edituser/:id" />
            </Route>
          </Routes>
        </BrowserRouter>
      </div>
    </AuthProvider>
  );
};

export default App;
