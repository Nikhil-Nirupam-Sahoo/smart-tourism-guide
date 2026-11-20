import { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { destinationAPI } from '../services/api';
import { useAuth } from '../context/AuthContext';
import ItineraryGenerator from '../components/ItineraryGenerator';
import MapComponent from '../components/MapComponent';
import WeatherWidget from '../components/WeatherWidget';
import BookingLinks from '../components/BookingLinks';
import FavoriteButton from '../components/FavoriteButton';
import { withImageFallback } from '../utils/images';
import {
  MapPin,
  Star,
  Clock,
  DollarSign,
  Share2,
  Sparkles,
  ChevronLeft,
} from 'lucide-react';

const BADGE_COLORS = {
  culture: 'bg-purple-100 text-purple-700 dark:bg-purple-900/20 dark:text-purple-400',
  nature: 'bg-green-100 text-green-700 dark:bg-green-900/20 dark:text-green-400',
  adventure: 'bg-orange-100 text-orange-700 dark:bg-orange-900/20 dark:text-orange-400',
  relaxation: 'bg-indigo-100 text-indigo-700 dark:bg-indigo-900/20 dark:text-indigo-400',
  food: 'bg-red-100 text-red-700 dark:bg-red-900/20 dark:text-red-400',
  history: 'bg-amber-100 text-amber-700 dark:bg-amber-900/20 dark:text-amber-400',
  beach: 'bg-cyan-100 text-cyan-700 dark:bg-cyan-900/20 dark:text-cyan-400',
  mountain: 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/20 dark:text-emerald-400',
  city: 'bg-slate-100 text-slate-700 dark:bg-slate-700 dark:text-slate-200',
};

export default function DestinationDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();
  const [destination, setDestination] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let active = true;
    destinationAPI
      .getById(id)
      .then((res) => {
        if (!active) return;
        setDestination(res.data || res);
      })
      .catch((err) => {
        if (err.response?.status === 404) navigate('/destinations', { replace: true });
      })
      .finally(() => {
        if (active) setLoading(false);
      });
    return () => {
      active = false;
    };
  }, [id, navigate]);

  if (loading) {
    return (
      <div className="flex h-[60vh] items-center justify-center">
        <div className="h-8 w-32 rounded bg-slate-200 dark:bg-slate-700 animate-pulse" />
      </div>
    );
  }
  if (!destination) return null;

  return (
    <div className="space-y-6">
      {/* Hero banner — fixed height with object-center so the image is cropped, never stretched */}
      <div className="relative h-64 md:h-80 rounded-2xl overflow-hidden bg-slate-200 dark:bg-slate-700">
        <img
          src={destination.image}
          alt={destination.name}
          className="w-full h-full object-cover object-center"
          onError={withImageFallback}
          loading="eager"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900/85 via-slate-900/30 to-transparent" />
        <div className="absolute bottom-5 left-5 right-5">
          <div className="flex flex-wrap gap-2 mb-3">
            <span className={`px-3 py-1 rounded-full text-xs font-bold ${BADGE_COLORS[destination.category] || 'bg-slate-200 text-slate-600 dark:bg-slate-700 dark:text-slate-300'}`}>
              {destination.category}
            </span>
            {(destination.tags || []).map((tag) => (
              <span key={tag} className="px-3 py-1 rounded-full border border-white/20 text-xs text-white">
                {tag}
              </span>
            ))}
          </div>
          <h1 className="text-2xl md:text-3xl font-bold text-white leading-tight">
            {destination.name}
          </h1>
          <div className="flex flex-wrap items-center gap-3 text-slate-100 mt-2">
            <span className="flex items-center gap-1">
              <Star size={14} className="text-amber-300" />
              {destination.rating?.toFixed(1)}{' '}
              <span className="text-xs opacity-80">({destination.reviewCount} reviews)</span>
            </span>
            <span className="flex items-center gap-1">
              <MapPin size={14} /> {destination.city}, {destination.country}
            </span>
            <span className="flex items-center gap-1">
              <DollarSign size={14} /> {destination.priceLevel}
            </span>
            <FavoriteButton destinationId={destination._id} />
          </div>
          <WeatherWidget weather={destination.weather} />
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center gap-4 mb-6">
          <Link to="/destinations" className="flex items-center gap-2 text-sm text-sky-600 dark:text-sky-400 hover:underline">
            <ChevronLeft size={16} /> Back to destinations
          </Link>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          <div className="lg:col-span-3 space-y-8">
            <div className="rounded-2xl border border-slate-100 dark:border-slate-700 bg-white dark:bg-slate-800 p-6 shadow-sm">
              <h2 className="font-bold text-xl text-slate-900 dark:text-white mb-3 flex items-center gap-2">
                <MapPin size={20} className="text-sky-500" /> About {destination.name}
              </h2>
              <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
                {destination.description}
              </p>
              <div className="mt-4 flex items-center gap-4 text-sm text-slate-500 dark:text-slate-400">
                <span className="flex items-center gap-1">
                  <Clock size={16} /> Best time: {destination.bestTimeToVisit}
                </span>
              </div>
            </div>

            <BookingLinks links={destination.bookingLinks} />

            <div className="rounded-2xl border border-slate-100 dark:border-slate-700 bg-white dark:bg-slate-800 p-6 shadow-sm">
              <h2 className="font-bold text-xl text-slate-900 dark:text-white mb-4 flex items-center gap-2">
                <Sparkles size={20} className="text-cyan-400" /> Plan your trip
              </h2>
              <p className="text-sm text-slate-500 dark:text-slate-400 mb-4">
                Create a personalized itinerary for your visit to{' '}
                <span className="font-semibold">{destination.name}</span>.
              </p>
              <ItineraryGenerator destination={destination} />
            </div>
          </div>

          <div className="lg:col-span-1 space-y-6">
            <MapComponent
              destinations={[destination]}
              selectedDestination={destination}
              className="h-[400px]"
            />
            <div className="rounded-2xl border border-slate-100 dark:border-slate-700 bg-white dark:bg-slate-800 p-4 shadow-sm">
              <h3 className="font-bold text-slate-900 dark:text-white mb-3">Quick actions</h3>
              <div className="space-y-2">
                <button
                  onClick={() => {
                    if (navigator.share) {
                      navigator.share({ title: destination.name, url: window.location.href }).catch(() => {});
                    } else {
                      navigator.clipboard?.writeText(window.location.href);
                    }
                  }}
                  className="w-full text-left py-2.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-sm text-sky-600 dark:text-sky-400 hover:bg-sky-50 dark:hover:bg-sky-900/20 flex items-center gap-2 transition-colors"
                >
                  <Share2 size={16} /> Share destination
                </button>
                {!isAuthenticated && (
                  <Link
                    to="/login"
                    className="w-full text-left py-2.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-sm text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700 flex items-center gap-2 transition-colors"
                  >
                    <Sparkles size={16} /> Sign in to plan trip
                  </Link>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
