import type { SocialLink } from '@/types';

export const socialLinks: SocialLink[] = [
  {
    id: 'twitter',
    name: 'Twitter / X',
    url: 'https://x.com/', // TODO: Update with actual URL
    icon: 'twitter',
    isActive: true,
  },
  {
    id: 'github',
    name: 'GitHub',
    url: 'https://github.com/', // TODO: Update with actual URL
    icon: 'github',
    isActive: false, // Will be enabled after portfolio release
  },
];
