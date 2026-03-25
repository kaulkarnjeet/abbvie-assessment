import { useMemo, useState, useEffect } from 'react';
import { useLibraryStore } from '../store/useLibraryStore';
import { mockAssets } from '../data/mockAssets';
import { AssetCard } from '../components/AssetCard';
import type { Asset } from '../types';
import { useDebounce } from '../hooks/useDebounce';
import { Input } from '../components/ui/Input';
import { Search } from 'lucide-react';
import { Button } from '../components/ui/Button';

const TABS = ['Featured', 'KPI', 'Layouts', 'Storyboards'];

export function LibraryPage() {
  const [localSearch, setLocalSearch] = useState('');
  const debouncedSearch = useDebounce(localSearch, 300);
  
  const searchQuery = useLibraryStore((state) => state.searchQuery);
  const setSearchQuery = useLibraryStore((state) => state.setSearchQuery);
  const activeTab = useLibraryStore((state) => state.activeTab);
  const setActiveTab = useLibraryStore((state) => state.setActiveTab);
  const setSelectedAsset = useLibraryStore((state) => state.setSelectedAsset);

  useEffect(() => {
    setSearchQuery(debouncedSearch);
  }, [debouncedSearch, setSearchQuery]);

  const filteredAssets = useMemo(() => {
    return mockAssets.filter((asset) => {
      const matchesSearch =
        searchQuery === '' ||
        asset.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        asset.description.toLowerCase().includes(searchQuery.toLowerCase());

      if (!matchesSearch) return false;

      const tabLabel = activeTab.toLowerCase();
      // "Layouts" -> "layout", "Storyboards" -> "storyboard"
      const typeMatch = tabLabel.endsWith('s') ? tabLabel.slice(0, -1) : tabLabel;
      
      const matchesTab =
        activeTab === 'Featured' || asset.type === typeMatch;
      
      return matchesTab;
    });
  }, [searchQuery, activeTab]);

  const featuredAssets = filteredAssets.filter((a) => a.featured);
  const trendingAssets = filteredAssets.filter((a) => a.trending);

  const renderGrid = (assets: Asset[], title: string, description: string) => {
    if (assets.length === 0) return null;
    return (
      <div className="mb-10">
        <h2 className="text-lg font-extrabold text-slate-800">{title}</h2>
        <p className="text-[11px] text-slate-500 mb-4">{description}</p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {assets.map((asset) => (
            <AssetCard key={asset.id} asset={asset} onClick={setSelectedAsset} />
          ))}
        </div>
      </div>
    );
  };

  return (
    <div className="w-full relative max-w-3xl mx-auto">
      {/* Top right Request button */}
      <div className="absolute top-0 right-0 sm:-top-4 sm:-right-4">
        <Button variant="secondary" size="sm" className="bg-[#5c6e83] text-white hover:bg-[#4b5a6c] border-none shadow-none text-[10px] px-3 font-semibold rounded-md">
          <svg className="w-3 h-3 mr-1.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" /></svg>
          Request
        </Button>
      </div>

      <div className="text-center mt-2 mb-8">
        <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">Library</h1>
        <p className="text-[11px] text-slate-500 mt-2 font-medium">Browse for assets needed to report and present analysis.</p>
      </div>

      <div className="max-w-xl mx-auto mb-10">
        <div className="mb-4">
          <Input
            type="text"
            placeholder="Type to search..."
            icon={<Search className="h-3 w-3 text-slate-400" />}
            value={localSearch}
            onChange={(e) => setLocalSearch(e.target.value)}
            className="border-slate-100 shadow-sm text-xs rounded-lg h-9"
          />
        </div>
        
        <div className="bg-[#f0f2f5] p-1 rounded-lg flex flex-wrap sm:flex-nowrap gap-1 sm:gap-0">
          {TABS.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`flex-1 min-w-[30%] sm:min-w-0 text-center py-1.5 text-[10px] font-bold rounded-md transition-all ${
                activeTab === tab
                  ? 'bg-white text-slate-800 shadow-xs'
                  : 'text-slate-500 hover:text-slate-700'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      <div className="w-full mx-auto">
        {(activeTab === 'Featured' && searchQuery === '') ? (
          <>
            {renderGrid(featuredAssets, 'Featured', 'Curated top picks from this week')}
            {renderGrid(trendingAssets, 'Trending', 'Most popular by community')}
          </>
        ) : (
          renderGrid(filteredAssets, 'Results', `Found ${filteredAssets.length} assets`)
        )}
      </div>
    </div>
  );
}
