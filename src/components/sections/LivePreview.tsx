'use client';

import { useState } from 'react';
import { ExternalLink } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface LivePreviewProps {
  /** URL of the deployed site. */
  url: string;
  /** Accessible title for the iframe. */
  title: string;
  /** Label for the "open in new tab" button. */
  openLabel: string;
}

/**
 * Shows a deployed site inside a browser-style frame.
 * Loads lazily and offers a fallback link if the site refuses embedding.
 */
export default function LivePreview({ url, title, openLabel }: LivePreviewProps) {
  const [loaded, setLoaded] = useState(false);

  return (
    <div className="overflow-hidden rounded-2xl border bg-card shadow-xl">
      <div className="flex items-center gap-2 border-b bg-muted px-4 py-2">
        <span className="size-3 rounded-full bg-red-500" />
        <span className="size-3 rounded-full bg-yellow-500" />
        <span className="size-3 rounded-full bg-green-500" />
        <span className="ms-3 truncate text-xs text-muted-foreground" dir="ltr">
          {url}
        </span>
      </div>
      <div className="relative aspect-video">
        {!loaded && <div className="absolute inset-0 animate-pulse bg-muted" />}
        <iframe
          src={url}
          title={title}
          loading="lazy"
          onLoad={() => setLoaded(true)}
          className="size-full"
        />
      </div>
      <div className="flex justify-end border-t p-3">
        <Button variant="outline" size="sm">
          <a href={url} target="_blank" rel="noopener noreferrer">
            <ExternalLink className="me-2 size-4" />
            {openLabel}
          </a>
        </Button>
      </div>
    </div>
  );
}