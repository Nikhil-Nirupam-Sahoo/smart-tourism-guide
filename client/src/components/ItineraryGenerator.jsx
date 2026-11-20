import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useAuth } from '../context/AuthContext';
import { tripAPI } from '../services/api';
import { Sparkles, Loader2, ChevronRight } from 'lucide-react';

const DAYS_OPTIONS = [3, 5, 7, 10, 14];
const BUDGET_OPTIONS = ['budget', 'mid-range', 'luxury'];

export default function ItineraryGenerator({ destination }) {
  const { isAuthenticated } = useAuth();
  const [submitting, setSubmitting] = useState(false);
  const [tripCreated, setTripCreated] = useState(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      durationDays: '5',
      travelers: '1',
      budgetLevel: 'mid-range',
      interests: '',
      title: '',
      generateItinerary: true,
    },
  });

  const onSubmit = async (data) => {
    setSubmitting(true);
    try {
      const res = await tripAPI.create({
        destination: destination._id,
        title: data.title,
        durationDays: Number(data.durationDays),
        travelers: Number(data.travelers),
        budgetLevel: data.budgetLevel,
        interests: data.interests
          ? data.interests.split(',').map((s) => s.trim()).filter(Boolean)
          : [],
        generateItinerary: data.generateItinerary,
        startDate: data.startDate || undefined,
        endDate: data.endDate || undefined,
      });
      setTripCreated(res.data);
    } catch (err) {
      alert(err.response?.data?.message || 'Failed to create trip');
    } finally {
      setSubmitting(false);
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="card p-8 text-center animate-fade-in">
        <div className="w-12 h-12 rounded-full bg-slate-100 flex items-center justify-center mx-auto mb-4 text-slate-400">
          <Sparkles size={24} />
        </div>
        <h3 className="font-bold mb-2">Sign in to plan your trip</h3>
        <p className="text-sm text-slate-500 mb-6">
          Create an account to generate AI itineraries and save your trips.
        </p>
      </div>
    );
  }

  return (
    <div className="card p-6 md:p-8 space-y-6 animate-fade-in">
      <div className="flex items-center gap-2">
        <Sparkles size={18} className="text-sky-500" />
        <h2 className="font-bold text-lg">AI Itinerary Planner</h2>
      </div>

      {tripCreated && (
        <div className="p-4 rounded-xl bg-green-50 border border-green-100">
          <div className="flex items-center gap-2 text-green-700 mb-2">
            <span>✓</span>
            <span className="font-semibold">Trip saved!</span>
          </div>
          <p className="text-sm text-green-700">
            Your itinerary for <strong>{destination.name}</strong> has been created.
          </p>
          <button
            onClick={() => setTripCreated(null)}
            className="mt-3 text-xs text-green-600 underline"
          >
            Create another
          </button>
        </div>
      )}

      {!tripCreated && (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5 grid grid-cols-1 md:grid-cols-2 gap-5">
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-slate-700 mb-1">
              Trip title
            </label>
            <input
              {...register('title', { required: 'Title is required' })}
              defaultValue={`${destination.name} Trip`}
              className="input"
            />
            {errors.title && (
              <span className="text-xs text-red-500">{errors.title.message}</span>
            )}
          </div>

          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-slate-700 mb-1">
              Travel dates (optional)
            </label>
            <div className="flex gap-3">
              <input {...register('startDate')} type="date" className="input flex-1" />
              <input {...register('endDate')} type="date" className="input flex-1" />
            </div>
          </div>

          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-slate-700 mb-1">
              Duration (days)
            </label>
            <select {...register('durationDays')} className="input">
              {DAYS_OPTIONS.map((d) => (
                <option key={d} value={String(d)}>
                  {d} days
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">
              Travelers
            </label>
            <input
              type="number"
              min="1"
              {...register('travelers')}
              className="input"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">
              Budget level
            </label>
            <select {...register('budgetLevel')} className="input">
              {BUDGET_OPTIONS.map((b) => (
                <option key={b} value={b}>
                  {b.charAt(0).toUpperCase() + b.slice(1)}
                </option>
              ))}
            </select>
          </div>

          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-slate-700 mb-1">
              Interests (comma-separated)
            </label>
            <input
              {...register('interests')}
              placeholder="e.g. food, temples, hiking, museums"
              className="input"
            />
            <p className="text-xs text-slate-400 mt-1">
              Helps the AI personalize your itinerary.
            </p>
          </div>

          <div className="md:col-span-2 flex items-center gap-2">
            <input
              id="generateItinerary"
              type="checkbox"
              defaultChecked
              {...register('generateItinerary')}
              className="rounded border-slate-300 text-sky-500 focus:ring-sky-500"
            />
            <label
              htmlFor="generateItinerary"
              className="text-sm text-slate-600 cursor-pointer"
            >
              Let AI generate a day-by-day itinerary
            </label>
          </div>

          <div className="md:col-span-2">
            <button
              type="submit"
              disabled={submitting}
              className="btn btn-primary w-full py-3 flex items-center justify-center gap-2"
            >
              {submitting ? (
                <>
                  <Loader2 size={18} className="animate-spin" />
                  Generating...
                </>
              ) : (
                <>
                  <Sparkles size={18} />
                  Create Trip &amp; Itinerary
                </>
              )}
            </button>
          </div>
        </form>
      )}
    </div>
  );
}
