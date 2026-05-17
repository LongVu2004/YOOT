import { createContext } from "react";

export const UserContext = createContext<{
    name: string;
    role: string;
    count: number;
    increase: () => void;
} | null>(null);
