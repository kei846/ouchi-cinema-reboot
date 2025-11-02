'use client';

import {defineConfig} from 'sanity';
import {deskTool} from 'sanity/desk'; // deskTool をインポート
import {visionTool} from '@sanity/vision';

import {schema} from './src/sanity/schemaTypes';
import {structure} from './src/sanity/structure';

export default defineConfig({
  name: 'default',
  title: 'ouchi-cinema-reboot',
  projectId: 'csuhnmyi',
  dataset: 'production',
  schema: { types: schema.types }, // ここを修正
  plugins: [
    deskTool({ structure: (S) => structure(S as any) }),
    visionTool({ defaultApiVersion: '2025-01-01' }), // apiVersion をハードコード
  ],
});
