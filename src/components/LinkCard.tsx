// src/components/LinkCard.tsx
'use client';

import React, { useEffect, useState } from 'react';
import Image from 'next/image';

interface OGP {
  title: string;
  description: string;
  image: string;
  url: string;
  siteName: string;
}

interface LinkCardProps {
  url: string;
}

const LinkCard: React.FC<LinkCardProps> = ({ url }) => {
  const [ogp, setOgp] = useState<OGP | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchOgp = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await fetch(`/api/ogp?url=${encodeURIComponent(url)}`);
        if (!response.ok) {
          throw new Error(`Failed to fetch OGP: ${response.statusText}`);
        }
        const data: OGP = await response.json();
        setOgp(data);
      } catch (err: any) {
        setError(err.message);
        console.error('Error fetching OGP in LinkCard:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchOgp();
  }, [url]);

  if (loading) {
    return (
      <div className="my-4 p-4 border border-gray-300 rounded-lg shadow-sm flex items-center space-x-4 animate-pulse">
        <div className="w-24 h-24 bg-gray-200 rounded-md"></div>
        <div className="flex-1 space-y-2">
          <div className="h-4 bg-gray-200 rounded w-3/4"></div>
          <div className="h-4 bg-gray-200 rounded"></div>
          <div className="h-4 bg-gray-200 rounded w-1/2"></div>
        </div>
      </div>
    );
  }

  if (error || !ogp || !ogp.title) {
    return (
      <div className="my-4 p-4 border border-red-300 bg-red-50 rounded-lg shadow-sm">
        <p className="text-red-700">リンクカードの読み込みに失敗しました。</p>
        <a href={url} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
          {url}
        </a>
        {error && <p className="text-red-500 text-sm mt-1">エラー: {error}</p>}
      </div>
    );
  }

  return (
    <a
      href={ogp.url || url}
      target="_blank"
      rel="noopener noreferrer"
      className="my-4 block border border-gray-300 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200 ease-in-out overflow-hidden"
    >
      <div className="flex flex-col md:flex-row">
        {ogp.image && (
          <div className="relative w-full md:w-1/3 h-48 md:h-auto flex-shrink-0">
            <Image
              src={ogp.image}
              alt={ogp.title || 'Link image'}
              fill
              style={{ objectFit: 'cover' }}
              sizes="(max-width: 768px) 100vw, 33vw"
              className="rounded-t-lg md:rounded-l-lg md:rounded-t-none"
            />
          </div>
        )}
        <div className="p-4 flex-1">
          <h3 className="text-lg font-semibold text-gray-900 line-clamp-2">
            {ogp.title}
          </h3>
          {ogp.description && (
            <p className="mt-1 text-sm text-gray-600 line-clamp-3">
              {ogp.description}
            </p>
          )}
          <div className="mt-2 text-xs text-gray-500 flex items-center">
            {ogp.siteName && <span className="mr-1">{ogp.siteName}</span>}
            <span className="truncate">{ogp.url || url}</span>
          </div>
        </div>
      </div>
    </a>
  );
};

export default LinkCard;
