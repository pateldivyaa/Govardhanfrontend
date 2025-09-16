import React, { useState } from 'react';
import {
    LayoutDashboard,
    ShoppingCart,
    Calendar,
    Package,
    Menu as MenuIcon,
    X,
    LogOut,
    User
} from 'lucide-react';

const AdminPanelLayout = ({ children, currentPage, onNavigate }) => {
    const [sidebarOpen, setSidebarOpen] = useState(false);

    const navigation = [
        { name: 'Dashboard', id: 'dashboard', icon: LayoutDashboard },
        { name: 'Orders', id: 'orders', icon: ShoppingCart },
        { name: 'Reservations', id: 'reservations', icon: Calendar },
        { name: 'Inventory', id: 'inventory', icon: Package },   // ✅ Added Inventory
        { name: 'User', id: 'user', icon: User },
        { name: 'Menu', id: 'menu', icon: MenuIcon },
        { name: 'Adminlogout', id: 'adminlogout', icon: LogOut },
    ];

    const isActive = (pageId) => currentPage === pageId;

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Mobile sidebar overlay */}
            {sidebarOpen && (
                <div
                    className="fixed inset-0 z-40 bg-gray-600 bg-opacity-75 lg:hidden"
                    onClick={() => setSidebarOpen(false)}
                />
            )}

            {/* Sidebar */}
            <div
                className={`fixed inset-y-0 left-0 z-50 w-64 bg-white shadow-lg transform transition-transform duration-300 ease-in-out ${
                    sidebarOpen ? 'translate-x-0' : '-translate-x-full'
                } lg:translate-x-0`}
            >
                <nav className="pt-4 px-3 h-full overflow-y-auto">
                    <ul className="space-y-2">
                        <h1 className="text-center font-bold text-orange-500 text-3xl mb-7">
                            Govardhan Thal
                        </h1>
                        {navigation.map((item) => {
                            const Icon = item.icon;
                            return (
                                <li key={item.id}>
                                    <button
                                        onClick={() => {
                                            onNavigate(item.id);
                                            setSidebarOpen(false);
                                        }}
                                        className={`w-full flex items-center px-3 py-2 text-sm font-medium rounded-md transition-colors ${
                                            isActive(item.id)
                                                ? 'bg-red-100 text-red-700 border-r-2 border-red-700'
                                                : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                                        }`}
                                    >
                                        <Icon className="mr-3 h-5 w-5" />
                                        {item.name}
                                    </button>
                                </li>
                            );
                        })}
                    </ul>
                </nav>
            </div>

            {/* Main content */}
            <div className="ml-0 lg:ml-64">
                {/* Top bar */}
                <div className="sticky top-0 z-10 bg-white shadow-sm border-b border-gray-200">
                    <div className="flex items-center justify-between h-16 px-6">
                        <button
                            onClick={() => setSidebarOpen(true)}
                            className="lg:hidden p-2 rounded-md text-gray-400 hover:text-gray-600"
                        >
                            <MenuIcon className="h-6 w-6" />
                        </button>
                        <div className="flex items-center space-x-4">
                            <div className="text-sm text-gray-500">
                                Welcome back, Admin
                            </div>
                        </div>
                    </div>
                </div>

                {/* Page content */}
                <main className="p-6">{children}</main>
            </div>
        </div>
    );
};

export default AdminPanelLayout;
