'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';

interface Heading {
  _key: string;
  style: string;
  text: string;
  id: string;
}

interface TableOfContentsProps {
  headings: Heading[];
}

const TableOfContents: React.FC<TableOfContentsProps> = ({ headings }) => {
  const [activeId, setActiveId] = useState<string | null>(null);

  useEffect(() => {
    // デバッグ用ログ: headingsが正しく渡されているか確認
    console.log('TableOfContents received headings:', headings);

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        });
      },
      { rootMargin: '0% 0% -70% 0%' } // Adjust this to control when a heading becomes active
    );

    headings.forEach((heading) => {
      const element = document.getElementById(heading.id);
      if (element) {
        observer.observe(element);
      }
    });

    return () => observer.disconnect();
  }, [headings]);

  // headingsが空の場合は何も表示しない
  if (headings.length === 0) {
    console.log('TableOfContents: No headings to display.');
    return null;
  }

  return (
    <div className="p-6 border border-gray-200 rounded-lg bg-gray-50 shadow-md mb-8"> {/* レイアウト関連のクラスを削除 */}
      <h2 className="text-lg font-bold mb-4 text-gray-800">目次</h2>
      <ul className="space-y-2">
        {headings.map((heading) => (
          <li key={heading.id} className={heading.style === 'h3' ? 'ml-4' : ''}>
            <Link
              href={`#${heading.id}`}
              className={`block text-sm transition-colors ${
                activeId === heading.id
                  ? 'text-indigo-600 font-semibold'
                  : 'text-gray-600 hover:text-indigo-500'
              }`}
            >
              {heading.text}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TableOfContents;
