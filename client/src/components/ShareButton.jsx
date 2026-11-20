import { Share2, Copy, Link } from 'lucide-react';
import { useState } from 'react';

export default function ShareButton({ trip }) {
  const [copied, setCopied] = useState(false);
  const baseUrl = window.location.origin;
  const shareUrl = trip.shareToken ? `${baseUrl}/trip-shared/${trip.shareToken}` : baseUrl;

  const copy = () => {
    navigator.clipboard.writeText(shareUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="inline-flex items-center gap-2">
      <button
        onClick={copy}
        className="p-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors"
        title="Copy share link"
      >
        {copied ? <Copy size={18} className="text-green-500" /> : <Share2 size={18} />}
      </button>
      <a
        href={shareUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="text-xs text-sky-600 dark:text-sky-400 underline underline-offset-2 hover:text-sky-700 dark:hover:text-sky-300"
      >
        <Link size={14} className="mr-1" /> View shared trip
      </a>
    </div>
  );
}
