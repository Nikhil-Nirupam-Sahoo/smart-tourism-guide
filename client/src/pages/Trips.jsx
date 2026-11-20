import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { tripAPI } from '../services/api';
import { useAuth } from '../context/AuthContext';
import { Plane, Calendar, Users, CreditCard, Sparkles, Trash2, Edit2, MapPin } from 'lucide-react';

const BUDGE_LABELS = {
  budget: 'Budget',
  'mid-range': 'Mid-range',
  luxury: 'Luxury',
};

export default function Trips() {
  const { user, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [trips, setTrips] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadTrips();
  }, []);

  const loadTrips = async () => {
    try {
      const res = await tripAPI.getMyTrips();
      setTrips(res.data || []);
    } catch (err) {
      console.error('Failed to load trips', err);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this trip?')) return;
    try {
      await tripAPI.delete(id);
      loadTrips();
    } catch (err) {
      alert(err.response?.data?.message || 'Failed to delete trip');
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="card p-12 text-center animate-fade-in">
        <div className="w-16 h-16 rounded-full bg-slate-100 flex items-center justify-center mx-auto mb-4 text-slate-400">
          <Plane size={32} />
        </div>
        <h2 className="font-bold text-xl mb-2">No trips yet</h2>
        <p className="text-sm text-slate-500 mb-6">
          Sign in to start planning and saving your trips.
        </p>
        <Link to="/login" className="btn btn-primary">
          Sign in
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">My Trips</h1>
          <p className="text-slate-500 text-sm">
            Your saved travel plans and AI-generated itineraries
          </p>
        </div>
        <Link to="/destinations" className="btn btn-outline">
          <MapPin size={16} /> Browse destinations
        </Link>
      </div>

      {loading ? (
        <div className="h-96 flex items-center justify-center">
          <div className="h-8 w-32 rounded bg-slate-200 animate-pulse" />
        </div>
      ) : trips.length === 0 ? (
        <div className="h-96 flex flex-col items-center justify-center text-center">
          <div className="w-16 h-16 rounded-full bg-slate-100 flex items-center justify-center mb-4 text-slate-400">
            <Sparkles size={32} />
          </div>
          <h3 className="font-bold text-slate-900 mb-2">No trips yet</h3>
          <p className="text-sm text-slate-500 mb-6">
            Start by creating a trip from a destination page.
          </p>
          <Link to="/destinations" className="btn btn-primary">
            Explore destinations
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {trips.map((trip) => (
            <div key={trip._id} className="card p-5 hover:shadow-xl transition-shadow">
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
                  {trip.aiGenerated ? 'AI-generated' : 'Manual'}
                </span>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleDelete(trip._id);
                  }}
                  className="text-slate-400 hover:text-red-500"
                >
                  <Trash2 size={16} />
                </button>
              </div>
              <h3 className="font-bold text-slate-900 text-lg mb-1">
                {trip.title || 'Untitled Trip'}
              </h3>
              <p className="text-xs text-slate-500 mb-3">
                {trip.destination?.name || 'Unknown destination'}
              </p>
              <div className="space-y-2 mb-4">
                <div className="flex items-center gap-2 text-sm text-slate-600">
                  <Calendar size={14} className="text-slate-400" />
                  <span>{trip.durationDays} days</span>
                  <span className="mx-1 text-slate-300">•</span>
                  <span>{trip.travelers} traveler{trip.travelers > 1 ? 's' : ''}</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-slate-600">
                  <CreditCard size={14} className="text-slate-400" />
                  {BUDGE_LABELS[trip.budgetLevel] || trip.budgetLevel}
                </div>
                {trip.interests?.length && (
                  <div className="flex flex-wrap gap-1">
                    {trip.interests.map((interest) => (
                      <span key={interest} className="px-2 py-0.5 rounded text-xs bg-slate-100 text-slate-600">
                        {interest}
                      </span>
                    ))}
                  </div>
                )}
              </div>
              <div className="flex items-center justify-between pt-3 border-t border-white/50 dark:border-white/10">
                <Link
                  to={`/trips/${trip._id}`}
                  className="text-sm font-medium text-sky-600 hover:underline flex items-center gap-1"
                >
                  View details <span>→</span>
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
