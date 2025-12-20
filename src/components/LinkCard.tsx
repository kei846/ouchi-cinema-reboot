// src/components/LinkCard.tsx
import React from 'react';
import Image from 'next/image';

interface OGP {
  title?: string;
  description?: string;
  image?: string;
  url?: string;
  siteName?: string;
}

interface LinkCardProps {
  ogp: OGP | null;
  url: string; // フォールバック用に元のURLも受け取る
}

const LinkCard: React.FC<LinkCardProps> = ({ ogp, url }) => {
  if (!ogp || !ogp.title) {
    return (
      <div className="my-4 p-4 border border-red-300 bg-red-50 rounded-lg shadow-sm">
        <p className="text-red-700">リンクカードの読み込みに失敗しました。</p>
        <a href={url} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
          {url}
        </a>
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
