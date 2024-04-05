import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import { AuthProvider } from "./context/auth-context";
import { ThemeProvider } from "./context/theme-provider";

import HomePage from "./pages/HomePage";
import ErrorPage from "./pages/ErrorPage";

function App() {
  return (
    <ThemeProvider defaultTheme="light" storageKey="vite-ui-theme">
      <Router>
        <AuthProvider>
          <Routes>
            <Route element={<HomePage />} path="/" />

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
