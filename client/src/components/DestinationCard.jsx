import { Link } from 'react-router-dom';
import { MapPin, Star, DollarSign } from 'lucide-react';
import { withImageFallback } from '../utils/images';

export default function DestinationCard({ destination, className, onClick }) {
  return (
    <Link to={`/destinations/${destination._id}`} className={`card group ${className || ''}`} onClick={onClick}>
      <div className="relative h-48 overflow-hidden bg-slate-200 dark:bg-slate-700">
        <img
          src={destination.image}
          alt={destination.name}
          className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
          onError={withImageFallback}
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity">
          <div className="absolute bottom-4 left-4 right-4 flex justify-between items-end">
            <span className="text-white font-bold text-lg">{destination.name}</span>
            <span className="bg-black/60 backdrop-blur text-xs px-2 py-1 rounded font-medium text-white">
              {destination.country}
            </span>
          </div>
        </div>
        {destination.isFeatured && (
          <div className="absolute top-3 left-3">
            <span className="badge-fill text-xs">Featured</span>
          </div>
        )}
      </div>
      <div className="p-4">
        <div className="flex items-center justify-between mb-1">
          <h3 className="font-bold text-slate-900 dark:text-white">{destination.name}</h3>
          <span className="text-xs font-bold text-sky-600 dark:text-sky-400 bg-sky-50 dark:bg-sky-900/30 px-2 py-0.5 rounded">
            {destination.rating?.toFixed(1)}
          </span>
        </div>
        <p className="text-sm text-slate-500 dark:text-slate-400 line-clamp-2 mb-3">{destination.shortDescription}</p>
        <div className="flex items-center gap-3 text-xs text-slate-500 dark:text-slate-400">
          <span className="flex items-center gap-1">
            <MapPin size={12} /> {destination.city}, {destination.country}
          </span>
          <span className="flex items-center gap-1">
            <Star size={12} fill="currentColor" /> {destination.reviewCount} reviews
          </span>
          <span className="flex items-center gap-1">
            <DollarSign size={12} /> {destination.priceLevel}
          </span>
        </div>
      </div>
    </Link>
  );
}
