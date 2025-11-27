// tailwind.config.ts
import type { Config } from 'tailwindcss'

const config: Config = {
  // Tailwind CSSがクラス名をスキャンするファイルを正確に指定
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  darkMode: 'class', // ダークモードをクラスベースで制御
  theme: {
    extend: {
      fontFamily: {
        sans: ['var(--font-sans)'],
        mono: ['var(--font-mono)'],
      },
    },
  },
  plugins: [require('@tailwindcss/typography')],
}
export default config
