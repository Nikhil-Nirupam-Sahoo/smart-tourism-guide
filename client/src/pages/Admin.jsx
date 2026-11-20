import { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { adminAPI } from '../services/api';
import { toast } from 'react-hot-toast';
import { Shield, Users, MapPin, BarChart3, Settings } from 'lucide-react';

export default function Admin() {
  const { user } = useAuth();
  const [stats, setStats] = useState({ users: 0, destinations: 0, trips: 0 });
  const [destinations, setDestinations] = useState([]);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  const isAdmin = user?.role === 'admin';

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const [s, d, u] = await Promise.all([
        adminAPI.getStats(),
        adminAPI.getDestinations(),
        adminAPI.getUsers(),
      ]);
      setStats(s.data);
      setDestinations(d.data.destinations || []);
      setUsers(u.data || []);
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to load admin data');
    } finally {
      setLoading(false);
    }
  };

  const toggleFeatured = async (id, current) => {
    try {
      await adminAPI.updateDestination(id, { isFeatured: !current });
      toast.success('Destination updated');
      loadData();
    } catch (err) {
      toast.error(err.response?.data?.message || 'Update failed');
    }
  };

  if (!isAdmin) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50 px-4">
        <div className="text-center">
          <div className="w-16 h-16 rounded-full bg-red-100 flex items-center justify-center mx-auto mb-4 text-red-600">
            <Shield size={32} />
          </div>
          <h2 className="text-2xl font-bold text-slate-900 mb-2">Admin access required</h2>
          <p className="text-sm text-slate-500">
            You don't have permission to view the admin dashboard.
          </p>
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="flex h-[60vh] items-center justify-center">
        <div className="h-8 w-32 rounded bg-slate-200 animate-pulse" />
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Admin Dashboard</h1>
          <p className="text-slate-500 text-sm">Manage destinations, users, and view stats</p>
        </div>
        <div className="flex items-center gap-2 text-sm text-slate-500">
          <Shield size={16} className="text-sky-500" />
          <span>Logged in as admin</span>
        </div>
      </div>

      {/* Stats cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="rounded-2xl border border-slate-100 dark:border-slate-700 bg-white dark:bg-slate-800 p-6 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-1">Total Users</p>
              <p className="text-2xl font-bold text-slate-900 dark:text-white">{stats.users}</p>
            </div>
            <div className="p-3 rounded-xl bg-blue-50 text-blue-600">
              <Users size={28} />
            </div>
          </div>
        </div>
        <div className="rounded-2xl border border-slate-100 dark:border-slate-700 bg-white dark:bg-slate-800 p-6 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-1">Destinations</p>
              <p className="text-2xl font-bold text-slate-900 dark:text-white">{stats.destinations}</p>
            </div>
            <div className="p-3 rounded-xl bg-green-50 text-green-600">
              <MapPin size={28} />
            </div>
          </div>
        </div>
        <div className="rounded-2xl border border-slate-100 dark:border-slate-700 bg-white dark:bg-slate-800 p-6 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-1">Total Trips</p>
              <p className="text-2xl font-bold text-slate-900 dark:text-white">{stats.trips}</p>
            </div>
            <div className="p-3 rounded-xl bg-purple-50 text-purple-600">
              <BarChart3 size={28} />
            </div>
          </div>
        </div>
      </div>

      {/* Manage destinations */}
      <div className="rounded-2xl border border-slate-100 dark:border-slate-700 bg-white dark:bg-slate-800 p-6 shadow-sm">
        <div className="flex items-center justify-between mb-6">
          <h2 className="font-bold text-slate-900 flex items-center gap-2">
            <Settings size={20} className="text-sky-500" />
            Manage Destinations
          </h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr className="border-b border-slate-100 dark:border-slate-700">
                <th className="pb-3 text-left text-xs font-bold uppercase tracking-wider text-slate-400">Name</th>
                <th className="pb-3 text-left text-xs font-bold uppercase tracking-wider text-slate-400">Category</th>
                <th className="pb-3 text-left text-xs font-bold uppercase tracking-wider text-slate-400">Rating</th>
                <th className="pb-3 text-left text-xs font-bold uppercase tracking-wider text-slate-400">Featured</th>
                <th className="pb-3 text-left text-xs font-bold uppercase tracking-wider text-slate-400">Active</th>
              </tr>
            </thead>
            <tbody>
              {destinations.map((d) => (
                <tr key={d._id} className="border-b border-slate-100 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-700/30 transition-colors">
                  <td className="py-3 text-slate-700 dark:text-slate-300">{d.name}</td>
                  <td className="py-3 text-slate-700 dark:text-slate-300 capitalize">{d.category}</td>
                  <td className="py-3 text-slate-700 dark:text-slate-300">{d.rating?.toFixed(1) || '—'}</td>
                  <td className="py-3">
                    <button
                      onClick={() => toggleFeatured(d._id, d.isFeatured)}
                      className={`px-2.5 py-1 rounded text-xs font-bold transition-colors ${
                        d.isFeatured
                          ? 'bg-amber-100 text-amber-700 dark:bg-amber-900/20'
                          : 'bg-slate-100 text-slate-600 dark:bg-slate-700'
                      }`}
                    >
                      {d.isFeatured ? '✓ Featured' : 'Feature'}
                    </button>
                  </td>
                  <td className="py-3">
                    <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded text-xs font-bold ${
                      d.isActive !== false ? 'bg-green-100 text-green-700 dark:bg-green-900/20' : 'bg-red-100 text-red-700 dark:bg-red-900/20'
                    }`}>
                      {d.isActive !== false ? 'Active' : 'Inactive'}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Users */}
      <div className="rounded-2xl border border-slate-100 dark:border-slate-700 bg-white dark:bg-slate-800 p-6 shadow-sm">
        <h2 className="font-bold text-slate-900 mb-6">Recent Users</h2>
        <div className="overflow-x-auto">
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr className="border-b border-slate-100 dark:border-slate-700">
                <th className="pb-3 text-left text-xs font-bold uppercase tracking-wider text-slate-400">Name</th>
                <th className="pb-3 text-left text-xs font-bold uppercase tracking-wider text-slate-400">Email</th>
                <th className="pb-3 text-left text-xs font-bold uppercase tracking-wider text-slate-400">Role</th>
              </tr>
            </thead>
            <tbody>
              {users.map((u) => (
                <tr key={u._id} className="border-b border-slate-100 dark:border-slate-700">
                  <td className="py-3 text-slate-700 dark:text-slate-300">{u.name}</td>
                  <td className="py-3 text-slate-700 dark:text-slate-300">{u.email}</td>
                  <td className="py-3">
                    <span className={`px-2 py-0.5 rounded text-xs font-bold ${
                      u.role === 'admin' ? 'bg-purple-100 text-purple-700 dark:bg-purple-900/20' : 'bg-blue-100 text-blue-700 dark:bg-blue-900/20'
                    }`}>
                      {u.role}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
