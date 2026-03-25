export type AssetType = 'kpi' | 'chart' | 'layout' | 'storyboard';

export interface BusinessQuestion {
  title: string;
  text: string;
}

export interface BaseAsset {
  id: string;
  title: string;
  description: string;
  type: AssetType;
  tags: string[];
  affiliates: string[];
  createdAt: string;
  updatedAt: string;
  featured?: boolean;
  trending?: boolean;
  
  usedCount: number;
  universalType: string;
  pagesCount: number;
  businessQuestions: BusinessQuestion[];
}

export interface KPIAsset extends BaseAsset {
  type: 'kpi';
  metricId: string;
  calculationLogic: string;
  visualsAvailable: string[];
}

export interface ChartAsset extends BaseAsset {
  type: 'chart';
  applicableKpis: string[];
  context: string;
}

export interface LayoutAsset extends BaseAsset {
  type: 'layout';
}

export interface StoryboardAsset extends BaseAsset {
  type: 'storyboard';
  coupledKpis: string[];
}

export type Asset = KPIAsset | ChartAsset | LayoutAsset | StoryboardAsset;
