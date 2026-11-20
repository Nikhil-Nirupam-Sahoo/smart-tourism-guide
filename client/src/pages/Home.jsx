import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { destinationAPI } from '../services/api';
import DestinationCard from '../components/DestinationCard';
import { Search, Plane, MapPin, Sparkles } from 'lucide-react';

export default function Home() {
  const [featured, setFeatured] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    destinationAPI
      .getFeatured()
      .then((res) => {
        setFeatured(res.data || []);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  return (
    <div className="space-y-0">
      {/* Hero */}
      <section className="relative overflow-hidden rounded-3xl bg-slate-900 text-white p-8 md:p-12 animate-fade-in">
        <div className="absolute inset-0 -z-10 bg-[url('https://images.unsplash.com/photo-1469854523082-cc61ee5d66bc?auto=format&fit=crop&w=1600&q=80')] bg-cover bg-center opacity-60"></div>
        <div className="max-w-2xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 border border-white/20 backdrop-blur text-xs font-semibold text-sky-200 mb-6">
            <Sparkles size={14} className="text-cyan-400" />
            AI-powered travel planning
          </div>
          <h1 className="text-4xl md:text-6xl font-bold text-balance mb-6 leading-tight">
            Discover your next adventure with SmartGuide
          </h1>
          <p className="text-slate-300 text-lg mb-8 max-w-xl leading-relaxed">
            Get AI-generated itineraries, personalized destination recommendations,
            and a travel assistant that helps you plan every detail of your journey.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Link to="/destinations" className="btn btn-primary px-8 py-3 text-base flex items-center justify-center gap-2">
              <Plane size={18} /> Explore Destinations
            </Link>
            <Link to="/trips" className="btn btn-outline px-8 py-3 text-base flex items-center justify-center gap-2 bg-white text-slate-900 hover:bg-slate-100">
              <MapPin size={18} /> My Trips
            </Link>
          </div>
        </div>
      </section>

      {/* Search bar */}
      <section className="max-w-7xl mx-auto px-4 py-8">
        <div className="relative max-w-lg mx-auto">
          <Search size={20} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            placeholder="Search destinations (e.g. Paris, Tokyo, Bali)..."
            className="input pl-11 py-3 text-base"
          />
        </div>
      </section>

      {/* Featured destinations */}
      <section className="max-w-7xl mx-auto px-4 py-12">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-2xl font-bold text-slate-900 mb-1">Featured destinations</h2>
            <p className="text-sm text-slate-500">Handpicked for your next trip</p>
          </div>
          <Link to="/destinations" className="text-sm font-medium text-sky-600 hover:underline">
            View all <span className="text-sky-600">→</span>
          </Link>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {loading ? (
            <div className="col-span-4 animate-pulse">
              <div className="h-48 rounded-2xl bg-slate-200 mb-4"></div>
              <div className="h-4 rounded bg-slate-200 w-3/4 mb-2"></div>
              <div className="h-4 rounded bg-slate-200 w-1/2"></div>
            </div>
          ) : (
            featured.map((d) => (
              <DestinationCard key={d._id} destination={d} />
            ))
          )}
        </div>
      </section>

      {/* How it works */}
      <section className="bg-slate-50 py-16 border-y border-slate-100">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-2xl font-bold text-slate-900 text-center mb-12">How it works</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: <Search size={28} className="text-sky-500" />,
                title: 'Explore',
                desc: 'Browse featured destinations and read about top places to visit.',
              },
              {
                icon: <Sparkles size={28} className="text-cyan-400" />,
                title: 'AI Plan',
                desc: 'Generate a personalized day-by-day itinerary with our AI assistant.',
              },
              {
                icon: <Plane size={28} className="text-slate-600" />,
                title: 'Go',
                desc: 'Save your trips, view them on a map, and chat with SmartGuide.',
              },
            ].map((step, i) => (
              <div key={i} className="text-center p-6 rounded-2xl bg-white border border-slate-100">
                <div className="w-12 h-12 rounded-full bg-sky-50 flex items-center justify-center mx-auto mb-4 text-sky-600 font-bold">
                  {i + 1}
                </div>
                {step.icon}
                <h3 className="font-bold text-slate-900 mt-4 mb-2">{step.title}</h3>
                <p className="text-sm text-slate-500 leading-relaxed">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
