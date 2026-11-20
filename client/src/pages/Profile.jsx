import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { authAPI } from '../services/api';
import { toast } from 'react-hot-toast';
import { User, Settings, MapPin, Clock, CreditCard, Sparkles, LogOut } from 'lucide-react';

const INTERESTS = [
  'Culture', 'Nature', 'Adventure', 'Relaxation', 'Food', 'History', 'Beach', 'Mountain', 'City',
];

export default function Profile() {
  const { user, updateProfile, logout, isAuthenticated, loading: authLoading } = useAuth();
  const navigate = useNavigate();
  const [saving, setSaving] = useState(false);
  const [interests, setInterests] = useState(user?.preferences?.interests || []);
  const [budgetLevel, setBudgetLevel] = useState(user?.preferences?.budgetLevel || 'mid-range');

  useEffect(() => {
    if (user) {
      setInterests(user.preferences?.interests || []);
      setBudgetLevel(user.preferences?.budgetLevel || 'mid-range');
    }
  }, [user]);

  const toggleInterest = (interest) => {
    setInterests((prev) =>
      prev.includes(interest) ? prev.filter((i) => i !== interest) : [...prev, interest]
    );
  };

  const handleSave = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      await updateProfile({
        interests,
        budgetLevel,
      });
      toast.success('Profile updated');
    } catch (err) {
      toast.error(err.response?.data?.message || 'Update failed');
    } finally {
      setSaving(false);
    }
  };

  if (!isAuthenticated || authLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50 px-4">
        <div className="text-center">
          <div className="h-8 w-32 rounded bg-slate-200 animate-pulse mx-auto mb-4" />
          <p className="text-sm text-slate-500">Loading profile...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto px-4 py-8 space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Profile</h1>
          <p className="text-slate-500 text-sm">
            Manage your account and travel preferences
          </p>
        </div>
        <button
          onClick={logout}
          className="flex items-center gap-2 text-sm font-medium text-red-600 hover:bg-red-50 rounded-lg px-3 py-2 transition-colors"
        >
          <LogOut size={16} /> Sign out
        </button>
      </div>

      {/* Account card */}
      <div className="card p-6">
        <div className="flex items-center gap-4 mb-6">
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-sky-500 to-cyan-400 flex items-center justify-center text-white text-2xl font-bold shadow-lg shadow-sky-200">
            {user?.name?.charAt(0)?.toUpperCase() || 'U'}
          </div>
          <div>
            <h2 className="font-bold text-slate-900">{user?.name}</h2>
            <p className="text-sm text-slate-500">{user?.email}</p>
            <span className="mt-1 inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium bg-sky-100 text-sky-700">
              <span className="w-2 h-2 rounded-full bg-sky-500"></span>
              {user?.role}
            </span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 border-t border-slate-100 pt-6">
          <div>
            <p className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3">Member since</p>
            <p className="text-sm text-slate-600">
              {new Date(user?.createdAt || Date.now()).toLocaleDateString(undefined, {
                year: 'numeric',
                month: 'long',
              })}
            </p>
          </div>
          <div>
            <p className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3">Saved trips</p>
            <p className="text-sm text-slate-600">
              {user?.trips?.length || 0} trips
            </p>
          </div>
        </div>
      </div>

      {/* Preferences */}
      <div className="card p-6">
        <div className="flex items-center gap-2 mb-6">
          <Settings size={20} className="text-sky-500" />
          <h2 className="font-bold text-slate-900">Travel preferences</h2>
        </div>

        <form onSubmit={handleSave} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-3">
              Interests
            </label>
            <div className="flex flex-wrap gap-2">
              {INTERESTS.map((interest) => (
                <button
                  key={interest}
                  type="button"
                  onClick={() => toggleInterest(interest)}
                  className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
                    interests.includes(interest)
                      ? 'bg-sky-50 text-sky-700 border border-sky-100'
                      : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50'
                  }`}
                >
                  {interest}
                </button>
              ))}
            </div>
            <input
              type="hidden"
              name="interests"
              value={interests.join(',')}
            />
            <p className="text-xs text-slate-400 mt-2">
              Select the types of experiences you enjoy.
            </p>
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-3">
              Default budget level
            </label>
            <div className="flex gap-2">
              {['budget', 'mid-range', 'luxury'].map((level) => (
                <button
                  key={level}
                  type="button"
                  onClick={() => setBudgetLevel(level)}
                  className={`flex-1 py-2 rounded-lg text-sm font-medium transition-colors ${
                    budgetLevel === level
                      ? 'bg-sky-50 text-sky-700 border border-sky-100'
                      : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50'
                  }`}
                >
                  {level.charAt(0).toUpperCase() + level.slice(1)}
                </button>
              ))}
            </div>
            <input
              type="hidden"
              name="budgetLevel"
              value={budgetLevel}
            />
          </div>

          <button
            type="submit"
            disabled={saving}
            className="btn btn-primary py-3 flex items-center justify-center gap-2"
          >
            {saving ? (
              <>
                <Sparkles size={18} className="animate-spin" />
                Saving...
              </>
            ) : (
              <>
                <Sparkles size={18} />
                Save preferences
              </>
            )}
          </button>
        </form>
      </div>
    </div>
  );
}
