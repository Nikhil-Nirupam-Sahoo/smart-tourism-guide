import { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { tripAPI } from '../services/api';
import { useAuth } from '../context/AuthContext';
import ShareButton from '../components/ShareButton';
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

const fallbackImage =
  'https://upload.wikimedia.org/wikipedia/commons/thumb/4/47/PNG_transparency_demonstration_1.png/240px-PNG_transparency_demonstration_1.png';

export default function TripDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [trip, setTrip] = useState(null);
  const [loading, setLoading] = useState(true);
  const [deleting, setDeleting] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    loadTrip();
  }, [id]);

  const loadTrip = async () => {
    try {
      const res = await tripAPI.getById(id);
      setTrip(res.data || res);
      setError(null);
    } catch (err) {
      if (err.response?.status === 404) {
        setError('Trip not found');
      } else if (err.response?.status === 403) {
        setError('Not authorized to view this trip');
      } else {
        setError('Failed to load trip');
      }
      console.error('Trip detail error:', err);
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
        <div className="h-8 w-32 rounded bg-slate-200 dark:bg-slate-700 animate-pulse" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-xl mx-auto px-4 py-12 text-center">
        <div className="w-16 h-16 rounded-full bg-red-100 dark:bg-red-900/20 flex items-center justify-center mx-auto mb-4 text-red-600 dark:text-red-400">
          <Trash2 size={32} />
        </div>
        <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">{error}</h2>
        <Link to="/trips" className="btn btn-outline">
          Back to my trips
        </Link>
      </div>
    );
  }

  if (!trip) return null;

  const ownerId = trip.user && (trip.user._id || trip.user);
  const isOwner = ownerId === (user?._id || user?.id);
  const isAdmin = user?.role === 'admin';
  const canDelete = isOwner || isAdmin;

  const destImg = trip.destination?.image || fallbackImage;
  const destName = trip.destination?.name || 'Unknown Destination';
  const destCountry = trip.destination?.country || '';

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <Link to="/trips" className="flex items-center gap-2 text-sm text-sky-600 dark:text-sky-400 hover:underline">
          <ChevronLeft size={16} /> Back to my trips
        </Link>
        {canDelete && (
          <div className="flex gap-2">
            <ShareButton trip={trip} />
            <button
              onClick={handleDelete}
              disabled={deleting}
              className="text-sm font-medium text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg px-3 py-2 transition-colors flex items-center gap-1"
            >
              <Trash2 size={16} className={`${deleting ? 'animate-spin' : ''}`} />
              {deleting ? 'Deleting...' : 'Delete'}
            </button>
          </div>
        )}
      </div>

      <div className="rounded-2xl border border-slate-100 dark:border-slate-700 bg-white dark:bg-slate-800 p-6 shadow-sm">
        <div className="flex items-start justify-between gap-4 mb-6">
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-1">
              <img
                src={destImg}
                alt={destName}
                className="w-10 h-10 rounded-lg object-cover"
                onError={(e) => { e.target.src = fallbackImage; }}
              />
              <div>
                <h1 className="text-2xl font-bold text-slate-900 dark:text-white mb-0.5">
                  {trip.title || 'Untitled Trip'}
                </h1>
                <p className="text-sm text-slate-500 dark:text-slate-400">
                  {destName}{destCountry ? `, ${destCountry}` : ''}
                </p>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <span className={`px-2.5 py-0.5 rounded text-xs font-bold ${
              trip.aiGenerated
                ? 'bg-sky-100 text-sky-700 dark:bg-sky-900/20 dark:text-sky-400 border border-sky-200 dark:border-sky-700'
                : 'bg-slate-100 text-slate-600 dark:bg-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700'
            }`}>
              {trip.aiGenerated ? '✨ AI-generated' : 'Manual'}
            </span>
            {trip.isPublic && (
              <span className="px-2.5 py-0.5 rounded text-xs font-bold bg-green-100 text-green-700 dark:bg-green-900/20 dark:text-green-400">
                Public
              </span>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-700/30 border border-slate-100 dark:border-slate-700">
            <p className="text-xs font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500 mb-1">Duration</p>
            <p className="text-lg font-bold text-slate-900 dark:text-white">{trip.durationDays} days</p>
          </div>
          <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-700/30 border border-slate-100 dark:border-slate-700">
            <p className="text-xs font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500 mb-1">Travelers</p>
            <p className="text-lg font-bold text-slate-900 dark:text-white">{trip.travelers}</p>
          </div>
          <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-700/30 border border-slate-100 dark:border-slate-700">
            <p className="text-xs font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500 mb-1">Budget</p>
            <p className="text-lg font-bold text-slate-900 dark:text-white">
              {BUDGE_LABELS[trip.budgetLevel] || trip.budgetLevel}
            </p>
          </div>
          <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-700/30 border border-slate-100 dark:border-slate-700">
            <p className="text-xs font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500 mb-1">Created</p>
            <p className="text-sm font-bold text-slate-900 dark:text-white">
              {new Date(trip.createdAt).toLocaleDateString(undefined, {
                month: 'short',
                day: 'numeric',
                year: 'numeric',
              })}
            </p>
          </div>
        </div>

        <div className="space-y-4">
          <h2 className="font-bold text-xl text-slate-900 dark:text-white flex items-center gap-2 mb-4">
            <Calendar size={20} className="text-sky-500" />
            Itinerary
          </h2>
          {trip.itinerary && trip.itinerary.length > 0 ? (
            <div className="space-y-4">
              {trip.itinerary.map((day) => (
                <div key={day.day} className="border border-slate-100 dark:border-slate-700 rounded-xl overflow-hidden">
                  <div className="bg-slate-50 dark:bg-slate-700/30 px-4 py-3 border-b border-slate-100 dark:border-slate-700 flex items-center justify-between">
                    <span className="font-bold text-slate-900 dark:text-white">Day {day.day}</span>
                    {day.title && <span className="text-sm text-slate-500 dark:text-slate-400">{day.title}</span>}
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
                          <p className="text-xs font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500">
                            {item.label}
                          </p>
                          <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
                            {item.value || 'No activity planned'}
                          </p>
                        </div>
                      </div>
                    ))}
                    {day.notes && (
                      <div className="pt-2 border-t border-slate-100 dark:border-slate-700">
                        <p className="text-xs text-slate-500 dark:text-slate-400 italic">{day.notes}</p>
                      </div>
                    )}
                    <div className="pt-2 flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400">
                      <CreditCard size={14} />
                      <span>Est. cost: {day.estimatedCost || '$$'}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <div className="w-12 h-12 rounded-full bg-slate-100 dark:bg-slate-700 flex items-center justify-center mx-auto mb-4 text-slate-400 dark:text-slate-500">
                <Sparkles size={24} />
              </div>
              <h3 className="font-bold text-slate-900 dark:text-white mb-2">No itinerary yet</h3>
              <p className="text-sm text-slate-500 dark:text-slate-400">
                This trip doesn't have a day-by-day plan yet.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
