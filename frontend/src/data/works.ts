import type { Work } from '@/types';

export const works: Work[] = [
  {
    id: 'puzzle-game',
    title: 'パズルゲーム',
    description: '開発中のパズルゲームです。詳細は近日公開予定。',
    category: 'game',
    status: 'in-development',
    thumbnail: undefined,
    links: [],
  },
];

export const workCategoryLabels: Record<string, string> = {
  game: 'ゲーム',
  illustration: 'イラスト',
};

export const workStatusLabels: Record<string, string> = {
  released: 'リリース済み',
  'in-development': '開発中',
  planned: '予定',
};
