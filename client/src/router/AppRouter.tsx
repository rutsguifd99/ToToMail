import { Route, Routes } from "react-router-dom";
import AddEmail from "../pages/AddEmailsPage";
import AddEmailsPage from "../pages/AddEmailsPage";
import HomePage from "../pages/HomePage";
import LoginPage from "../pages/LoginPage";
import MainPage from "../pages/MainPage";
import RegistrationPage from "../pages/RegistrationPage";
import { ProtectedRoute } from "./ProtectedRoute";

const AppRouter = () => {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/registration" element={<RegistrationPage />} />
      <Route element={<ProtectedRoute />}>
        <Route path="/add-emails" element={<AddEmailsPage />} />
        <Route path="/main/:messageDepartment" element={<MainPage />} />
        <Route path="/add-emails" element={<AddEmail />} />
      </Route>
    </Routes>
  );
};

export default AppRouter;
