import { createContext, useEffect, useState } from "react";
import { clearSession, ensureDemoData, restoreSession } from "../services/demoStore";

export const SessionContext = createContext(); 

const SessionContextProvider = ({children}) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [token, setToken] = useState("");
    const [isLoading, setIsLoading] = useState(true);
    const [user, setUser] = useState(null);

    useEffect(() => {
        ensureDemoData();

        const session = restoreSession();

        if (session) {
            setToken(session.token);
            setUser(session.user);
            setIsAuthenticated(true);
        }

        setIsLoading(false);
    }, []);

    useEffect(() => {
        setIsAuthenticated(Boolean(token && user));
    }, [token, user]);

    const logout = () => {
        clearSession();
        setToken("");
        setUser(null);
        setIsAuthenticated(false);
        setIsLoading(false);
    };

    return (
        <SessionContext.Provider
            value={{
                setToken,
                token,
                isAuthenticated,
                setIsAuthenticated,
                isLoading,
                user,
                setUser,
                logout,
            }}
        >
            {children}
        </SessionContext.Provider>
    )
}

export default SessionContextProvider;
