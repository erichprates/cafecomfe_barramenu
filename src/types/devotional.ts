import type { Database } from './database';

export type DevotionalType = Database['public']['Tables']['devotionals']['Row'];

export interface DevotionalHeaderProps {
  date: string;
  title: string;
  devotionalDay: number;
}

export interface DevotionalContentProps {
  devotional: DevotionalType;
}

export interface DevotionalListProps {
  devotional: DevotionalType;
  today: string;
}