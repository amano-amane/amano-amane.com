// Work item type
export interface Work {
  id: string;
  title: string;
  description: string;
  category: WorkCategory;
  status: WorkStatus;
  thumbnail?: string;
  links?: WorkLink[];
}

export type WorkCategory = 'game' | 'illustration';

export type WorkStatus = 'released' | 'in-development' | 'planned';

export interface WorkLink {
  type: 'github' | 'play' | 'download' | 'external';
  url: string;
  label?: string;
}

// Skill type
export interface Skill {
  id: string;
  name: string;
  category: SkillCategory;
  note?: string;
}

export type SkillCategory = 'game-dev' | 'illustration' | 'web-dev' | 'other';

// Link type
export interface SocialLink {
  id: string;
  name: string;
  url: string;
  icon: string;
  isActive: boolean;
}

// Navigation type
export interface NavItem {
  id: string;
  label: string;
  href: string;
}
