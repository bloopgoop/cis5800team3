import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import { AuthProvider } from "./context/auth-context";
import { ThemeProvider } from "./context/theme-provider";

import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import BookAppointmentPage from "./pages/BookAppointmentPage";
import SuccessPage from "./pages/SuccessPage";
import ProfilePage from "./pages/ProfilePage";
import ErrorPage from "./pages/ErrorPage";

function App() {
  return (
    <ThemeProvider defaultTheme="light" storageKey="vite-ui-theme">
      <Router>
        <AuthProvider>
          <Routes>
            <Route element={<HomePage />} path="/" />
            <Route element={<LoginPage />} path="/login" />
            <Route element={<RegisterPage />} path="/register" />
            <Route element={<BookAppointmentPage />} path="/book" />
            <Route element={<SuccessPage />} path="/success" />
            <Route element={<ProfilePage />} path="/profile" />

            // Route to error page if page not found
            <Route element={<ErrorPage />} path="/error" />
            <Route element={<Navigate to={"/error"} replace />} path="*" />
          </Routes>
        </AuthProvider>
      </Router>
    </ThemeProvider>
  );
}

export default App;
