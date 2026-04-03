// Updated UserManagement.js - Add admin user with protection
import React, { useState, useEffect } from 'react';
import './UserManagement.css';
import { getFromLocalStorage, saveToLocalStorage } from '../../utils/storage';

const UserManagement = () => {
    const [users, setUsers] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        const savedUsers = getFromLocalStorage('users', [
            {
                id: 1,
                name: 'Admin User',
                email: 'admin@example.com',
                role: 'Admin',
                status: 'Active',
                joinDate: '2024-01-01',
                isProtected: true // Mark admin as protected
            },
            {
                id: 2,
                name: 'John Doe',
                email: 'john.doe@example.com',
                role: 'User',
                status: 'Active',
                joinDate: '2024-02-01'
            },
            {
                id: 3,
                name: 'Jane Smith',
                email: 'jane.smith@example.com',
                role: 'User',
                status: 'Active',
                joinDate: '2024-02-15'
            },
            {
                id: 4,
                name: 'Mike Johnson',
                email: 'mike.johnson@example.com',
                role: 'User',
                status: 'Inactive',
                joinDate: '2024-03-01'
            }
        ]);
        setUsers(savedUsers);
    }, []);

    const filteredUsers = users.filter(user =>
        user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.email.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const toggleUserStatus = (userId) => {
        // Prevent deactivating admin user
        const user = users.find(u => u.id === userId);
        if (user && user.isProtected) {
            alert('Admin user status cannot be changed');
            return;
        }

        const updatedUsers = users.map(user =>
            user.id === userId
                ? { ...user, status: user.status === 'Active' ? 'Inactive' : 'Active' }
                : user
        );
        setUsers(updatedUsers);
        saveToLocalStorage('users', updatedUsers);
    };

    const deleteUser = (userId) => {
        // Prevent deleting admin user
        const user = users.find(u => u.id === userId);
        if (user && user.isProtected) {
            alert('Admin user cannot be deleted');
            return;
        }

        if (window.confirm('Are you sure you want to delete this user?')) {
            const updatedUsers = users.filter(user => user.id !== userId);
            setUsers(updatedUsers);
            saveToLocalStorage('users', updatedUsers);
        }
    };

    const addUser = () => {
        const newUser = {
            id: Date.now(), // Simple ID generation
            name: 'New User',
            email: `user${Date.now()}@example.com`,
            role: 'User',
            status: 'Active',
            joinDate: new Date().toISOString().split('T')[0]
        };

        const updatedUsers = [...users, newUser];
        setUsers(updatedUsers);
        saveToLocalStorage('users', updatedUsers);
    };

    return (
        <div className="user-management">
            <div className="management-header">
                <h1>Users</h1>
                <div className="header-controls">
                    <div className="search-box">
                        <i className="fas fa-search"></i>
                        <input
                            type="text"
                            placeholder="Search users..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>
                    <button className="btn-add-user" onClick={addUser}>
                        <i className="fas fa-plus"></i>
                        Add User
                    </button>
                </div>
            </div>

            <div className="users-table">
                {filteredUsers.length === 0 ? (
                    <p className="no-data">No users found</p>
                ) : (
                    <table>
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>Email</th>
                                <th>Role</th>
                                <th>Status</th>
                                <th>Join Date</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredUsers.map(user => (
                                <tr key={user.id}>
                                    <td>
                                        <div className="user-info">
                                            {user.name}
                                            {user.isProtected && <span className="protected-badge">Protected</span>}
                                        </div>
                                    </td>
                                    <td>{user.email}</td>
                                    <td>
                                        <span className={`role-badge ${user.role.toLowerCase()}`}>
                                            {user.role}
                                        </span>
                                    </td>
                                    <td>
                                        <span className={`status-badge ${user.status.toLowerCase()}`}>
                                            {user.status}
                                        </span>
                                    </td>
                                    <td>{new Date(user.joinDate).toLocaleDateString()}</td>
                                    <td>
                                        <div className="action-buttons">
                                            <button 
                                                className={`btn-status ${user.status === 'Active' ? 'btn-deactivate' : 'btn-activate'} ${user.isProtected ? 'disabled' : ''}`}
                                                onClick={() => toggleUserStatus(user.id)}
                                                disabled={user.isProtected}
                                            >
                                                {user.status === 'Active' ? 'Deactivate' : 'Activate'}
                                            </button>
                                            <button 
                                                className={`btn-delete ${user.isProtected ? 'disabled' : ''}`}
                                                onClick={() => deleteUser(user.id)}
                                                disabled={user.isProtected}
                                            >
                                                Delete
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}
            </div>
        </div>
    );
};

export default UserManagement;