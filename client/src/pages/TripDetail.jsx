import { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { tripAPI } from '../services/api';
import { useAuth } from '../context/AuthContext';
import {
  ChevronLeft,
  Calendar,
  Users,
  CreditCard,
  MapPin,
  Sparkles,
  Edit2,
  Trash2,
} from 'lucide-react';

const BUDGE_LABELS = {
  budget: 'Budget',
  'mid-range': 'Mid-range',
  luxury: 'Luxury',
};

export default function TripDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [trip, setTrip] = useState(null);
  const [loading, setLoading] = useState(true);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    loadTrip();
  }, [id]);

  const loadTrip = async () => {
    try {
      const res = await tripAPI.getById(id);
      setTrip(res.data);
    } catch (err) {
      if (err.response?.status === 404) navigate('/trips');
      else console.error('Failed to load trip', err);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    if (!window.confirm('Delete this trip?')) return;
    setDeleting(true);
    try {
      await tripAPI.delete(id);
      navigate('/trips');
    } catch (err) {
      alert(err.response?.data?.message || 'Failed to delete trip');
    } finally {
      setDeleting(false);
    }
  };

  if (loading) {
    return (
      <div className="flex h-[60vh] items-center justify-center">
        <div className="h-8 w-32 rounded bg-slate-200 animate-pulse" />
      </div>
    );
  }
  if (!trip) return null;

  const isOwner = trip.user && (trip.user._id || trip.user) === (user?._id || user?.id);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <Link to="/trips" className="flex items-center gap-2 text-sm text-sky-600 hover:underline">
          <ChevronLeft size={16} /> Back to my trips
        </Link>
        {isOwner && (
          <div className="flex gap-2">
            <button
              onClick={handleDelete}
              disabled={deleting}
              className="text-sm font-medium text-red-600 hover:bg-red-50 rounded-lg px-3 py-2 transition-colors flex items-center gap-1"
            >
              <Trash2 size={16} className={`${deleting ? 'animate-spin' : ''}`} />
              {deleting ? 'Deleting...' : 'Delete'}
            </button>
          </div>
        )}
      </div>

      <div className="card p-6">
        <div className="flex items-start justify-between gap-4 mb-6">
          <div>
            <h1 className="text-2xl font-bold text-slate-900 mb-1">
              {trip.title || 'Untitled Trip'}
            </h1>
            <p className="text-sm text-slate-500">
              {trip.destination?.name || 'Unknown destination'}
            </p>
          </div>
          <div className="flex items-center gap-2">
            <span className={`px-2.5 py-0.5 rounded text-xs font-medium ${
              trip.aiGenerated
                ? 'bg-sky-100 text-sky-700 border border-sky-100'
                : 'bg-slate-100 text-slate-600 border border-slate-100'
            }`}>
              {trip.aiGenerated ? '✨ AI-generated' : 'Manual'}
            </span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <div className="p-4 rounded-xl bg-slate-50 border border-slate-100">
            <p className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-1">Duration</p>
            <p className="text-lg font-bold text-slate-900">{trip.durationDays} days</p>
          </div>
          <div className="p-4 rounded-xl bg-slate-50 border border-slate-100">
            <p className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-1">Travelers</p>
            <p className="text-lg font-bold text-slate-900">{trip.travelers}</p>
          </div>
          <div className="p-4 rounded-xl bg-slate-50 border border-slate-100">
            <p className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-1">Budget</p>
            <p className="text-lg font-bold text-slate-900">
              {BUDGE_LABELS[trip.budgetLevel] || trip.budgetLevel}
            </p>
          </div>
          <div className="p-4 rounded-xl bg-slate-50 border border-slate-100">
            <p className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-1">Created</p>
            <p className="text-sm font-bold text-slate-900">
              {new Date(trip.createdAt).toLocaleDateString(undefined, {
                month: 'short',
                day: 'numeric',
                year: 'numeric',
              })}
            </p>
          </div>
        </div>

        <div className="space-y-4">
          <h2 className="font-bold text-xl text-slate-900 flex items-center gap-2 mb-4">
            <Calendar size={20} className="text-sky-500" />
            Itinerary
          </h2>
          {trip.itinerary && trip.itinerary.length > 0 ? (
            <div className="space-y-4">
              {trip.itinerary.map((day) => (
                <div key={day.day} className="border border-slate-100 rounded-xl overflow-hidden">
                  <div className="bg-slate-50 px-4 py-3 border-b border-slate-100 flex items-center justify-between">
                    <span className="font-bold text-slate-900">Day {day.day}</span>
                    {day.title && <span className="text-sm text-slate-500">{day.title}</span>}
                  </div>
                  <div className="p-4 space-y-3">
                    {[
                      { label: 'Morning', icon: <MapPin size={14} className="text-amber-500" />, value: day.morning },
                      { label: 'Afternoon', icon: <MapPin size={14} className="text-cyan-500" />, value: day.afternoon },
                      { label: 'Evening', icon: <MapPin size={14} className="text-purple-500" />, value: day.evening },
                    ].map((item) => (
                      <div key={item.label} className="flex items-start gap-3">
                        <div className="mt-0.5 flex-shrink-0">{item.icon}</div>
                        <div>
                          <p className="text-xs font-bold uppercase tracking-wider text-slate-400">
                            {item.label}
                          </p>
                          <p className="text-sm text-slate-700 leading-relaxed">
                            {item.value || 'No activity planned'}
                          </p>
                        </div>
                      </div>
                    ))}
                    {day.notes && (
                      <div className="pt-2 border-t border-slate-100">
                        <p className="text-xs text-slate-500 italic">{day.notes}</p>
                      </div>
                    )}
                    <div className="pt-2 flex items-center gap-2 text-xs text-slate-500">
                      <CreditCard size={14} />
                      <span>Est. cost: {day.estimatedCost || '$$'}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <div className="w-12 h-12 rounded-full bg-slate-100 flex items-center justify-center mx-auto mb-4 text-slate-400">
                <Sparkles size={24} />
              </div>
              <h3 className="font-bold text-slate-900 mb-2">No itinerary yet</h3>
              <p className="text-sm text-slate-500">
                This trip doesn't have a day-by-day plan yet.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
