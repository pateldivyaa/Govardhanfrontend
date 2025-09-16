// src/services/api.js - આ file ને update કરો
import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || 'http://localhost:5000/api';

export const api = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

export function setAuthToken(token) {
    if (token) {
        api.defaults.headers.common.Authorization = `Bearer ${token}`;
    } else {
        delete api.defaults.headers.common.Authorization;
    }
}

// Initialize auth header from persisted user if available
try {
    const raw = localStorage.getItem('gt_user');
    if (raw) {
        const user = JSON.parse(raw);
        if (user?.token) setAuthToken(user.token);
    }
} catch { }

// Auth - Updated with phone support
export const authApi = {
    // Email-based (legacy)
    register: (name, email, password) => api.post('/auth/register', { name, email, password }),
    login: (email, password) => api.post('/auth/login', { email, password }),
    
    // Phone-based (new)
    registerWithPhone: (name, phone, password) => api.post('/auth/register-phone', { name, phone, password }),
    loginWithPhone: (phone, password) => api.post('/auth/login-phone', { phone, password }),
    verifyOtp: (phone, otp) => api.post('/auth/verify-otp', { phone, otp }),
};

// Menu
export const menuApi = {
    list: () => api.get('/menu'),
    add: (data) => api.post('/menu', data), // admin only
};

// Reservations
export const reservationApi = {
    create: (data) => api.post('/reservations', data),
    list: () => api.get('/reservations'),
    verifyOtp: (reservationId, otp) => api.post('/reservations/verify-otp', { reservationId, otp }),
    resendOtp: (reservationId) => api.post('/reservations/resend-otp', { reservationId }),
    updateStatus: (reservationId, status) => api.patch(`/reservations/${reservationId}`, { status }),
};

// Orders
export const ordersApi = {
    create: (payload) => api.post('/orders', payload),
    mine: () => api.get('/orders/me'),
    recent: () => api.get('/orders/recent'), // admin only
    verifyOtp: (orderId, otp) => api.post('/orders/verify-otp', { orderId, otp }),
};