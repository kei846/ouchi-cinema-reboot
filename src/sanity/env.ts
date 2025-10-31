// src/sanity/env.ts

export const projectId = 'csuhnmyi'; // ← SanityのprojectIdを直書き
export const dataset = 'production'; // ← データセット名
export const apiVersion = '2025-01-01'; // ← APIバージョン

if (!projectId) {
  throw new Error('Missing Sanity project ID');
}

