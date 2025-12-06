export interface StatItem {
  label: string;
  value: number;
}

export interface StatsSettings {
  stats: StatItem[];
  lastUpdated?: number;
}
