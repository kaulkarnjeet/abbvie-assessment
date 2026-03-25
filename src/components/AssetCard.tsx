import { PieChart } from 'lucide-react';
import type { Asset } from '../types';

interface AssetCardProps {
  asset: Asset;
  onClick: (asset: Asset) => void;
}

export function AssetCard({ asset, onClick }: AssetCardProps) {
  // Use a generic date for the mockup style, or actual createdAt
  const formattedDate = new Intl.DateTimeFormat('en-US', {
    month: '2-digit',
    day: '2-digit',
    year: 'numeric'
  }).format(new Date(asset.createdAt));

  return (
    <div
      onClick={() => onClick(asset)}
      className="flex flex-row items-center bg-white rounded-lg border border-[#eef0f3] p-4 hover:border-slate-300 transition-all duration-200 cursor-pointer shadow-sm"
    >
      <div className="shrink-0 mr-4">
        <div className="w-10 h-10 bg-[#f8fafc] rounded flex items-center justify-center border border-[#eef0f3]">
           <PieChart className="w-5 h-5 text-slate-300 font-light stroke-[1.5]" />
        </div>
      </div>
      
      <div className="flex flex-col flex-1 min-w-0">
        <h3 className="text-xs font-bold text-slate-900 truncate leading-tight">
          {asset.title}
        </h3>
        <p className="text-[10px] text-slate-500 line-clamp-2 mt-0.5 leading-snug">
          {asset.description}
        </p>
        <span className="text-[9px] text-slate-300 mt-1.5 font-medium">
          {formattedDate}
        </span>
      </div>
    </div>
  );
}
