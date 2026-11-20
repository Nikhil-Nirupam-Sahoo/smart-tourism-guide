import { Plane, Bed, Ticket } from 'lucide-react';

export default function BookingLinks({ links }) {
  if (!links) return null;

  const items = [
    { key: 'flights', label: 'Flights', icon: <Plane size={16} />, color: 'text-blue-600' },
    { key: 'hotels', label: 'Hotels', icon: <Bed size={16} />, color: 'text-green-600' },
    { key: 'activities', label: 'Activities', icon: <Ticket size={16} />, color: 'text-purple-600' },
  ];

  const hasLinks = items.some((i) => links[i.key]);
  if (!hasLinks) return null;

  return (
    <div className="glass-card p-4">
      <p className="text-sm font-semibold text-slate-900 dark:text-white mb-3">Book your trip</p>
      <div className="space-y-2">
        {items.map((item) => {
          if (!links[item.key]) return null;
          return (
            <a
              key={item.key}
              href={links[item.key]}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-between px-3 py-2 rounded-lg border border-white/60 dark:border-white/10 hover:bg-white/50 dark:hover:bg-white/10 transition-colors"
            >
              <div className="flex items-center gap-2">
                {item.icon}
                <span className="text-sm text-slate-700 dark:text-slate-300">{item.label}</span>
              </div>
              <span className={`text-xs font-medium ${item.color}`}>Book →</span>
            </a>
          );
        })}
      </div>
    </div>
  );
}
