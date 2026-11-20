import { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { tripAPI } from '../services/api';
import { useAuth } from '../context/AuthContext';
import ShareButton from '../components/ShareButton';
import { withImageFallback } from '../utils/images';
import {
  ChevronLeft,
  Calendar,
  CreditCard,
  MapPin,
  Sparkles,
  Trash2,
} from 'lucide-react';

const BUDGET_LABELS = {
  budget: 'Budget',
  'mid-range': 'Mid-range',
  luxury: 'Luxury',
};

export default function TripDetail() {
  // `/trips/:id` provides id; `/trip-shared/:token` provides token.
  const { id, token } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [trip, setTrip] = useState(null);
  const [loading, setLoading] = useState(true);
  const [deleting, setDeleting] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    let active = true;
    setLoading(true);
    setError(null);

    const request = token ? tripAPI.getByShare(token) : tripAPI.getById(id);
    request
      .then((res) => {
        if (active) setTrip(res.data || res);
      })
      .catch((err) => {
        if (!active) return;
        if (err.response?.status === 404) {
          setError(token ? 'This shared trip was not found or is no longer public' : 'Trip not found');
        } else if (err.response?.status === 403) {
          setError('Not authorized to view this trip');
        } else {
          setError(err.response?.data?.message || 'Failed to load trip');
        }
      })
      .finally(() => {
        if (active) setLoading(false);
      });

    return () => {
      active = false;
    };
  }, [id, token]);

  const handleDelete = async () => {
    if (!window.confirm('Delete this trip?')) return;
    setDeleting(true);
    try {
      await tripAPI.delete(trip._id);
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
        <Link to={token ? '/' : '/trips'} className="btn btn-outline">
          {token ? 'Back to home' : 'Back to my trips'}
        </Link>
      </div>
    );
  }

  if (!trip) return null;

  const ownerId = trip.user && (trip.user._id || trip.user);
  const isOwner = ownerId === (user?._id || user?.id);
  const canDelete = !token && (isOwner || user?.role === 'admin');
  const destName = trip.destination?.name || 'Unknown Destination';
  const destCountry = trip.destination?.country || '';

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between gap-3">
        <Link to={token ? '/' : '/trips'} className="flex items-center gap-2 text-sm text-sky-600 dark:text-sky-400 hover:underline">
          <ChevronLeft size={16} /> {token ? 'Back to home' : 'Back to my trips'}
        </Link>
        <div className="flex items-center gap-2">
          {trip.shareToken && <ShareButton trip={trip} />}
          {canDelete && (
            <button
              onClick={handleDelete}
              disabled={deleting}
              className="text-sm font-medium text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg px-3 py-2 transition-colors flex items-center gap-1"
            >
              <Trash2 size={16} /> {deleting ? 'Deleting...' : 'Delete'}
            </button>
          )}
        </div>
      </div>

      <div className="rounded-2xl border border-slate-100 dark:border-slate-700 bg-white dark:bg-slate-800 p-6 shadow-sm">
        <div className="flex items-start justify-between gap-4 mb-6">
          <div className="flex items-center gap-3 min-w-0">
            <img
              src={trip.destination?.image}
              alt={destName}
              className="w-12 h-12 rounded-lg object-cover object-center bg-slate-200 dark:bg-slate-700 flex-shrink-0"
              onError={withImageFallback}
            />
            <div className="min-w-0">
              <h1 className="text-2xl font-bold text-slate-900 dark:text-white truncate">
                {trip.title || 'Untitled Trip'}
              </h1>
              <p className="text-sm text-slate-500 dark:text-slate-400">
                {destName}{destCountry ? `, ${destCountry}` : ''}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2 flex-shrink-0">
            {trip.aiGenerated && (
              <span className="px-2.5 py-0.5 rounded text-xs font-bold bg-sky-100 text-sky-700 dark:bg-sky-900/20 dark:text-sky-400 border border-sky-200 dark:border-sky-700">
                ✨ AI-generated
              </span>
            )}
            {trip.isPublic && (
              <span className="px-2.5 py-0.5 rounded text-xs font-bold bg-green-100 text-green-700 dark:bg-green-900/20 dark:text-green-400">
                Public
              </span>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          {[
            { label: 'Duration', value: `${trip.durationDays} days` },
            { label: 'Travelers', value: trip.travelers },
            { label: 'Budget', value: BUDGET_LABELS[trip.budgetLevel] || trip.budgetLevel },
            {
              label: 'Created',
              value: trip.createdAt
                ? new Date(trip.createdAt).toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' })
                : '—',
            },
          ].map((item) => (
            <div key={item.label} className="p-4 rounded-xl bg-slate-50 dark:bg-slate-700/30 border border-slate-100 dark:border-slate-700">
              <p className="text-xs font-bold uppercase tracking-wider text-slate-400 dark:text-slate-400 mb-1">{item.label}</p>
              <p className="text-lg font-bold text-slate-900 dark:text-white">{item.value}</p>
            </div>
          ))}
        </div>

        <h2 className="font-bold text-xl text-slate-900 dark:text-white flex items-center gap-2 mb-4">
          <Calendar size={20} className="text-sky-500" /> Itinerary
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
                    { label: 'Morning', value: day.morning },
                    { label: 'Afternoon', value: day.afternoon },
                    { label: 'Evening', value: day.evening },
                  ].map((item) => (
                    <div key={item.label} className="flex items-start gap-3">
                      <MapPin size={14} className="mt-1 flex-shrink-0 text-sky-500" />
                      <div>
                        <p className="text-xs font-bold uppercase tracking-wider text-slate-400 dark:text-slate-400">{item.label}</p>
                        <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
                          {item.value || 'No activity planned'}
                        </p>
                      </div>
                    </div>
                  ))}
                  {day.notes && (
                    <p className="pt-2 border-t border-slate-100 dark:border-slate-700 text-xs text-slate-500 dark:text-slate-400 italic">
                      {day.notes}
                    </p>
                  )}
                  <div className="pt-2 flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400">
                    <CreditCard size={14} /> Est. cost: {day.estimatedCost || '$$'}
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12 rounded-xl border border-dashed border-slate-200 dark:border-slate-700">
            <div className="w-12 h-12 rounded-full bg-slate-100 dark:bg-slate-700 flex items-center justify-center mx-auto mb-4 text-slate-400">
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
  );
}
