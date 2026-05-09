import React from 'react';

const UserWithMapAndFilter : React.FC = () => {
    const users = [
        {id: 1, name: "John Doe" },
        {id: 2, name: "Jame Smith" },
        {id: 3, name: "Alice Johnson" },
    ];
    
    // biến đổi dữ liệu
    const userWithPrefix = users.map((user) => ({
        ...user,
        name: `User: ${user.name}`,
    }));

    // lọc dữ liệu khi user có tên chứa "john"
    const filteredUsers = users.filter((user) => 
        user.name.toLowerCase().includes('john')
    );

    return (
        <div>
            <h2>Original List</h2>
            <ul>
                {users.map((user) => (
                    <li key={user.id}>{user.name}</li>
                ))}
            </ul>

            <h2>Modified List</h2>
            <ul>
                {userWithPrefix.map((user) => (
                    <li key={user.id}>{user.name}</li>
                ))}
            </ul>

            <h2>Filtered - Only "John"</h2>
            <ul>
                {filteredUsers.map((user) => (
                    <li key={user.id}>{user.name}</li>
                ))}
            </ul>
        </div>
    )
}


export default UserWithMapAndFilter;