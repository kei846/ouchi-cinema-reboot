// src/components/LinkCard.tsx
import React from 'react';
import Image from 'next/image';

interface OGP {
  image?: string;
}

interface LinkCardProps {
  ogp: OGP | null;
  url: string;
}

const LinkCard: React.FC<LinkCardProps> = ({ ogp, url }) => {
  // OGPオブジェクトがない、またはimageプロパティがなければ何もレンダリングしない
  if (!ogp || !ogp.image) {
    return null;
  }

  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className="my-4 block w-full aspect-video relative overflow-hidden rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200 ease-in-out"
    >
      <Image
        src={ogp.image}
        alt="YouTube thumbnail" // altは固定のテキストに
        fill
        style={{ objectFit: 'cover' }}
        sizes="(max-width: 768px) 100vw, 800px"
      />
    </a>
  );
};

export default LinkCard;

