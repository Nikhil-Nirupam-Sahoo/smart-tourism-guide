import { useEffect, useState } from 'react';
import { Star } from 'lucide-react';
import { useUser } from '../context/AuthContext';
import { userAPI } from '../services/api';
import { toast } from 'react-hot-toast';

export default function FavoriteButton({ destinationId, isFavorited }) {
  const user = useUser();
  const [toggling, setToggling] = useState(false);
  const [isFav, setIsFav] = useState(Boolean(isFavorited));

  useEffect(() => {
    if (typeof isFavorited === 'boolean') setIsFav(isFavorited);
  }, [isFavorited]);

  if (!user) {
    return (
      <button
        onClick={() => toast.error('Sign in to save favorites')}
        className="p-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-400 hover:text-sky-500 transition-colors"
        title="Sign in to favorite"
      >
        <Star size={18} />
      </button>
    );
  }

  const handleToggle = async () => {
    setToggling(true);
    try {
      const res = await userAPI.toggleFavorite(destinationId);
      setIsFav(Boolean(res.isFav));
      toast.success(res.isFav ? 'Added to favorites' : 'Removed from favorites');
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to update favorite');
    } finally {
      setToggling(false);
    }
  };

  return (
    <button
      onClick={handleToggle}
      disabled={toggling}
      className={`p-2 rounded-lg border transition-colors ${
        isFav
          ? 'bg-amber-100 text-amber-600 border-amber-200 dark:bg-amber-900/20 dark:text-amber-400 dark:border-amber-500'
          : 'border-slate-200 bg-white dark:bg-slate-800 text-slate-400 dark:text-slate-400 hover:text-slate-600 dark:hover:text-slate-300'
      }`}
      title={isFav ? 'Remove from favorites' : 'Add to favorites'}
    >
      <Star size={18} fill={isFav ? 'currentColor' : 'none'} />
    </button>
  );
}
