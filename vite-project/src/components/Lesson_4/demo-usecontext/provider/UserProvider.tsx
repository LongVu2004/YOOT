import { useState } from "react";
import { UserContext } from "../context/user_context";

const UserProvider = ({ children }: { children: React.ReactNode }) => {
    const [count, setCount] = useState(0);

    const user = {
        name: "John Doe",
        role: "Admin",
        count,
        increase: () => setCount(prev => prev + 1),
    };

    return (
        <UserContext.Provider value={user}>
            {children}
        </UserContext.Provider>
    );
};

export default UserProvider;
