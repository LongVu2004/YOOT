import React, { useState } from 'react';

type User = {
    id: number;
    name: string;
}

const UsersList : React.FC = () => {
    const [users, setUsers] = useState<User[]>([
        {id: 1, name: "John Doe" },
        {id: 2, name: "Jane Smith" },
        {id: 3, name: "Alice Johnson" },
    ]);

    const [search, setSearch] = useState("");
    const [newUser, setNewUser] = useState("");

    // state edit
    const [editId, setEditId] = useState<number | null>(null);
    const [editValue, setEditValue] = useState("");

    //Add
    const handleAddUser = () => {
        if (newUser.trim() === "") return;

        const newUserObj: User ={
            id: Date.now(),
            name: newUser,
        }

        setUsers([...users, newUserObj]);
        setNewUser("");
    };
    
    //Delete
    const handleDeleteUser = (id: number) => {
        setUsers(users.filter((user) => user.id !== id));
    };

    //Edit
    const handleEditUser = (user: User) => {
        setEditValue(user.name);
        setEditId(user.id);
    };

    const handleSaveEdit = () => {
        if (editValue.trim() === "" || editId === null) return;
        
        setUsers(users.map((user) =>
            user.id === editId ? { ...user, name: editValue } : user
        ));
        setEditId(null);
        setEditValue("");
    };

    //Search
    const filteredUsers = users.filter((user) =>
        user.name.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <div>
            <h1>Users List</h1>
                <div>
                {/* Search */}
                <input

                    type="text"
                    placeholder="Search users..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                />
                {/* Add User */}
                <input
                    type="text"
                    value={newUser}
                    onChange={(e) => setNewUser(e.target.value)}
                    placeholder="Add new user..."
                /> 
                <button onClick={handleAddUser}>Add User</button>
                <ul>
                    {filteredUsers.map((user) => (
                        <li key={user.id}>
                            {editId === user.id ? (
                                <>
                                    <input
                                        type="text"
                                        value={editValue}
                                        onChange={(e) => setEditValue(e.target.value)}
                                    />
                                    <button onClick={handleSaveEdit}>Save</button>
                                </>
                            ) : (
                                <>
                                    {user.name}
                                    <button onClick={() => handleEditUser(user)}>Edit</button>
                                    <button onClick={() => handleDeleteUser(user.id)}>Delete</button>
                                </>
                            )}
                        </li>
                    ))}
                </ul>
            </div>
        </div>
        
    )
}

export default UsersList;