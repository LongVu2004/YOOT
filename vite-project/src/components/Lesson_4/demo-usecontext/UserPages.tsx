import { useContext } from "react";
import { UserContext } from "./context/user_context";

const UserPages = () => {
    const user = useContext(UserContext);

    return (
        <div>
            <h1>User Page</h1>
            
            <button onClick={user?.increase}>Increase Count</button>

            <p>Count: {user?.count}</p>
        </div>
    );
};

export default UserPages;