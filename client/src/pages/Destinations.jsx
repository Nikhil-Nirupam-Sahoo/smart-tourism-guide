import { useState, useEffect } from 'react';
import { destinationAPI } from '../services/api';
import DestinationCard from '../components/DestinationCard';
import MapComponent from '../components/MapComponent';
import { Filter, MapPin, Grid, List } from 'lucide-react';

export default function Destinations() {
  const [destinations, setDestinations] = useState([]);
  const [categories, setCategories] = useState([]);
  const [filters, setFilters] = useState({
    category: '',
    search: '',
    priceLevel: '',
    minRating: '',
  });
  const [loading, setLoading] = useState(true);
  const [viewMode, setViewMode] = useState('grid'); // 'grid' | 'map'
  const [selected, setSelected] = useState(null);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const [catRes, destRes] = await Promise.all([
        destinationAPI.getCategories(),
        destinationAPI.getAll({ limit: 100 }),
      ]);
      setCategories(catRes.data || []);
      setDestinations(destRes.data?.destinations || []);
    } catch (err) {
      console.error('Failed to load destinations', err);
    } finally {
      setLoading(false);
    }
  };

  const handleFilterChange = (key, value) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
  };

  const filtered = destinations.filter((d) => {
    if (filters.category && d.category !== filters.category) return false;
    if (filters.priceLevel && d.priceLevel !== filters.priceLevel) return false;
    if (filters.minRating && d.rating < Number(filters.minRating)) return false;
    if (filters.search) {
      const q = filters.search.toLowerCase();
      return (
        d.name.toLowerCase().includes(q) ||
        d.country.toLowerCase().includes(q) ||
        d.shortDescription.toLowerCase().includes(q)
      );
    }
    return true;
  });

  const BADGE_COLORS = {
    culture: 'bg-purple-50 text-purple-700 border-purple-100',
    nature: 'bg-green-50 text-green-700 border-green-100',
    adventure: 'bg-orange-50 text-orange-700 border-orange-100',
    relaxation: 'bg-indigo-50 text-indigo-700 border-indigo-100',
    food: 'bg-red-50 text-red-700 border-red-100',
    history: 'bg-amber-50 text-amber-700 border-amber-100',
    beach: 'bg-cyan-50 text-cyan-700 border-cyan-100',
    mountain: 'bg-emerald-50 text-emerald-700 border-emerald-100',
    city: 'bg-slate-50 text-slate-700 border-slate-100',
  };

  return (
    <div className="space-y-6">
      {/* Header + filters */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Destinations</h1>
          <p className="text-slate-500 text-sm">
            Discover {destinations.length} destinations — including{' '}
            {destinations.filter((d) => d.country === 'India').length} across India
          </p>
        </div>

        <div className="flex flex-wrap gap-3 md:flex-nowrap md:overflow-x-auto md:pb-2">
          <button
            onClick={() => handleFilterChange('category', '')}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              !filters.category
                ? 'bg-sky-50 text-sky-700 border border-sky-100'
                : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50'
            }`}
          >
            All categories
          </button>
          {categories.map((c) => (
            <button
              key={c}
              onClick={() => handleFilterChange('category', c)}
              className={`px-4 py-2 rounded-lg text-sm font-medium border transition-colors ${
                filters.category === c
                  ? 'bg-sky-50 text-sky-700 border-sky-100'
                  : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-50'
              }`}
            >
              {c.charAt(0).toUpperCase() + c.slice(1)}
            </button>
          ))}
        </div>
      </div>

      {/* Search & price filters row */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="relative">
          <MapPin size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            placeholder="Search destinations..."
            value={filters.search}
            onChange={(e) => handleFilterChange('search', e.target.value)}
            className="input pl-10 py-2.5 text-sm"
          />
        </div>
        <select
          value={filters.priceLevel}
          onChange={(e) => handleFilterChange('priceLevel', e.target.value)}
          className="input py-2.5 text-sm"
        >
          <option value="">Any budget</option>
          <option value="budget">Budget</option>
          <option value="mid-range">Mid-range</option>
          <option value="luxury">Luxury</option>
        </select>
        <select
          value={filters.minRating}
          onChange={(e) => handleFilterChange('minRating', e.target.value)}
          className="input py-2.5 text-sm"
        >
          <option value="">Any rating</option>
          <option value="4">4★ and up</option>
          <option value="4.5">4.5★ and up</option>
          <option value="5">5★</option>
        </select>
        <div className="flex items-end">
          <button
            onClick={() => setViewMode(viewMode === 'grid' ? 'map' : 'grid')}
            className={`p-2.5 rounded-lg text-sm font-medium border transition-colors ${
              viewMode === 'map'
                ? 'bg-sky-50 text-sky-700 border-sky-100'
                : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-50'
            }`}
            title="Toggle map view"
          >
            {viewMode === 'map' ? <Grid size={18} /> : <MapPin size={18} />}
          </button>
        </div>
      </div>

      {viewMode === 'grid' ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {loading ? (
            <div className="col-span-3 animate-pulse">
              <div className="h-48 rounded-2xl bg-slate-200 mb-4"></div>
              <div className="h-4 rounded bg-slate-200 w-3/4 mb-2"></div>
              <div className="h-4 rounded bg-slate-200 w-1/2"></div>
            </div>
          ) : filtered.length === 0 ? (
            <div className="col-span-3 text-center py-16">
              <div className="w-16 h-16 rounded-full bg-slate-100 flex items-center justify-center mx-auto mb-4 text-slate-400">
                <MapPin size={32} />
              </div>
              <h3 className="font-bold text-slate-900 mb-2">No destinations found</h3>
              <p className="text-sm text-slate-500">Try adjusting your filters</p>
            </div>
          ) : (
            filtered.map((d) => (
              <DestinationCard
                key={d._id}
                destination={d}
                className="group cursor-pointer"
                onClick={() => setSelected(d)}
              />
            ))
          )}
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          <MapComponent
            className="lg:col-span-8"
            destinations={destinations}
            selectedDestination={selected}
          />
          <div className="lg:col-span-4 space-y-4">
            <h3 className="font-bold text-slate-900">Results ({filtered.length})</h3>
            {filtered.map((d) => (
              <div
                key={d._id}
                onClick={() => setSelected(d)}
                className="flex items-center gap-3 p-3 rounded-xl border border-slate-100 bg-white hover:bg-slate-50 cursor-pointer transition-colors"
              >
                <img
                  src={d.image}
                  alt={d.name}
                  className="w-16 h-16 rounded-lg object-cover"
                />
                <div>
                  <h4 className="font-bold text-sm text-slate-900">{d.name}</h4>
                  <p className="text-xs text-slate-500">
                    {d.city}, {d.country}
                  </p>
                </div>
                <span className={`ml-auto px-2 py-0.5 rounded text-xs font-medium ${BADGE_COLORS[d.category] || 'bg-slate-100 text-slate-600'}`}>
                  {d.category}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
