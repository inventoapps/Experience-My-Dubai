"use client"
import { createContext, useContext, useEffect, useState } from "react";


type AuthUser = {
  _id: string;
  name: string;
  email: string;
  isAdmin: boolean;
} | null;

type AdminAuth = {
   admin : string;
} | null;

interface AuthContextType {
  user: AuthUser | null;
  admin : AdminAuth;
  setAdmin : React.Dispatch<React.SetStateAction<AdminAuth>>;
  setUser: React.Dispatch<React.SetStateAction<AuthUser>> | null;
}
const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({children} : {children : React.ReactNode}){
    const [user, setUser] = useState<AuthUser>(null);
    const [admin , setAdmin] = useState<AdminAuth>(null);

    useEffect(() => {
    async function loadUser() {
      try {
      const res = await fetch("/api/auth/me");

      if (!res.ok) {
        setUser(null);
        return;
      }

      const data = await res.json();
      setUser(data.user);

    } catch (error) {
      setUser(null);
    }
    }
    loadUser();
  }, []);


    return (
        <AuthContext.Provider value={{user,setUser, admin , setAdmin}}>
           {children}
        </AuthContext.Provider>

    )
}

export function useAuth(){
    return useContext(AuthContext);
}