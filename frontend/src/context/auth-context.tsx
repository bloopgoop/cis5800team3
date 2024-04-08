import { createContext, useState } from "react";
import { jwtDecode } from "jwt-decode";
import { useNavigate } from "react-router-dom";

type AuthProviderProps = {
  children: React.ReactNode;
};

type AuthTokens = {
  access: string;
  refresh: string;
};

type AuthProviderState = {
  user: string | null;
  authTokens: AuthTokens | null;
  loginUser: (email:string, password:string) => void;
  logoutUser: () => void;
};

const initialState: AuthProviderState = {
  user: "",
  authTokens: null,
  loginUser: () => null,
  logoutUser: () => null,
};

const AuthContext = createContext(initialState);

export default AuthContext;

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [authTokens, setAuthTokens] = useState<AuthTokens | null>(() =>
    localStorage.getItem("authTokens")
      ? JSON.parse(localStorage.getItem("authTokens") as string)
      : null
  );
  const [user, setUser] = useState<string | null>(() =>
    localStorage.getItem("authTokens")
      ? jwtDecode(localStorage.getItem("authTokens") as string)
      : null
  );
  const [loading, setLoading] = useState<boolean>(false);

  const navigate = useNavigate();

  const loginUser = async (email: string, password: string) => {
    setLoading(true);
    const response = await fetch(
      `${import.meta.env.VITE_BACKEND_URL}/api/token/`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: email,
          password: password,
        }),
      }
    );
    const data = await response.json();

    if (response.status === 200) {
      setAuthTokens(data);
      setUser(jwtDecode(data.access));
      localStorage.setItem("authTokens", JSON.stringify(data));
      setLoading(false);
      navigate("/");
    } else if (response.status === 401) {
      alert("Invalid email or password!");
      setLoading(false);
    } else {
      alert("Something went wrong!");
      console.error(response);
      setLoading(false);
    }
  };

  const logoutUser = () => {
    setAuthTokens(null);
    setUser(null);
    localStorage.removeItem("authTokens");
  };

  const contextData = {
    user: user,
    authTokens: authTokens,
    loginUser: loginUser,
    logoutUser: logoutUser,
  };

  return (
    <AuthContext.Provider value={contextData}>
      {loading ? null : children}
    </AuthContext.Provider>
  );
};
