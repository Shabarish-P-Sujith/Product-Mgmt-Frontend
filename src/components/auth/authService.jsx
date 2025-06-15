// Authentication service functions

// Signup function
export const signup = (userData) => {
    try {
        const users = JSON.parse(localStorage.getItem('users')) || [];
        
        // Check if user already exists
        const existingUser = users.find(user => user.email === userData.email);
        if (existingUser) {
            throw new Error('User already exists');
        }

        // Add new user
        users.push(userData);
        localStorage.setItem('users', JSON.stringify(users));
        return true;
    } catch (error) {
        throw error;
    }
};

// Login function
export const login = (email, password) => {
    try {
        const users = JSON.parse(localStorage.getItem('users')) || [];
        const user = users.find(u => u.email === email && u.password === password);
        
        if (!user) {
            throw new Error('Invalid credentials');
        }

        // Store current user in localStorage
        localStorage.setItem('currentUser', JSON.stringify(user));
        return user;
    } catch (error) {
        throw error;
    }
};

// Logout function
export const logout = () => {
    localStorage.removeItem('currentUser');
};

// Check if user is authenticated
export const isAuthenticated = () => {
    return localStorage.getItem('currentUser') !== null;
};

// Get current user
export const getCurrentUser = () => {
    return JSON.parse(localStorage.getItem('currentUser'));
};

// Check if user is admin
export const isAdmin = () => {
    const user = getCurrentUser();
    return user && user.role === 'admin';
};

// Check if user is regular user
export const isUser = () => {
    const user = getCurrentUser();
    return user && user.role === 'user';
};