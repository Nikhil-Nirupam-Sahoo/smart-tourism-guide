import { Cloud, Sun, CloudRain, Snowflake, Wind } from 'lucide-react';

const iconMap = {
  0: <Sun size={24} className="text-amber-400" />,
  1: <Sun size={24} className="text-amber-400" />,
  2: <Cloud size={24} className="text-slate-400" />,
  3: <Cloud size={24} className="text-slate-400" />,
  45: <Cloud size={24} className="text-slate-400" />,
  48: <Cloud size={24} className="text-slate-400" />,
  51: <CloudRain size={24} className="text-blue-400" />,
  61: <CloudRain size={24} className="text-blue-400" />,
  63: <CloudRain size={24} className="text-blue-400" />,
  71: <Snowflake size={24} className="text-blue-200" />,
  73: <Snowflake size={24} className="text-blue-200" />,
  95: <CloudRain size={24} className="text-indigo-500" />,
};

export default function WeatherWidget({ weather }) {
  if (!weather) return null;

  const current = weather.current || {};
  const daily = weather.daily || {};
  const code = current.weathercode ?? daily.weathercode?.[0] ?? 0;
  const temp = current.temperature_2m ?? daily.temperature_2m_max?.[0];
  const Icon = iconMap[code] || <Cloud size={24} className="text-slate-400" />;

  return (
    <div className="rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 p-4 shadow-sm">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-semibold text-slate-900 dark:text-white">Weather</p>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            {temp !== undefined ? `${Math.round(temp)}°C` : '—'}
          </p>
        </div>
        <div className="text-right">
          {Icon}
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            {current.windspeed_10m !== undefined ? `${Math.round(current.windspeed_10m)} km/h wind` : ''}
          </p>
        </div>
      </div>
    </div>
  );
}
