import { useState, useEffect } from 'react';
import { Search } from 'lucide-react';
import { Input } from './ui/Input';
import { useLibraryStore } from '../store/useLibraryStore';
import { useDebounce } from '../hooks/useDebounce';
import { cn } from '../lib/utils';

const TABS = ['Featured', 'KPI', 'Chart', 'Layout', 'Storyboard'];

export function Header() {
  const [localSearch, setLocalSearch] = useState('');
  const debouncedSearch = useDebounce(localSearch, 300);
  
  const setSearchQuery = useLibraryStore((state) => state.setSearchQuery);
  const activeTab = useLibraryStore((state) => state.activeTab);
  const setActiveTab = useLibraryStore((state) => state.setActiveTab);

  useEffect(() => {
    setSearchQuery(debouncedSearch);
  }, [debouncedSearch, setSearchQuery]);

  return (
    <header className="sticky top-0 z-10 w-full bg-white border-b border-border-color shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-4 py-4">
          <div className="flex items-center justify-between">
            <h1 className="text-xl font-bold text-gray-900 tracking-tight">Analytics Library</h1>
            <div className="w-full max-w-md">
              <Input
                type="text"
                placeholder="Search assets..."
                icon={<Search className="h-4 w-4" />}
                value={localSearch}
                onChange={(e) => setLocalSearch(e.target.value)}
              />
            </div>
          </div>
          
          <nav className="flex space-x-8 overflow-x-auto scrollbar-hide">
            {TABS.map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={cn(
                  'whitespace-nowrap pb-4 px-1 border-b-2 font-medium text-sm transition-colors',
                  activeTab === tab
                    ? 'border-primary-500 text-primary-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                )}
              >
                {tab}
              </button>
            ))}
          </nav>
        </div>
      </div>
    </header>
  );
}
