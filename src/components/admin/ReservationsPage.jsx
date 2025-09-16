import React, { useEffect, useState } from 'react';
import { Search, Filter, CheckCircle, XCircle, Calendar, Clock, Users, MapPin, Phone, Eye } from 'lucide-react';
import { useAppContext } from '../../context/AppContext';
import { toast } from 'react-toastify';

const ReservationsPage = () => {
    const [reservations, setReservations] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const { user, getAllReservations } = useAppContext();

    useEffect(() => {
        // Only fetch if user is admin
        if (user && user.role === 'admin') {
            loadReservations();
        } else if (user && user.role !== 'admin') {
            setError('Access denied. Admin privileges required.');
            setLoading(false);
        } else {
            setError('Please login as admin to view reservations.');
            setLoading(false);
        }
    }, [user]);

    const loadReservations = async (filters = {}) => {
        try {
            setLoading(true);
            setError('');

            const result = await getAllReservations(filters);

            if (result.ok) {
                const mapped = result.data.reservations.map((r) => ({
                    id: r._id,
                    customerName: r.name,
                    phone: r.phone,
                    date: r.date,
                    time: r.time,
                    status: r.status,
                    isVerified: r.isVerified,
                    createdDate: new Date(r.createdAt).toISOString().slice(0, 10),
                    partySize: r.partySize || 2,
                    tableNumber: r.tableNumber || 'TBD',
                    email: r.email || '',
                    notes: r.notes || ''
                }));
                setReservations(mapped);
                toast.success(`${mapped.length} reservations loaded successfully`);
            } else {
                throw new Error(result.message || 'Failed to load reservations');
            }
        } catch (err) {
            setError(err.message);
            toast.error(err.message);
            console.error('Error loading reservations:', err);
        } finally {
            setLoading(false);
        }
    };

    const [searchTerm, setSearchTerm] = useState('');
    const [filterStatus, setFilterStatus] = useState('All');
    const [filterDate, setFilterDate] = useState('');

    const handleStatusChange = async (reservationId, newStatus) => {
        try {
            // Update local state immediately for better UX
            setReservations(reservations.map(reservation =>
                reservation.id === reservationId
                    ? { ...reservation, status: newStatus }
                    : reservation
            ));
            toast.success(`Reservation ${newStatus.toLowerCase()}`);

            // TODO: Implement API call to update status on server
            // This would require adding updateReservationStatus to the context
        } catch (error) {
            toast.error('Failed to update reservation status');
        }
    };

    const handleFilterChange = () => {
        const filters = {};
        if (filterStatus !== 'All') {
            filters.status = filterStatus.toLowerCase();
        }
        if (filterDate) {
            filters.date = filterDate;
        }
        loadReservations(filters);
    };

    const filteredReservations = reservations.filter(reservation => {
        const matchesSearch = reservation.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
            reservation.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
            reservation.phone.includes(searchTerm) ||
            (reservation.email && reservation.email.toLowerCase().includes(searchTerm.toLowerCase()));
        const matchesStatus = filterStatus === 'All' || reservation.status === filterStatus;
        const matchesDate = !filterDate || reservation.date === filterDate;

        return matchesSearch && matchesStatus && matchesDate;
    });

    const getStatusColor = (status) => {
        switch (status?.toLowerCase()) {
            case 'confirmed':
                return 'bg-green-100 text-green-800';
            case 'pending':
                return 'bg-yellow-100 text-yellow-800';
            case 'cancelled':
                return 'bg-red-100 text-red-800';
            default:
                return 'bg-gray-100 text-gray-800';
        }
    };

    const confirmedCount = reservations.filter(r => (r.status || '').toLowerCase() === 'confirmed').length;
    const pendingCount = reservations.filter(r => (r.status || '').toLowerCase() === 'pending').length;
    const totalReservations = reservations.length;

    if (error) {
        return (
            <div className="space-y-6">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">Reservations Management</h1>
                    <p className="text-gray-600">Error loading reservations</p>
                </div>
                <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
                    <h3 className="font-medium">Error</h3>
                    <p>{error}</p>
                    {user && user.role !== 'admin' && (
                        <p className="mt-2 text-sm">Current user role: {user.role || 'user'}</p>
                    )}
                </div>
            </div>
        );
    }

    if (loading) {
        return (
            <div className="space-y-6">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">Reservations Management</h1>
                    <p className="text-gray-600">Loading reservations...</p>
                </div>
                <div className="flex justify-center items-center py-12">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-600"></div>
                </div>
            </div>
        );
    }

    return (
        <div className="space-y-6">
            {/* Page Header */}
            <div>
                <h1 className="text-2xl font-bold text-gray-900">Reservations Management</h1>
                <p className="text-gray-600">Manage table bookings and reservations</p>
            </div>

            {/* Reservation Stats */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                    <div className="flex items-center">
                        <div className="p-3 bg-blue-500 rounded-lg">
                            <Calendar className="h-6 w-6 text-white" />
                        </div>
                        <div className="ml-4">
                            <p className="text-sm font-medium text-gray-500">Total Reservations</p>
                            <p className="text-2xl font-bold text-gray-900">{totalReservations}</p>
                        </div>
                    </div>
                </div>

                <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                    <div className="flex items-center">
                        <div className="p-3 bg-green-500 rounded-lg">
                            <CheckCircle className="h-6 w-6 text-white" />
                        </div>
                        <div className="ml-4">
                            <p className="text-sm font-medium text-gray-500">Confirmed</p>
                            <p className="text-2xl font-bold text-gray-900">{confirmedCount}</p>
                        </div>
                    </div>
                </div>

                <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                    <div className="flex items-center">
                        <div className="p-3 bg-yellow-500 rounded-lg">
                            <Clock className="h-6 w-6 text-white" />
                        </div>
                        <div className="ml-4">
                            <p className="text-sm font-medium text-gray-500">Pending</p>
                            <p className="text-2xl font-bold text-gray-900">{pendingCount}</p>
                        </div>
                    </div>
                </div>

                <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                    <div className="flex items-center">
                        <div className="p-3 bg-orange-500 rounded-lg">
                            <Users className="h-6 w-6 text-white" />
                        </div>
                        <div className="ml-4">
                            <p className="text-sm font-medium text-gray-500">Total Guests</p>
                            <p className="text-2xl font-bold text-gray-900">
                                {reservations.reduce((sum, r) => sum + (r.partySize || 0), 0)}
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Filters */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Search Reservations</label>
                        <div className="relative">
                            <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                            <input
                                type="text"
                                placeholder="Search by customer, phone, or email..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:outline-none"
                            />
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Filter by Status</label>
                        <select
                            value={filterStatus}
                            onChange={(e) => setFilterStatus(e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:outline-none"
                        >
                            <option value="All">All Status</option>
                            <option value="confirmed">Confirmed</option>
                            <option value="pending">Pending</option>
                            <option value="cancelled">Cancelled</option>
                        </select>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Filter by Date</label>
                        <input
                            type="date"
                            value={filterDate}
                            onChange={(e) => setFilterDate(e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:outline-none"
                        />
                    </div>

                    <div className="flex items-end">
                        <button
                            onClick={loadReservations}
                            className="w-full flex items-center justify-center space-x-2 px-4 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition-colors"
                        >
                            <Filter className="h-4 w-4" />
                            <span>Refresh</span>
                        </button>
                    </div>
                </div>
            </div>

            {/* Reservations Table */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                            <tr>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Reservation Details
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Customer Info
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Date & Time
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Party Size
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Status
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    OTP
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Actions
                                </th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {filteredReservations.map((reservation) => (
                                <tr key={reservation.id} className="hover:bg-gray-50">
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div>
                                            <div className="text-sm font-medium text-gray-900">#{reservation.id.slice(-8)}</div>
                                            <div className="text-sm text-gray-500">Created: {reservation.createdDate}</div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div>
                                            <div className="text-sm font-medium text-gray-900">{reservation.customerName}</div>
                                            <div className="text-sm text-gray-500">{reservation.phone}</div>
                                            {reservation.email && (
                                                <div className="text-sm text-gray-500">{reservation.email}</div>
                                            )}
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="flex items-center space-x-2 text-sm text-gray-900">
                                            <Calendar className="h-4 w-4 text-gray-400" />
                                            <span>{reservation.date}</span>
                                        </div>
                                        <div className="flex items-center space-x-2 text-sm text-gray-500 mt-1">
                                            <Clock className="h-4 w-4 text-gray-400" />
                                            <span>{reservation.time}</span>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="flex items-center space-x-1 text-sm text-gray-900">
                                            <Users className="h-4 w-4 text-gray-400" />
                                            <span>{reservation.partySize} people</span>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(reservation.status)}`}>
                                            {reservation.status}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        {reservation.otp ? (
                                            <span className="text-sm font-mono bg-gray-100 px-2 py-1 rounded">
                                                {reservation.otp}
                                            </span>
                                        ) : (
                                            <span className="text-sm text-gray-400">Verified</span>
                                        )}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                        <div className="flex space-x-2">
                                            {reservation.status === 'pending' && (
                                                <>
                                                    <button
                                                        onClick={() => handleStatusChange(reservation.id, 'confirmed')}
                                                        className="text-green-600 hover:text-green-900"
                                                        title="Confirm Reservation"
                                                    >
                                                        <CheckCircle className="h-5 w-5" />
                                                    </button>
                                                    <button
                                                        onClick={() => handleStatusChange(reservation.id, 'cancelled')}
                                                        className="text-red-600 hover:text-red-900"
                                                        title="Cancel Reservation"
                                                    >
                                                        <XCircle className="h-5 w-5" />
                                                    </button>
                                                </>
                                            )}
                                            {reservation.status === 'confirmed' && (
                                                <button
                                                    onClick={() => handleStatusChange(reservation.id, 'cancelled')}
                                                    className="text-red-600 hover:text-red-900"
                                                    title="Cancel Reservation"
                                                >
                                                    <XCircle className="h-5 w-5" />
                                                </button>
                                            )}
                                            <button
                                                onClick={() => console.log('View details', reservation.id)}
                                                className="text-blue-600 hover:text-blue-900"
                                                title="View Details"
                                            >
                                                <Eye className="h-5 w-5" />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {filteredReservations.length === 0 && !loading && (
                <div className="text-center py-12">
                    <Calendar className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                    <p className="text-gray-500">No reservations found matching your criteria.</p>
                </div>
            )}
        </div>
    );
};

export default ReservationsPage;