import { createContext, useContext, useState } from "react";

const signContext = createContext()
export const SignProvider = ({ children }) => {
    const [signedIn, setSignedIn] = useState(false)
    return (
        <signContext.Provider value={{ signedIn, setSignedIn }}>
            {children}
        </signContext.Provider>
    );
}
export const useSign = () => {
    return useContext(signContext)
}