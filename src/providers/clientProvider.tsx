"use client";

import { createContext, ReactNode, useContext } from "react";
import { useFetchGeneral } from "@/hooks/useFetchGeneral";

interface ClientProviderProps {
  children: ReactNode;
}

const ClientContext = createContext({});
export const ClientProvider = ({ children }: ClientProviderProps) => {
    useFetchGeneral();
    return (
        <ClientContext.Provider value={{}}>
            {children}
        </ClientContext.Provider>
    );
};

export const useClientProvider = () => {
    return useContext(ClientContext);
};