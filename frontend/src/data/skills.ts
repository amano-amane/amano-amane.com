import type { Skill } from '@/types';

export const skills: Skill[] = [
  // Game Development
  {
    id: 'godot',
    name: 'Godot',
    category: 'game-dev',
    note: 'ゲーム制作',
  },
  {
    id: 'algorithm',
    name: 'アルゴリズム',
    category: 'game-dev',
    note: 'AtCoder (最高レート1400)',
  },
  // Illustration
  {
    id: 'clip-studio',
    name: 'CLIP STUDIO PAINT',
    category: 'illustration',
    note: 'イラスト制作',
  },
  // Web Development
  {
    id: 'aws',
    name: 'AWS',
    category: 'web-dev',
    note: 'バックエンド',
  },
  {
    id: 'vuejs',
    name: 'Vue.js',
    category: 'web-dev',
    note: 'フロントエンド',
  },
  {
    id: 'security',
    name: 'セキュリティ',
    category: 'web-dev',
    note: 'CISSP, RISS合格',
  },
];

export const skillCategoryLabels: Record<string, string> = {
  'game-dev': 'ゲーム開発',
  illustration: 'イラスト',
  'web-dev': 'Web開発',
};
