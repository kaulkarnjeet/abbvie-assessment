import { useLibraryStore } from '../store/useLibraryStore';

const ASSET_TYPES = ['kpi', 'chart', 'layout', 'storyboard'];
const AFFILIATES = ['Global', 'North America', 'EMEA', 'APAC'];

export function Sidebar() {
  const filters = useLibraryStore((state) => state.filters);
  const setFilters = useLibraryStore((state) => state.setFilters);
  const clearFilters = useLibraryStore((state) => state.clearFilters);

  const toggleFilter = (category: 'type' | 'affiliate', value: string) => {
    const current = filters[category];
    const updated = current.includes(value)
      ? current.filter((item) => item !== value)
      : [...current, value];
    
    setFilters({ [category]: updated });
  };

  return (
    <div className="w-64 shrink-0 hidden lg:block pr-8 lg:border-r border-border-color min-h-[calc(100vh-8rem)]">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-lg font-semibold text-gray-900">Filters</h2>
        {(filters.type.length > 0 || filters.affiliate.length > 0) && (
          <button
            onClick={clearFilters}
            className="text-sm text-primary-600 hover:text-primary-700 font-medium"
          >
            Clear all
          </button>
        )}
      </div>

      <div className="space-y-8">
        <div>
          <h3 className="text-sm font-medium text-gray-900 mb-3 uppercase tracking-wider">Asset Type</h3>
          <div className="space-y-2">
            {ASSET_TYPES.map((type) => (
              <label key={type} className="flex items-center space-x-3 cursor-pointer group">
                <input
                  type="checkbox"
                  checked={filters.type.includes(type)}
                  onChange={() => toggleFilter('type', type)}
                  className="h-4 w-4 rounded border-border-color text-primary-600 focus:ring-primary-500"
                />
                <span className="text-sm text-gray-600 group-hover:text-gray-900 capitalize">
                  {type}
                </span>
              </label>
            ))}
          </div>
        </div>

        <div>
          <h3 className="text-sm font-medium text-gray-900 mb-3 uppercase tracking-wider">Affiliate</h3>
          <div className="space-y-2">
            {AFFILIATES.map((affiliate) => (
              <label key={affiliate} className="flex items-center space-x-3 cursor-pointer group">
                <input
                  type="checkbox"
                  checked={filters.affiliate.includes(affiliate)}
                  onChange={() => toggleFilter('affiliate', affiliate)}
                  className="h-4 w-4 rounded border-border-color text-primary-600 focus:ring-primary-500"
                />
                <span className="text-sm text-gray-600 group-hover:text-gray-900">
                  {affiliate}
                </span>
              </label>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
