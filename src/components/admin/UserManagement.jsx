// Updated UserManagement.js - Backend Integration
import React, { useState, useEffect } from 'react';
import API from './api/api';
import './UserManagement.css';

const UserManagement = () => {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [searchTerm, setSearchTerm] = useState('');
    const [updatingUser, setUpdatingUser] = useState(null);

    useEffect(() => {
        fetchUsers();
    }, []);

    const fetchUsers = async () => {
        try {
            setLoading(true);
            const res = await API.get('/users');
            setUsers(res.data);
            setError('');
        } catch (err) {
            console.error('Error fetching users:', err);
            setError('Failed to load users');
        } finally {
            setLoading(false);
        }
    };

    const toggleUserStatus = async (userId, currentStatus) => {
        try {
            setUpdatingUser(userId);
            const newStatus = currentStatus === 'Active' ? 'Inactive' : 'Active';

            const res = await API.put(`/users/${userId}/status`, { status: newStatus });

            // Update local state with the response
            setUsers(users.map(user =>
                user._id === userId ? res.data : user
            ));

            setError('');
        } catch (err) {
            console.error('Error updating user:', err);
            setError('Failed to update user status');
        } finally {
            setUpdatingUser(null);
        }
    };

    const deleteUser = async (userId, userName) => {
        if (!window.confirm(`Are you sure you want to delete user "${userName}"? This action cannot be undone.`)) {
            return;
        }

        try {
            setUpdatingUser(userId);
            await API.delete(`/users/${userId}`);

            // Remove from local state
            setUsers(users.filter(user => user._id !== userId));
            setError('');
        } catch (err) {
            console.error('Error deleting user:', err);
            setError('Failed to delete user');
        } finally {
            setUpdatingUser(null);
        }
    };

    const filteredUsers = users.filter(user =>
        user.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.email?.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const stats = {
        total: users.length,
        active: users.filter(user => user.status !== 'Inactive').length,
        inactive: users.filter(user => user.status === 'Inactive').length,
        admins: users.filter(user => user.isAdmin).length,
    };

    if (loading) {
        return (
            <div className="user-management">
                <div className="loading-spinner">
                    <i className="fas fa-spinner fa-spin"></i>
                    <p>Loading users...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="user-management">
            <div className="management-header">
                <div className="header-content">
                    <h1>
                        <i className="fas fa-users"></i>
                        User Management
                    </h1>
                    <p>Manage user accounts and permissions</p>
                </div>
                <button className="btn-primary" onClick={fetchUsers}>
                    <i className="fas fa-sync-alt"></i>
                    Refresh Users
                </button>
            </div>

            {error && (
                <div className="error-message">
                    <i className="fas fa-exclamation-triangle"></i>
                    {error}
                </div>
            )}

            {/* Search Bar */}
            <div className="search-container">
                <input
                    type="text"
                    placeholder="Search users by name or email..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="search-input"
                />
                <i className="fas fa-search search-icon"></i>
            </div>

            {/* Stats Cards */}
            <div className="users-stats">
                <div className="stat-card">
                    <h3>{stats.total}</h3>
                    <p>Total Users</p>
                </div>
                <div className="stat-card">
                    <h3>{stats.active}</h3>
                    <p>Active Users</p>
                </div>
                <div className="stat-card">
                    <h3>{stats.inactive}</h3>
                    <p>Inactive Users</p>
                </div>
                <div className="stat-card">
                    <h3>{stats.admins}</h3>
                    <p>Administrators</p>
                </div>
            </div>

            {/* Users Table */}
            <div className="users-table">
                {filteredUsers.length === 0 ? (
                    <p className="no-data">
                        {searchTerm ? 'No users found matching your search.' : 'No users found.'}
                    </p>
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
                                <tr key={user._id}>
                                    <td>
                                        <div className="user-info">
                                            <div className="user-name">{user.name}</div>
                                            <div className="user-id">ID: {user._id.slice(-8)}</div>
                                        </div>
                                    </td>
                                    <td>{user.email}</td>
                                    <td>
                                        <span className={`role-badge ${user.isAdmin ? 'admin' : 'user'}`}>
                                            {user.isAdmin ? 'Admin' : 'User'}
                                        </span>
                                    </td>
                                    <td>
                                        <span className={`status-badge ${user.status === 'Active' ? 'active' : 'inactive'}`}>
                                            {user.status || 'Active'}
                                        </span>
                                    </td>
                                    <td>{new Date(user.createdAt || Date.now()).toLocaleDateString()}</td>
                                    <td>
                                        <div className="action-buttons">
                                            {!user.isAdmin && (
                                                <>
                                                    <button
                                                        className={`btn-status ${user.status === 'Active' ? 'btn-deactivate' : 'btn-activate'}`}
                                                        onClick={() => toggleUserStatus(user._id, user.status)}
                                                        disabled={updatingUser === user._id}
                                                    >
                                                        {updatingUser === user._id ? '...' : (user.status === 'Active' ? 'Deactivate' : 'Activate')}
                                                    </button>
                                                    <button
                                                        className="btn-delete"
                                                        onClick={() => deleteUser(user._id, user.name)}
                                                        disabled={updatingUser === user._id}
                                                    >
                                                        Delete
                                                    </button>
                                                </>
                                            )}
                                            {user.isAdmin && (
                                                <span className="protected-badge">Protected Admin</span>
                                            )}
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