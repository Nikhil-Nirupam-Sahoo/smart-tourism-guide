import { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { destinationAPI } from '../services/api';
import { useAuth } from '../context/AuthContext';
import ItineraryGenerator from '../components/ItineraryGenerator';
import MapComponent from '../components/MapComponent';
import {
  MapPin,
  Star,
  Clock,
  DollarSign,
  Share2,
  Sparkles,
  ChevronLeft,
} from 'lucide-react';

export default function DestinationDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();
  const [destination, setDestination] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    destinationAPI
      .getById(id)
      .then((res) => {
        setDestination(res.data);
        setLoading(false);
      })
      .catch((err) => {
        if (err.response?.status === 404) navigate('/destinations');
        setLoading(false);
      });
  }, [id, navigate]);

  if (loading) {
    return (
      <div className="flex h-[60vh] items-center justify-center">
        <div className="h-8 w-32 rounded bg-slate-200 animate-pulse" />
      </div>
    );
  }
  if (!destination) return null;

  const BADGE_COLORS = {
    culture: 'bg-purple-100 text-purple-700',
    nature: 'bg-green-100 text-green-700',
    adventure: 'bg-orange-100 text-orange-700',
    relaxation: 'bg-indigo-100 text-indigo-700',
    food: 'bg-red-100 text-red-700',
    history: 'bg-amber-100 text-amber-700',
    beach: 'bg-cyan-100 text-cyan-700',
    mountain: 'bg-emerald-100 text-emerald-700',
    city: 'bg-slate-100 text-slate-700',
  };

  return (
    <div className="space-y-6">
      {/* Header image */}
      <div className="relative h-64 md:h-80 rounded-3xl overflow-hidden">
        <img
          src={destination.image}
          alt={destination.name}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 via-slate-900/40 to-transparent"></div>
        <div className="absolute bottom-6 left-6 right-6">
          <div className="flex flex-wrap gap-2 mb-3">
            <span className={`px-3 py-1 rounded-full text-xs font-bold ${BADGE_COLORS[destination.category] || 'bg-slate-200 text-slate-600'}`}>
              {destination.category}
            </span>
            {destination.tags.map((tag) => (
              <span key={tag} className="px-3 py-1 rounded-full bg-white/10 border border-white/20 text-xs text-white">
                {tag}
              </span>
            ))}
          </div>
          <h1 className="text-3xl md:text-5xl font-bold text-white text-balance">
            {destination.name}
          </h1>
          <div className="flex items-center gap-4 text-slate-200 mt-2">
            <span className="flex items-center gap-1">
              <Star size={16} fill="yellow-400" />
              {destination.rating.toFixed(1)} <span className="text-xs opacity-70">({destination.reviewCount} reviews)</span>
            </span>
            <span className="flex items-center gap-1">
              <MapPin size={16} />
              {destination.city}, {destination.country}
            </span>
            <span className="flex items-center gap-1">
              <DollarSign size={16} />
              {destination.priceLevel}
            </span>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center gap-4 mb-6">
          <Link to="/destinations" className="flex items-center gap-2 text-sm text-sky-600 hover:underline">
            <ChevronLeft size={16} /> Back to destinations
          </Link>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Main content */}
          <div className="lg:col-span-3 space-y-8">
            <div className="card p-6">
              <h2 className="font-bold text-xl text-slate-900 mb-3 flex items-center gap-2">
                <MapPin size={20} className="text-sky-500" />
                About {destination.name}
              </h2>
              <p className="text-slate-600 leading-relaxed">
                {destination.description}
              </p>
              <div className="mt-4 flex items-center gap-4 text-sm text-slate-500">
                <span className="flex items-center gap-1">
                  <Clock size={16} />
                  Best time: {destination.bestTimeToVisit}
                </span>
              </div>
            </div>

            <div className="card p-6">
              <h2 className="font-bold text-xl text-slate-900 mb-4 flex items-center gap-2">
                <Sparkles size={20} className="text-cyan-400" />
                Plan your trip
              </h2>
              <p className="text-sm text-slate-500 mb-4">
                Create a personalized itinerary for your visit to{' '}
                <span className="font-semibold">{destination.name}</span>.
              </p>
              <ItineraryGenerator destination={destination} />
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1 space-y-6">
            <MapComponent
              destinations={[destination]}
              selectedDestination={destination}
              className="h-[400px]"
            />

            <div className="card p-4">
              <h3 className="font-bold text-slate-900 mb-3">Quick actions</h3>
              <div className="space-y-2">
                <button className="w-full text-left py-2.5 rounded-lg border border-slate-200 bg-white text-sm text-sky-600 hover:bg-sky-50 flex items-center gap-2">
                  <Share2 size={16} />
                  Share destination
                </button>
                {!isAuthenticated && (
                  <button className="w-full text-left py-2.5 rounded-lg border border-slate-200 bg-white text-sm text-slate-600 hover:bg-slate-50 flex items-center gap-2">
                    <Sparkles size={16} />
                    Sign in to plan trip
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
